import Web3 from 'web3';
import FBXNFT from '../../../../build/contracts/FBXNFT.json';
import { useWeb3Store } from '../../../store/useStore';

export const initializeWeb3 = async () => {
    const { setWeb3, setContract } = useWeb3Store.getState();

    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = (FBXNFT as any).networks[networkId.toString()];

        if (deployedNetwork) {
            const instance = new web3.eth.Contract(
                (FBXNFT as any).abi,
                deployedNetwork && deployedNetwork.address
            );
            setContract(instance);
        } else {
            console.log("Contract not deployed on current network");
        }
    } else {
        console.log("MetaMask가 설치되어 있지 않습니다.");
    }
};
