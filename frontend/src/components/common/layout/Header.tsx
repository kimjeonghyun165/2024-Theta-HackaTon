import Avatar from "../Avatar";
import { Link } from "react-scroll";
import { useUserStore } from "../../../store/useUserStore";
import DropDown from "../Dropdown";
import { useLogout } from "../../../hooks/useLogout";
import Logo from "../../../assets/Logo";
import AccountModalOpenButton from "../modal/accountModal/AccountModalOpenButton";

export const Header = () => {
  const { user } = useUserStore();
  const pathName = window.location.pathname;
  const logout = useLogout();


  return (
    <header className="sticky top-0 left-0 right-0 z-30 bg-opacity-95 backdrop-blur-[1px] h-12">
      <div className="relative flex justify-between py-2 navbar md:py-4 md:gap-1 lg:gap-2">
        <div className="flex">
          <a className="btn btn-ghost btn-sm md:btn-md" href="/">
            <Logo />
          </a>
        </div>
        <div className="flex items-center gap-6">
          {pathName === "/" && (
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
                to="market-section"
                smooth={true}
                duration={500}
                offset={-75}
                className="text-xl btn btn-ghost"
              >
                Market
              </Link>
              <Link
                to="pricing-section"
                smooth={true}
                duration={500}
                offset={-75}
                className="text-xl btn btn-ghost"
              >
                Pricing
              </Link>
              <Link
                to="contact-section"
                smooth={true}
                duration={500}
                offset={-75}
                className="text-xl btn btn-ghost"
              >
                Contact
              </Link>
            </div>
          )}
          {user ? (
            <DropDown
              buttonContent={<Avatar img={user.profileImg} />}
              items={[
                { label: "Profile", href: "/mypage" },
                { label: "Logout", onClick: () => logout() },
              ]}
            />
          ) : (
            <AccountModalOpenButton />
          )}
        </div>
      </div>
    </header >
  );
};
