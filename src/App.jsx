import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useAuthContext from "./hooks/useAuthContext";

const Layout = () => {
  return (
    <div className="p-6 flex flex-col items-center w-full gap-4">
      <Navbar />
      <Outlet />
    </div>
  );
};

const App = () => {
  const Auth = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // {
        //   path: "",
        //   element: Auth.user ? <Home /> : <Navigate to="/login" />,
        //   children: [{ path: "m/:contact_id", element: <MessageSection /> }],
        // },
        {
          path: "signup",
          element: Auth.user ? <Navigate to="/" /> : <Signup />,
        },
        {
          path: "login",
          element: Auth.user ? <Navigate to="/" /> : <Login />,
        },
      ],
    },
  ]);
  return (
    <div className="min-h-screen min-w-screen bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-text">
      {Auth.loading ? (
        <span className="loading loading-spinner dark:bg-white loading-lg"></span>
      ) : (
        <RouterProvider router={router} />
      )}
      <Toaster />
    </div>
  );
};

export default App;
