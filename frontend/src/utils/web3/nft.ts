import React, { useState } from "react";
import { useWeb3Store } from "../../store/useStore";
import { useUserStore } from "../../store/useUserStore";

interface Metadata {
  prompt: string | null
  title: string | null;
  description: string | null;
  model: string | null;
  preview: string | null;
}

const { contract, web3, file, setFile } = useWeb3Store();
const { user } = useUserStore.getState();

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
  if (contract && user) {
    try {
      const gasPrice = await web3?.eth.getGasPrice();
      await contract.methods
        .createNFT(metadataURI)
        .send({ from: user.address, gasPrice });
      alert("NFT created successfully!");
    } catch (error) {
      console.error("Error creating NFT: ", error);
    } finally {
      console.log('success')
    }
  }
};

const mintNFT = async ({ prompt, title, description, model, preview }: Metadata) => {
  if (file) {
    model = await uploadToPinata(file);
    if (model) {
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

// const displayNFTModel = async (tokenId: number) => {
//   const modelURL = await fetchNFTMetadata(tokenId);
//   if (modelURL) {
//     setModelURL(modelURL);
//   }
// };
