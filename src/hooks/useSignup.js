import { useState } from "react"; // Importing useState hook from React
import {
  handleEmptyInputs, // Function to handle empty inputs
  validatePassword, // Function to handle password matching
} from "../utils/handleInputErrors"; // Utility functions for handling input errors
import toast from "react-hot-toast"; // Library for displaying toast messages
import api from "../api/api"; // Importing API functions for making requests
import { useAuthStore } from "../stores/AuthStore";
import { useChatStore } from "../stores/ChatStore";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const { login: loginAuthStore } = useAuthStore();
  const { setChats, setSelectedChat } = useChatStore();

  // Function to handle user signup
  const signup = async (details) => {
    // Validating user input
    if (!handleEmptyInputs(details)) return;
    if (!validatePassword(details.password, details.conf_password)) return;

    setIsLoading(true); // Setting loading state to true

    try {
      // Making a POST request to signup endpoint with user details
      const res = await api.post("/auth/signup", details);

      // Handling error response
      if (res.data.error) throw new Error(res.data.error);

      localStorage.setItem("session", true);

      // Dispatching action to update authentication context with user data
      loginAuthStore(res.data.user);
      setChats(res.data.chats);
      setSelectedChat(res.data.newChat._id);

      return res.data.newChat._id;
    } catch (error) {
      // Displaying error message in toast if request fails
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false); // Setting loading state back to false
    }
  };

  // Returning signup function and loading state
  return { signup, isLoading };
};

export default useSignup;
