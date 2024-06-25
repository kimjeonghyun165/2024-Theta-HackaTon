import Web3 from 'web3';

type MetaMaskConnectOptions = {
    onConnect: (accounts: string[]) => void;
    onError: (error: Error) => void;
};

export const connectToMetaMask = async ({ onConnect, onError }: MetaMaskConnectOptions): Promise<void> => {
    try {
        if (!window.ethereum) {
            throw new Error('MetaMask가 설치되어 있지 않습니다.');
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const web3 = new Web3(window.ethereum);
        onConnect(accounts);
        console.log(web3)
    } catch (error: any) {
        onError(error);
    }
};
