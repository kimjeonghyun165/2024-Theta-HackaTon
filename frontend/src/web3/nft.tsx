import React, { useState } from "react";
import Web3 from "web3";
import FBXNFT from "../../build/contracts/FBXNFT.json";
import { useWeb3Store } from "../store/useStore";
import ThreeScene from "../components/common/threeScene/main";

const Web3Info: React.FC = () => {
  const {
    account,
    setAccount,
    contract,
    setContract,
    web3,
    setWeb3,
    file,
    setFile,
  } = useWeb3Store();
  const [loading, setLoading] = useState(false);
  const [modelURL, setModelURL] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = (FBXNFT as any).networks[networkId.toString()];
        if (deployedNetwork) {
          const instance = new web3Instance.eth.Contract(
            (FBXNFT as any).abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(instance);
        } else {
          console.log("Contract not deployed on current network");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Ethereum browser extension not detected!");
    }
  };

  const uploadToPinata = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3000/pinata/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    } catch (error) {
      console.error("Pinata upload error: ", error);
      return null;
    }
  };

  const createNFT = async (metadataURI: string) => {
    if (contract && account) {
      try {
        setLoading(true);
        const gasPrice = await web3?.eth.getGasPrice();
        await contract.methods
          .createNFT(metadataURI)
          .send({ from: account, gasPrice });
        alert("NFT created successfully!");
      } catch (error) {
        console.error("Error creating NFT: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const mintNFT = async () => {
    if (file) {
      const modelURI = await uploadToPinata(file);
      if (modelURI) {
        const metadata = {
          name: "My NFT",
          description: "This is an NFT of a 3D FBX model.",
          model: modelURI,
        };
        const metadataBlob = new Blob([JSON.stringify(metadata)], {
          type: "application/json",
        });
        const metadataFile = new File([metadataBlob], "metadata.json");
        const metadataURI = await uploadToPinata(metadataFile);
        if (metadataURI) {
          await createNFT(metadataURI); // metadataURI를 넘겨줍니다.
        }
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const fetchNFTMetadata = async (tokenId: number) => {
    try {
      const tokenURI = await contract.methods.tokenURI(tokenId).call();

      const gatewayURL = tokenURI.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
      );
      const response = await fetch(gatewayURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const metadata = await response.json();
      return metadata.model;
    } catch (error) {
      console.error("Error fetching metadata: ", error);
      return null;
    }
  };

  const displayNFTModel = async (tokenId: number) => {
    const modelURL = await fetchNFTMetadata(tokenId);
    if (modelURL) {
      setModelURL(modelURL);
    }
  };

  return (
    <div>
      <h1>FBX NFT Creator</h1>
      {account ? (
        <div>
          <p>Connected as {account}</p>
          <input type="file" onChange={handleFileChange} />
          <button onClick={mintNFT} disabled={loading}>
            {loading ? "Creating..." : "Create NFT"}
          </button>
          <button onClick={() => displayNFTModel(13)}>Show NFT Model</button>
          <div className="w-96 h-96">
            {modelURL && (
              <ThreeScene
                backgroundColor={0x000000}
                backgroundOpacity={100}
                showGrid={false}
                modelPath={modelURL}
              />
            )}
          </div>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Web3Info;
