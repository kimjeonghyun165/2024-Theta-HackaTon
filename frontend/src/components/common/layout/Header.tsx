import Avatar from "../Avatar";
import { Link } from "react-scroll";
import { useUserStore } from "../../../store/useUserStore";
import connectAndSignMessage from "../../../utils/web3/setWeb3/connectAndSignMessage";
import DropDown from "../Dropdown";
import { useLogout } from "../../../hooks/useLogout";
import Logo from "../../../assets/Logo";

export const Header = () => {
  const { user, jwtToken } = useUserStore();

  const handleConnect = async () => {
    try {
      await connectAndSignMessage();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const logout = useLogout();

  return (
    <header className="sticky top-0 left-0 right-0 z-30 bg-opacity-95 backdrop-blur-[1px]">
      <div className="relative flex justify-between py-2 navbar md:py-4 md:gap-1 lg:gap-2">
        <div className="flex">
          <a className="btn btn-ghost btn-sm md:btn-md" href="/">
            <Logo />
          </a>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden gap-12 md:flex">
            <Link
              to="about-section"
              smooth={true}
              duration={500}
              offset={-75}
              className="text-xl btn btn-ghost"
            >
              About
            </Link>
            <Link
              className="text-xl btn btn-ghost"
              to="market-section"
              smooth={true}
              duration={500}
              offset={-75}
            >
              Market
            </Link>
            <Link
              to="pricing-section"
              smooth={true}
              duration={500}
              className="text-xl btn btn-ghost"
            >
              Pricing
            </Link>
            <Link
              to="contact-section"
              smooth={true}
              duration={500}
              className="text-xl btn btn-ghost"
            >
              Contact
            </Link>
          </div>
          {user && jwtToken ? (
            <DropDown
              buttonContent={<Avatar img={user.profileImg} />}
              items={[
                { label: "Profile", href: "/mypage" },
                { label: "Logout", onClick: () => logout() },
              ]}
            />
          ) : (
            <div className="text-xl btn btn-ghost" onClick={handleConnect}>
              Log-In
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
