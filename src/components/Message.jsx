// Import necessary modules and hooks
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";

// Message component definition
const Message = ({ message, loading = false }) => {
  // Access authentication context using custom hook
  // Determine if message was sent by the authenticated user
  const sent = message?.role === "user";

  // Determine chat bubble class name based on message sender
  const chatClassName = sent ? "chat-end" : "chat-start";

  // Determine chat bubble color based on message sender
  const chatBubbleColor = sent
    ? "bg-primary-500 dark:bg-primary-400 text-white"
    : "bg-white dark:bg-dark text-black dark:text-gray-100";

  // Determine time color based on message sender
  const timeColor = sent ? "text-gray-200" : "text-gray-400";

  // JSX rendering
  return (
    <div className={`chat ${chatClassName}`}>
      <div
        className={`chat-bubble ${chatBubbleColor} ${
          loading && "flex items-center justify-center"
        }`}
      >
        {/* Render message text */}
        <ReactMarkdown>{message?.message}</ReactMarkdown>
        <div
          className={`flex items-end justify-end text-[10px] w-full ${timeColor}`}
        ></div>
        <div className="flex items-center justify-center">
          {loading && <BeatLoader size={12} color="gray" />}
        </div>
      </div>
    </div>
  );
};

// Define prop types for Message component
Message.propTypes = {
  message: PropTypes.object, // Message object
  loading: PropTypes.bool, // Message object
};

// Export Message component
export default Message;
