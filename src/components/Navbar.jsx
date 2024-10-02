import { Link } from "react-router-dom";
import { logo } from "../assets/assets";
import useLogout from "../hooks/useLogout";
import ThemeController from "./ThemeController";
import { useAuthStore } from "../stores/AuthStore";

const Navbar = () => {
  const Auth = useAuthStore();

  const { logout } = useLogout();
  return (
    <div className="navbar bg-base-100 px-4 rounded-xl shadow dark:text-gray-100 dark:bg-dark">
      <div className="flex-1">
        <Link to="/" className="w-fit flex gap-2 items-center">
          <img src={logo} alt="" className="h-14" />
          <h1 className="text-2xl font-black font-heading">VidyaAI</h1>
        </Link>
      </div>
      <div className="flex-none gap-4">
        <ThemeController />
        {Auth.user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={Auth.user.f_name || "User"} src={Auth.user.avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-dark rounded-box w-52"
            >
              <div className="pt-2 pb-3 border-b dark:border-gray-600">
                <div className="flex flex-col *:py-0 px-3">
                  <h2 className="text-lg">
                    {Auth.user.f_name} {Auth.user.l_name}
                  </h2>
                  <h4 className="text-xs text-gray-500 dark:text-gray-400">
                    @{Auth.user.username}
                  </h4>
                </div>
              </div>
              <div className="py-2">
                {/* <li className="dark:hover:bg-gray-900 transition-all rounded-lg">
                  <a className="justify-between">Profile</a>
                </li>
                <li className="dark:hover:bg-gray-900 transition-all rounded-lg">
                  <a>Settings</a>
                </li> */}
                <li
                  className="dark:hover:bg-gray-900 transition-all rounded-lg"
                  onClick={logout}
                >
                  <div>Logout</div>
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
