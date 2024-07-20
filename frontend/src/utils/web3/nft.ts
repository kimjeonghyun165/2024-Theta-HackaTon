import { useModelStore } from "../../store/useModelStore";
import { useWeb3Store } from "../../store/useStore";
import { useUserStore } from "../../store/useUserStore";
import { initializeWeb3 } from "./setWeb3/initializeWeb3";

interface Metadata {
  prompt: string | null
  title: string | null;
  description: string | null;
  model?: string | null;
  preview: string | null;
}

const uploadFileToPinata = async (fileUrl: string) => {
  try {
    const response = await fetch('http://localhost:3000/pinata/uploadFromUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileUrl }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Pinata upload error: ', error);
    return null;
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
  await initializeWeb3()
  const { contract, web3 } = useWeb3Store.getState()
  const { user } = useUserStore.getState();
  if (contract && user) {
    try {
      const gasPrice = await web3?.eth.getGasPrice();
      await contract.methods
        .createNFT(metadataURI)
        .send({ from: user.address, gasPrice });
    } catch (error) {
      console.error("Error creating NFT: ", error);
    } finally {
      console.log('success')
    }
  }
};

export const mintNFT = async ({ prompt, title, description, preview }: Metadata) => {
  const { model, setModel } = useModelStore.getState()
  if (model) {
    const ipfsFileUrl = await uploadFileToPinata(model?.file);
    const metadata = {
      prompt: prompt,
      title: title,
      description: description,
      model: model,
      preview: preview,
    };
    const metadataBlob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const metadataFile = new File([metadataBlob], "metadata.json");
    const metadataURI = await uploadToPinata(metadataFile);
    if (metadataURI) {
      await createNFT(metadataURI);
      setModel({ nftDetails: { ...model?.nftDetails, ipfsFile: ipfsFileUrl, ipfsMetadata: metadataURI } })
    }
  }
}


// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   if (event.target.files && event.target.files[0]) {
//     setFile(event.target.files[0]);
//   }
// };

// const fetchNFTMetadata = async (tokenId: number) => {
//   try {
//     const tokenURI = await contract.methods.tokenURI(tokenId).call();

//     const gatewayURL = tokenURI.replace(
//       "ipfs://",
//       "https://gateway.pinata.cloud/ipfs/"
//     );
//     const response = await fetch(gatewayURL);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const metadata = await response.json();
//     return metadata.model;
//   } catch (error) {
//     console.error("Error fetching metadata: ", error);
//     return null;
//   }
// };

// const displayNFTModel = async (tokenId: number) => {
//   const modelURL = await fetchNFTMetadata(tokenId);
//   if (modelURL) {
//     setModelURL(modelURL);
//   }
// };
