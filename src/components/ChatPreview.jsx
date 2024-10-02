// Import necessary modules and components
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// ContactPreview component definition
const ChatPreview = ({ chat }) => {
  // Access socket context using custom hook

  // JSX rendering
  return (
    <NavLink
      to={`/c/${chat._id}`}
      className={({ isActive }) =>
        (isActive
          ? "dark:bg-gray-900/60 bg-base-300/60"
          : "hover:bg-base-200/60 dark:hover:bg-gray-900/30") +
        " p-2 dark:text-gray-100 transition-all flex gap-4 items-center cursor-pointer rounded-md"
      }
    >
      <div className="flex flex-col md:w-[calc(100%-3rem)] lg:w-[calc(100%-3.5rem)] xl:w-[calc(100%-4rem)]">
        <h4 className="font-medium md:text-sm lg:text-base">{chat._id}</h4>
      </div>
    </NavLink>
  );
};

// Define prop types for ContactPreview component
ChatPreview.propTypes = {
  chat: PropTypes.object, // Contact prop should be an object
};

// Export ContactPreview component
export default ChatPreview;
