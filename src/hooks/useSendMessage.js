import toast from "react-hot-toast"; // Library for displaying toast messages
import api from "../api/api"; // Importing API functions for making requests
import { useParams } from "react-router-dom";
import { useChatStore } from "../stores/ChatStore";
// import useConversationContext from "./useConversationContext"; // Custom hook to access conversation context

const useSendMessage = () => {
  const { addMessage, setMessageSending, updateChatTime } = useChatStore();

  const { chatId } = useParams();
  // Function to send a message
  const sendMessage = async (message) => {
    setMessageSending(true); // Setting loading state to true
    try {
      updateChatTime(chatId);
      addMessage(chatId, message, "user");

      // Making a POST request to send message to the selected contact
      const res = await api.post(`/chat/${chatId}/send-message`, { message });
      console.log(res);

      addMessage(chatId, res.data?.response, "ai");

      // Handling error response
      if (res.data.error) throw new Error(res.data.error);
      return true; // Returning true to indicate successful message sending
    } catch (error) {
      // Displaying error message in toast if request fails
      toast.error(error.response.data.message);
      return false; // Returning false to indicate failed message sending
    } finally {
      // Setting loading state back to false
      setMessageSending(false);
    }
  };

  // Returning loading state and sendMessage function
  return { sendMessage };
};

export default useSendMessage;
