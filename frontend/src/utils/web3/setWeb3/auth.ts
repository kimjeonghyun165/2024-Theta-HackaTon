import Web3 from 'web3';
import { useUserStore } from '../../../store/useUserStore';

const SignatureMessage = (address: string) => {
    const uri = "https://griel.ai";
    const chainId = 365;
    const nonce = "bez0awkg/추후생성예정";
    const issuedAt = new Date().toISOString();

    return `Sign In\n\nAddress: ${address}\nURI: ${uri}\nChain ID: ${chainId}\nNonce: ${nonce}\nIssued At: ${issuedAt}`;
};

export const signMessageAndAuthenticate = async (web3: Web3, address: string) => {
    const { setJwtToken, fetchUser, addUser } = useUserStore.getState();
    const message = SignatureMessage(address);
    const signature = await web3.eth.personal.sign(message, address, '');

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, signature, message }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to authenticate');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    setJwtToken(data.access_token);

    await fetchUser();

    const { user } = useUserStore.getState();

    if (!user) {
        await addUser({ address, signature, message });
    }

    return user;
};
