import { DotHorizontalIcon, PlusIcon } from "../Icons";
import Search from "../Search";
import ItemSearchResult from "../ItemSearchResult";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import ChatBoxCompact from "./ChatBoxCompact";
import * as userServices from "../../services/userServices";
import * as chatServices from "../../services/chatServices";
import GlobalContext from "../../contexts/globalContext";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";

function Sidebar() {
  const { setIdChatRoom, idChatRoom } = useContext(GlobalContext);
  const [activeOption, setActiveOption] = useState(1);
  const [chatBoxActive, setChatBoxActive] = useState(-1);
  const [listUser, setListUser] = useState([]);
  const { dataUser } = useAuth();
  const [listChatroom, setListChatroom] = useState([]);

  const handleGetAllUsers = async () => {
    const responseUser = await userServices.getAllUsers("all");
    if (responseUser && responseUser.errCode === 0 && responseUser.users) {
      if (dataUser) {
        const listUser = responseUser.users || [];
        const filterListUser =
          listUser.length > 0 &&
          listUser.filter(
            (item) => item.id !== dataUser.user.id && item.Role.name !== "User"
          );
        setListUser(filterListUser);

        return dataUser;
      }
    }
  };

  const handleGetAllRoomParticipant = async () => {
    const response = await chatServices.getAllRoomParticipant();
    if (response && response.errCode === 0) {
      return response.room;
    }

    return;
  };

  const fetchData = async () => {
    try {
      const result = await handleGetAllUsers();
      if (result) {
        const id = result.user.id;
        const listRoomParticipant = await handleGetAllRoomParticipant();

        const filterRoomParticipant =
          listRoomParticipant.length > 0 &&
          listRoomParticipant.filter((item) => item.userId === id);
        if (filterRoomParticipant.length > 0) {
          filterRoomParticipant.sort(
            (a, b) =>
              new Date(b.ChatRoom.createdAt) - new Date(a.ChatRoom.createdAt)
          );
          setListChatroom(filterRoomParticipant);
        }
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error} `);
    }
  };

  useEffect(() => {
    // bug nháy UI
    setListChatroom([]);
    fetchData();
  }, [idChatRoom]);

  return (
    <div className="pr-3">
      <div className="flex justify-between items-center">
        <h3 className="text-black font-semibold text-xl">Chat</h3>
        <div className="flex items-center">
          <DotHorizontalIcon
            className={
              "text-black bg-gray-200 rounded-full !w-8 !h-8 p-2 overflow-hidden mx-1 cursor-pointer hover:bg-gray-300 transition-all"
            }
          />
          <PlusIcon
            className={
              "text-black bg-gray-200 rounded-full !w-8 !h-8 p-2 overflow-hidden mx-1 cursor-pointer hover:bg-gray-300 transition-all"
            }
          />
        </div>
      </div>

      <div className="w-full">
        <Search
          ItemSearchResult={ItemSearchResult}
          type={"User"}
          listData={listUser}
        />
      </div>

      <div className="w-full my-2 flex items-center">
        <div
          className={clsx(
            "px-2 py-1 bg-white rounded-lg overflow-hidden text-black text-sm font-semibold cursor-pointer mr-2 hover:bg-gray-300 transition-all",
            {
              "!bg-[#e6f2fe] !text-[#548be6]": activeOption === 1,
            }
          )}
          onClick={() => {
            if (activeOption !== 1) {
              setActiveOption(1);
            }
          }}
        >
          Hộp thư
        </div>
        <div
          className={clsx(
            "px-2 py-1 bg-white rounded-lg overflow-hidden text-black text-sm font-semibold cursor-pointer mr-2 hover:bg-gray-300 transition-all",
            {
              "!bg-[#e6f2fe] !text-[#548be6]": activeOption === 2,
            }
          )}
          onClick={() => {
            if (activeOption !== 2) {
              setActiveOption(2);
            }
          }}
        >
          Cộng đồng
        </div>
      </div>

      <div className="w-full my-2 overflow-y-scroll scrollbar h-[480px]">
        {listChatroom.length > 0 ? (
          listChatroom.map((item, index) => {
            return (
              <ChatBoxCompact
                key={index}
                data={item}
                active={chatBoxActive}
                idTest={index}
                onClick={() => {
                  setChatBoxActive(index);
                  setIdChatRoom(item.ChatRoom.id);
                }}
              />
            );
          })
        ) : (
          <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">Oops!</h1>
            <p className="text-gray-600 mb-4 text-center">
              Gần đây bạn chưa nhắn tin với người nào.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
