import { useUserStore } from "../../../store/useUserStore";
import { signMessageAndAuthenticate } from "./auth";
import { connectWallet } from "./connectWallet";


const connectAndSignMessage = async () => {
    const { setUser } = useUserStore.getState();
    try {
        const { web3, address } = await connectWallet();
        await signMessageAndAuthenticate(web3, address);
    } catch (error: any) {
        console.error('Error connecting to MetaMask or signing message:', error);
        setUser(null);
    }
};

export default connectAndSignMessage;
