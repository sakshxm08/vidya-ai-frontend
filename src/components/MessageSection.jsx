// Import necessary modules, hooks, and components
import { memo, useEffect, useRef, useState } from "react"; // React hooks
import MessageInput from "./MessageInput"; // Component for message input field
import { useParams } from "react-router-dom"; // Hook to access URL parameters
import Message from "./Message"; // Component for displaying messages
import { useChatStore } from "../stores/ChatStore";
import api from "../api/api";

// Memoized MessageSection component definition
const MessageSection = memo(() => {
  const { chatId } = useParams();
  const { chats, selectedChat, setSelectedChat, setMessages, messageSending } =
    useChatStore();
  const [isLoading, setIsLoading] = useState(true);

  console.log(chatId, selectedChat);
  useEffect(() => {
    setSelectedChat(chatId);
    if (!selectedChat) {
      const getMessages = async () => {
        try {
          const { data } = await api.get(`/chat/${chatId}`);
          setMessages(data);
          setSelectedChat();
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      };
      getMessages();
    }
  }, [chatId, selectedChat, setMessages, setSelectedChat]);

  // Reference to message element for scrolling
  const messageEl = useRef(null);

  // Effect to scroll to bottom when new messages are loaded
  useEffect(() => {
    const scrollToBottom = () => {
      if (messageEl.current) {
        messageEl.current.scrollTo({
          top: messageEl.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    const observer = new MutationObserver(scrollToBottom);
    const config = { childList: true, subtree: true };

    if (messageEl.current) {
      observer.observe(messageEl.current, config);
    }

    // Call scrollToBottom once initially to handle any pre-existing messages
    scrollToBottom();

    return () => {
      if (messageEl) {
        observer.disconnect();
      }
    };
  }, [chatId]);

  // JSX rendering
  console.log(chats.find((chat) => chatId == chat._id));
  return selectedChat || chats.find((chat) => chatId == chat._id) ? (
    <div className="rounded-xl flex flex-col w-full gap-4 bg-base-100 dark:bg-dark h-[40rem] shadow p-4 overflow-scroll">
      {isLoading ? (
        <div className="rounded-xl bg-base-200 dark:bg-gray-700 text-sm h-full">
          {/* Message container */}
          <div
            ref={messageEl}
            className="h-[33.2rem] px-4 pt-4 flex flex-col gap-2 overflow-y-scroll"
          >
            {/* Render messages by date */}
            {selectedChat?.messages.map((msg, index) => (
              <div key={index}>
                {/* Messages for the date */}
                <Message message={msg} />
              </div>
            ))}
            {messageSending && <Message loading={true} />}
          </div>

          {/* Message input field */}
          <div className="p-4 w-full">
            <MessageInput />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  ) : (
    <></> // Render nothing if no selected contact
  );
});

// Set display name for MessageSection component
MessageSection.displayName = "MessageSection";

// Export MessageSection component
export default MessageSection;
