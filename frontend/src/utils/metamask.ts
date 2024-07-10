import Web3 from 'web3';
import { useUserStore } from '../store/useUserStore';

const connectAndSignMessage = async () => {
    const { setJwtToken, setUser, fetchUser, addUser } = useUserStore.getState();

    try {
        if (!window.ethereum) {
            throw new Error('MetaMask가 설치되어 있지 않습니다.');
        }

        const web3 = new Web3(window.ethereum);
        const addresses = await web3.eth.requestAccounts();
        const address = addresses[0];
        const message = 'Sign this message to confirm your wallet address';
        const signature = await web3.eth.personal.sign(message, address, '');

        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: address, signature, message }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to authenticate');
        }

        const data = await response.json();
        localStorage.setItem('token', data.access_token); // JWT 토큰 저장
        setJwtToken(data.access_token);

        await fetchUser();

        const { user } = useUserStore.getState();
        if (!user) {
            await addUser({ address, signature, message });
        }

    } catch (error: any) {
        console.error('Error connecting to MetaMask or signing message:', error);
        setUser(null);
    }
};

export default connectAndSignMessage;
