import Logo from "../../../assets/logo";

export const Navbar = () => {
  return (
    <div className="navbar bg-black w-full">
      <div className="flex-1">
        <div className="btn btn-ghost">
          <Logo />
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Generate</a>
          </li>
          <li>
            <a>Market</a>
          </li>
          <li>
            <a>Pricing</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
