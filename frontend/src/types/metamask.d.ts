// declare global {
//     interface Window {
//         ethereum?: {
//             request: (args: { method: string }) => Promise<string[]>;
//         };
//     }
// }

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

export { }


