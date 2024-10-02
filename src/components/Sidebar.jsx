// import ContactPreview from "./ContactPreview";

import { useChatStore } from "../stores/ChatStore";
import ContactPreview from "./ChatPreview";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { IoAdd } from "react-icons/io5";
import useNewChat from "../hooks/useNewChat";
// Extend dayjs with necessary plugins
dayjs.extend(isToday);
dayjs.extend(isYesterday);
const Sidebar = () => {
  const { chats } = useChatStore();

  const { newChat } = useNewChat();
  // Helper function to group chats by date
  const groupChatsByDate = (chats) => {
    const grouped = {};

    chats.forEach((chat) => {
      const date = dayjs(chat.updatedAt);

      let label;
      if (date.isToday()) {
        label = "Today";
      } else if (date.isYesterday()) {
        label = "Yesterday";
      } else {
        label = date.format("MMMM D, YYYY"); // For older dates, use a formatted string
      }

      if (!grouped[label]) {
        grouped[label] = [];
      }

      grouped[label].push(chat);
    });

    return grouped;
  };

  const groupedChats = groupChatsByDate(
    chats.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  );

  const handleNewChat = () => {
    newChat();
  };
  return (
    <div className="rounded-xl flex flex-col w-full bg-base-100 dark:bg-dark h-[40rem] overflow-hidden shadow">
      <div className="flex w-full gap-2 items-center px-3 py-4 sticky top-0 bg-white dark:bg-dark/80 z-20 shadow">
        <h2 className="font-bold text-xl dark:text-white">Recent Chats</h2>
      </div>
      <div className="h-full overflow-auto p-4 flex flex-col gap-2">
        <button
          onClick={handleNewChat}
          className="border rounded-md text-left p-2 flex items-center gap-2 hover:bg-gray-50 transition-all active:bg-gray-100 text-sm"
        >
          <IoAdd size={16} />
          New Chat
        </button>
        {Object.keys(groupedChats).map((dateLabel) => (
          <div key={dateLabel} className="flex flex-col gap-2">
            {/* Render the date label */}
            <h3 className="text-sm font-bold gap-2 px-2">{dateLabel}</h3>

            {/* Render the chats for this date */}
            <div className="flex flex-col">
              {groupedChats[dateLabel].map((chat) => (
                <ContactPreview key={chat._id} chat={chat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
