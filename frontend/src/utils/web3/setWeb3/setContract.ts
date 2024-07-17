import Web3 from 'web3';
import FBXNFT from '../../../../build/contracts/FBXNFT.json'
import { useWeb3Store } from '../../../store/useStore';

export const initializeContract = async (web3: Web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = (FBXNFT as any).networks[networkId.toString()];
    if (deployedNetwork) {
        const instance = new web3.eth.Contract(
            (FBXNFT as any).abi,
            deployedNetwork && deployedNetwork.address
        );
        useWeb3Store.getState().setContract(instance);
    } else {
        console.log("Contract not deployed on current network");
    }
};

