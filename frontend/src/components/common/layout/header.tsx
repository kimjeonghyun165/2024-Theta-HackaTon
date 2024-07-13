import { useState } from "react";
import Logo from "../../../assets/logo";
import connectAndSignMessage from "../../../utils/metamask";
import Avatar from "../avatar";
import { Link } from "react-scroll";
import { useUserStore } from "../../../store/useUserStore";
import DropDown from "../dropdown";

export const Header = () => {
  const { user } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      await connectAndSignMessage();
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
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
          <div className="hidden md:flex gap-12">
            <Link
              to="about-section"
              smooth={true}
              duration={500}
              offset={-75}
              className="btn btn-ghost text-xl"
            >
              About
            </Link>
            <Link
              className="btn btn-ghost text-xl"
              to="market-section"
              smooth={true}
              duration={500}
              offset={-75}
            >
              Market
            </Link>
            <a className="btn btn-ghost text-xl">Pricing</a>
            <Link
              to="contact-section"
              smooth={true}
              duration={500}
              className="btn btn-ghost text-xl"
            >
              Contact
            </Link>
          </div>
          {user ? (
            <DropDown>
              <Avatar img={user.profileImg} />
            </DropDown>
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
