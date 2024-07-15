import Web3 from 'web3';
import { useWeb3Store } from '../../../store/useStore';

export const connectWallet = async () => {
    if (!window.ethereum) {
        throw new Error('MetaMask가 설치되어 있지 않습니다.');
    }
    const web3 = new Web3(window.ethereum);
    const addresses = await web3.eth.requestAccounts();
    const address = addresses[0];

    useWeb3Store.getState().setWeb3(web3);

    return { web3, address };
};
