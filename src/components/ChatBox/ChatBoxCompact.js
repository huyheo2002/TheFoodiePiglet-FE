import Image from "../Image";
import clsx from "clsx";
import * as chatServices from "../../services/chatServices";
import * as commonServices from "../../services/commonServices";
import * as userServices from "../../services/userServices";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import avaGroup from "../../assets/images/GroupChat/ava4.jpg";
import GlobalContext from "../../contexts/globalContext";
import { BellIcon } from "../Icons";
import { useAuth } from "../../contexts/authContext";

function ChatBoxCompact({ idTest, active, onClick, data }) {
  const {
    setImageChatRoom,
    reloadSidebarChat,
  } = useContext(GlobalContext);
  const { dataUser } = useAuth();
  const [showImageGroup, setShowImageGroup] = useState(null);
  const [messageLastest, setMessageLastest] = useState(null);
  const [nameRoom, setNameRoom] = useState(null);

  const handleGetAllRoomParticipant = async (userId) => {
    const respon = await chatServices.getAllRoomParticipant();
    if (respon && respon.errCode === 0) {
      const dataRoom = respon.room;
      let dataRoomParticipant = [];
      if (Array.isArray(dataRoom) === true) {
        dataRoomParticipant =
          dataRoom.length > 0 &&
          dataRoom.filter((item) => item.roomId === data.roomId);
        if (dataRoomParticipant.length === 2) {
          let getAvatar = dataRoomParticipant.filter(
            (item) => item.userId !== userId
          );
          if (getAvatar.length > 0) {
            if (getAvatar[0].User.avatar === null) {
              setShowImageGroup("");
            } else {
              const server = process.env.REACT_APP_BACKEND_URL;
              const image = `/public/avatar/${getAvatar[0].User.avatar}`;
              let newStr = server.concat(image);
              setShowImageGroup(newStr);
            }
          }
        } else if (dataRoomParticipant.length > 2) {
          const server = process.env.REACT_APP_FRONTEND_URL;
          const image = avaGroup;

          let newStr = server.concat(image);
          setShowImageGroup(newStr);
        } else if (dataRoomParticipant.length === 1) {
          if (dataRoomParticipant[0].User.avatar === null) {
            setShowImageGroup("");
          } else {
            const server = process.env.REACT_APP_BACKEND_URL;
            const image = `/public/avatar/${dataRoomParticipant[0].User.avatar}`;
            let newStr = server.concat(image);
            setShowImageGroup(newStr);
          }
        }
      }
    }
  };

  useEffect(() => {
    handleGetNameRoom(`${dataUser.name} (${dataUser.roleName})`);
    handleGetAllRoomParticipant(dataUser.id);
    handleGetAllMessageInRoom();
  }, [reloadSidebarChat]);

  const formatDateTime = (dateTimeString) => {
    const currentDate = new Date();
    const providedDate = new Date(dateTimeString);

    const differenceInMilliseconds =
      currentDate.getTime() - providedDate.getTime();
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays >= 1) {
      return `${differenceInDays} ngày trước`;
    } else if (differenceInHours >= 1) {
      return `${differenceInHours} giờ trước`;
    } else if (differenceInMinutes >= 1) {
      return `${differenceInMinutes} phút trước`;
    } else {
      return "Vừa xong";
    }
  };

  const handleGetAllMessageInRoom = async () => {
    const respon = await chatServices.getAllMessage();
    if (respon && respon.errCode === 0) {
      let listMessage = respon.messages;
      if (listMessage.length > 0) {
        const filterMessageInRoom = listMessage.filter(
          (item) => item.roomId === data.roomId
        );
        if (filterMessageInRoom.length > 0) {
          const sortedMessages = filterMessageInRoom.sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return timeB - timeA;
          });

          const latestMessage = sortedMessages[0];
          setMessageLastest(latestMessage);
        }
      }
    }
  };

  const handleGetNameRoom = async (nameGroup) => {
    if (nameGroup === data.ChatRoom.name) {
      const responFindUser = await userServices.getAllUsers(
        data.ChatRoom.roomCreatorId
      );
      if (responFindUser && responFindUser.errCode === 0) {
        setNameRoom(
          `${responFindUser.users.name} (${responFindUser.users.username})`
        );
      }
    } else {
      setNameRoom(data.ChatRoom.name);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center w-full px-2 py-1 cursor-pointer hover:bg-gray-100 rounded-md overflow-hidden",
        {
          "bg-[#e6f2fe] hover:!bg-[#e6f2fe]": idTest === active,
        }
      )}
      onClick={() => {
        onClick && onClick();
        setImageChatRoom(showImageGroup);
      }}
    >
      <Image
        src={showImageGroup && showImageGroup}
        className={"w-14 h-14 rounded-full"}
      />
      <div className="flex flex-col ml-2 w-[75%] overflow-hidden">
        <div className="flex justify-between items-start">
          <h3 className="text-base text-black font-semibold">
            {nameRoom && nameRoom}
          </h3>
          <span
            className={clsx(
              "text-sm text-[#65676b] font-normal ml-2 whitespace-nowrap",
              {
                "text-green-500":
                  dataUser &&
                  messageLastest &&
                  dataUser.user.id !== messageLastest.userId,
              }
            )}
          >
            <BellIcon />
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-[#65676b] font-normal overflow-hidden whitespace-nowrap overflow-ellipsis">
            {messageLastest
              ? messageLastest.content
              : "Hiện tại chưa có tin nhắn nào"}
          </p>
          <span className="text-sm text-[#65676b] font-normal ml-2 whitespace-nowrap">
            {messageLastest && formatDateTime(messageLastest.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatBoxCompact;
