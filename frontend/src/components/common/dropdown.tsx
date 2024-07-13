import logout from "../../utils/logout";

const DropDown = ({ children }: { children: React.ReactNode }) => {
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost m-1">
        {children}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <a>my Profile</a>
        </li>
        <li>
          <a>setting</a>
        </li>
        <li>
          <a onClick={() => handleLogout()}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
