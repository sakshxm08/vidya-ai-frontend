import { useState } from "react"; // Importing useState hook from React
import { handleEmptyInputs } from "../utils/handleInputErrors"; // Function to handle empty input errors
import toast from "react-hot-toast"; // Library for displaying toast messages
import api from "../api/api"; // Importing API functions for making requests
import { useAuthStore } from "../stores/AuthStore";
import { useChatStore } from "../stores/ChatStore";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const { login: loginAuthStore } = useAuthStore();
  const { setChats, setSelectedChat } = useChatStore();
  // Function to handle login process
  const login = async (details) => {
    // Checking for empty inputs
    const success = handleEmptyInputs(details);
    if (!success) return;

    // Setting loading state to true
    setIsLoading(true);
    try {
      // Making a POST request to login endpoint
      const res = await api.post("/auth/login", details);
      // Handling error response
      if (res.data.error) throw new Error(res.data.error);

      localStorage.setItem("session", true);

      // Dispatching action to update auth context with user data
      loginAuthStore(res.data.user);
      setChats(res.data.chats);
      setSelectedChat(res.data.newChat._id);

      return res.data.newChat._id;
    } catch (error) {
      // Displaying error message in toast if request fails
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      // Setting loading state back to false
      setIsLoading(false);
    }
  };

  // Returning loading state and login function
  return { isLoading, login };
};

export default useLogin;
