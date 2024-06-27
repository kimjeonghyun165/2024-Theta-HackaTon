import { useState } from "react";
import Logo from "../../assets/logo";
import { connectToMetaMask } from "../../utils/metamask";
import Avatar from "../common/avatar";

export const Header = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [_error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    await connectToMetaMask({
      onConnect: (accounts: string[]) => {
        setAccount(accounts[0]);
        setError(null);
      },
      onError: (error: Error) => {
        setError(error.message);
        setAccount(null);
      },
    });
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-30 bg-opacity-95 backdrop-blur-[1px]">
      <div className="navbar relative flex justify-between py-2 md:py-4 md:gap-1 lg:gap-2">
        <div className="flex">
          <a className="btn btn-ghost btn-sm md:btn-md" href="/">
            <Logo />
          </a>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:block gap-12">
            <a className="btn btn-ghost text-xl">About</a>
            <a className="btn btn-ghost text-xl">Market</a>
            <a className="btn btn-ghost text-xl">Pricing</a>
            <a className="btn btn-ghost text-xl">Contact</a>
          </div>
          {account ? (
            <div className="btn btn-ghost">
              <Avatar />
            </div>
          ) : (
            <div className="btn btn-ghost text-xl" onClick={handleConnect}>
              Log-In
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
