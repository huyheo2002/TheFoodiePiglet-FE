import ChatBox from "../../../components/ChatBox";

function Chat() {
    return (
        <div className="pl-3 w-[calc(100%-1rem)] mb-3 h-[calc(100vh-64px-46px)] overflow-hidden">
            <div className="bg-white px-3 py-4 rounded-lg shadow-black-rb-0.35 h-full">
                <div className="bg-red-400 rounded-lg w-full h-full">
                    <ChatBox />
                </div>
            </div>
        </div>
    );
}

export default Chat;