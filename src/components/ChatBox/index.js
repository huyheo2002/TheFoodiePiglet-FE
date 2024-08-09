import ChatWindow from "./ChatWindow";
import Sidebar from "./sidebar";

function ChatBox() {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/4 bg-white h-full border-r-2 border-solid border-[#ccc]">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-white">
        <ChatWindow />
      </div>
    </div>
  );
}

export default ChatBox;
