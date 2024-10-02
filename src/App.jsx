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
import Home from "./pages/Home";
import MessageSection from "./components/MessageSection";
import { useAuthStore } from "./stores/AuthStore";
import { useEffect } from "react";

const Layout = () => {
  const { loading, refresh } = useAuthStore();

  useEffect(() => {
    const loginOnRefresh = async () => {
      await refresh();
    };
    loginOnRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <span className="loading loading-spinner dark:bg-white loading-lg"></span>
  ) : (
    <div className="p-6 flex flex-col items-center w-full gap-4">
      <Navbar />
      <Outlet />
    </div>
  );
};

const App = () => {
  const { user } = useAuthStore();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "",
          element: user ? <Home /> : <Navigate to="/login" />,
          children: [{ path: "c/:chatId", element: <MessageSection /> }],
        },
        {
          path: "signup",
          element: user ? <Navigate to="/" /> : <Signup />,
        },
        {
          path: "login",
          element: user ? <Navigate to="/" /> : <Login />,
        },
      ],
    },
  ]);
  return (
    <div className="min-h-screen min-w-screen bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-text">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
