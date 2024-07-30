import Web3 from 'web3';
import { login } from '../../../api/userApi';
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

    const data = await login(address, signature, message);
    localStorage.setItem('token', data.access_token);
    setJwtToken(data.access_token);

    await fetchUser();

    const { user } = useUserStore.getState();

    if (!user) {
        await addUser({
            address, signature, message,
            credits: 0,
            likedModels: [],
            status: 'active'
        });
    }

    return user;
};
