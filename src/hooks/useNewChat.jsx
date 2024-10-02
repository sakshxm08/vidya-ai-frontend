import { useState } from "react"; // Importing useState hook from React
import api from "../api/api"; // Importing API functions for making requests
import { useChatStore } from "../stores/ChatStore";

const useNewChat = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const { setNewChat } = useChatStore();
  // Function to handle login process
  const newChat = async () => {
    // Setting loading state to true
    setIsLoading(true);
    try {
      // Making a POST request to login endpoint
      const res = await api.post("/chat"); // Create new chat
      console.log("Response from server:", res);
      if (res.data.error) throw new Error(res.data.error);

      setNewChat(res.data.chat);
    } catch (error) {
      // Displaying error message in toast if request fails
      // toast.error(error.response.data.message);
      console.log(error);
    } finally {
      // Setting loading state back to false
      setIsLoading(false);
    }
  };

  // Returning loading state and login function
  return { isLoading, newChat };
};

export default useNewChat;
