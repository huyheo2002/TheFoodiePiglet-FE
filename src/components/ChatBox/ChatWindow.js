import { Fragment, useContext, useEffect, useState } from "react";
import {
  CameraVideoIcon,
  ChangeIcon,
  CrownIcon,
  DotHorizontalIcon,
  EmojiWinkIcon,
  LogOutIcon,
  PhoneIcon,
  SendIcon,
  TrashIcon,
  UserPlusIcon,
  UserSlashIcon,
  UsersIcon,
} from "../Icons";
import Image from "../Image";
import Picker from "@emoji-mart/react";
import DataEmoji from "@emoji-mart/data";
import GlobalContext from "../../contexts/globalContext";
import * as chatServices from "../../services/chatServices";
import robot from "../../assets/images/Base/robot.png";
import Modal from "../Modal";
import Heading from "../Heading";
import Button from "../Button";
import * as roleServices from "../../services/roleServices";
import * as userServices from "../../services/userServices";
import clsx from "clsx";
import InputField from "../FormControl/InputField";
import io from "socket.io-client";
import toast from "react-hot-toast";
import { TBUTTON_VARIANT } from "../../types/button";
import { useAuth } from "../../contexts/authContext";

const socket = io(process.env.REACT_APP_BACKEND_URL) ?? null;

function ChatWindow() {
  const {
    setIdChatRoom,
    idChatRoom,
    imageChatRoom,
    setImageChatRoom,
    reloadSidebarChat,
    setReloadSidebarChat,
  } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const { dataUser } = useAuth();
  const [showEmoji, setShowEmoji] = useState(false);
  const [dataChatRoom, setDataChatRoom] = useState(null);
  const [openModalListMember, setOpenModalListMember] = useState(false);
  const [listMember, setListMember] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [openModalAddMember, setOpenModalAddMember] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [listMemberSelected, setListMemberSelected] = useState([]);
  const [openModalRemoveMember, setOpenModalRemoveMember] = useState(false);

  const inputChangeGroupName = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Enter your group name",
      label: "Group Name",
      pattern: "[\\p{L}0-9.\\s]{3,}",
      errorMessage: "Tên nhóm không được để trống",
      required: true,
    },
  ];
  const [valuesUpdate, setValuesUpdate] = useState({});
  const [openModalUpdateGroupName, setOpenModalUpdateGroupName] =
    useState(false);
  const [idUserPromoteToLeader, setIdUserPromoteToLeader] = useState(null);
  const [openModalPromoteLeader, setOpenModalPromoteLeader] = useState(false);
  const [listMessage, setListMessage] = useState([]);
  const handleFindChatRoomWithID = async (id) => {
    const response = await chatServices.findChatRoom(id);
    if (response && response.errCode === 0) {
      setDataChatRoom(response.room);
    }
  };

  useEffect(() => {
    if (idChatRoom) {
      handleFindChatRoomWithID(idChatRoom);
    } else {
      setDataChatRoom(null);
    }
  }, [idChatRoom]);

  const handleOpenModalListMember = async () => {
    if (idChatRoom) {
      const response = await chatServices.getAllMemberInRoom(idChatRoom);

      if (response && response.errCode === 0) {
        if (Array.isArray(response.room)) {
          setListMember(response.room);
        } else if (typeof response.room === "object") {
          setListMember([response.room]);
        }
      }
    }
    setOpenModalListMember(true);
  };

  const handleCloseModalListMember = () => {
    setOpenModalListMember(false);
  };

  const handleGetAllRole = async () => {
    const response = await roleServices.getAllRoles("all");
    if (response && response.errCode === 0) {
      setListRole(response.roles);
    }
  };

  useEffect(() => {
    handleGetAllRole();
  }, []);

  const handleOpenModalAddMember = async () => {
    const responseUsers = await userServices.getAllUsers("all");
    let listUsers = [];
    if (responseUsers && responseUsers.errCode === 0) {
      listUsers = responseUsers.users;
    }

    let listMemberRoom = [];
    if (idChatRoom) {
      const responseMemberInRoom = await chatServices.getAllMemberInRoom(
        idChatRoom
      );
      if (responseMemberInRoom && responseMemberInRoom.errCode === 0) {
        if (Array.isArray(responseMemberInRoom.room)) {
          listMemberRoom = responseMemberInRoom.room;
        } else if (typeof responseMemberInRoom.room === "object") {
          listMemberRoom = [responseMemberInRoom.room];
        }
      }
    }

    const filteredResponUser =
      listUsers.length > 0 &&
      listMemberRoom.length > 0 &&
      listUsers.filter(
        (user) =>
          !listMemberRoom.some(
            (room) => room.userId === user.id || user.Role.name === "User"
          )
      );

    if (filteredResponUser.length > 0) {
      setListUser(filteredResponUser);
    }

    setOpenModalAddMember(true);
  };

  const handleCloseModalAddMember = () => {
    setOpenModalAddMember(false);
    setListMemberSelected([]);
  };

  const handleAddMember = async () => {
    const data = new FormData();
    data.set("roomId", idChatRoom);
    data.set("userId", listMemberSelected.length > 0 && listMemberSelected);

    if (listMemberSelected.length > 0) {
      try {
        const response = await chatServices.handleAddMember(data);
        if (response && response.errCode === 0) {
          handleFindChatRoomWithID(idChatRoom);
          handleCloseModalAddMember();
          toast.success("Add member successfully");
        } else {
          toast.error(`Error when add member ${response.message} `);
          handleCloseModalAddMember();
        }
      } catch (error) {
        toast.error(`Error when add member into room `);
      }
    } else {
      toast.error("Add member failure, Please try again");
      handleCloseModalAddMember();
    }
  };

  const handleChangeNameGroup = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.set("roomId", idChatRoom);
    data.set("userId", dataUser && dataUser.user.id);

    try {
      const response = await chatServices.handleChangeNameGroup(data);

      if (response && response.errCode === 0) {
        toast.success("Rename group successfully");
        handleFindChatRoomWithID(idChatRoom);
        handleCloseModalGroupName();
      } else if (response.errCode !== 0) {
        toast.error("Rename group failed");
      }
    } catch (error) {
      toast.error("Rename group failed");
    }
  };

  const onChangeInputUpdate = (e) => {
    setValuesUpdate({ ...valuesUpdate, [e.target.name]: e.target.value });
  };

  const inputUpdateClear = (getKey) => {
    setValuesUpdate({ ...valuesUpdate, [getKey]: "" });
  };

  const handleOpenModalGroupName = () => {
    setOpenModalUpdateGroupName(true);
  };

  const handleCloseModalGroupName = () => {
    setOpenModalUpdateGroupName(false);
  };

  const handleOpenModalRemoveMember = async () => {
    const responseUsers = await userServices.getAllUsers("all");
    let listUsers = [];
    if (responseUsers && responseUsers.errCode === 0) {
      listUsers = responseUsers.users;
    }

    let listMemberRoom = [];
    if (idChatRoom) {
      const responseMemberInRoom = await chatServices.getAllMemberInRoom(
        idChatRoom
      );
      if (responseMemberInRoom && responseMemberInRoom.errCode === 0) {
        if (Array.isArray(responseMemberInRoom.room)) {
          listMemberRoom = responseMemberInRoom.room;
        } else if (typeof responseMemberInRoom.room === "object") {
          listMemberRoom = [responseMemberInRoom.room];
        }
      }
    }

    const filteredResponUser =
      listUsers.length > 0 &&
      listMemberRoom.length > 0 &&
      listUsers.filter((user) =>
        listMemberRoom.some(
          (room) =>
            room.userId === user.id &&
            room.userId !== dataChatRoom.roomCreatorId
        )
      );

    if (filteredResponUser.length > 0) {
      setListUser(filteredResponUser);
    }

    setOpenModalRemoveMember(true);
  };

  const handleCloseModalRemoveMember = () => {
    setOpenModalRemoveMember(false);
    setListMemberSelected([]);
  };

  const handleRemoveMember = async () => {
    const data = new FormData();
    data.set("roomId", idChatRoom);
    data.set("userId", listMemberSelected.length > 0 && listMemberSelected);

    if (listMemberSelected.length > 0) {
      try {
        const response = await chatServices.handleRemoveMember(data);
        if (response && response.errCode === 0) {
          handleFindChatRoomWithID(idChatRoom);
          handleCloseModalRemoveMember();
          toast.success("Deleted member successfully");
        } else {
          toast.error("Deleted member fail, please try again");
          handleCloseModalRemoveMember();
        }
      } catch (error) {
        toast.error(`Error when Deleted member ${error}`);
      }
    } else {
      toast.error("Deleted member fail, please try again");
      handleCloseModalRemoveMember();
    }
  };

  const handleLeaveRoom = async () => {
    const data = new FormData();
    data.set("roomId", idChatRoom);
    data.set("userId", dataUser && dataUser.user.id);

    if (idChatRoom) {
      const response = await chatServices.getAllMemberInRoom(idChatRoom);
      let arrListMember = [];
      if (response && response.errCode === 0) {
        if (Array.isArray(response.room)) {
          arrListMember = response.room;
        } else if (typeof response.room === "object") {
          arrListMember = [response.room];
        }
      }

      if (arrListMember.length === 1) {
        const response = await chatServices.handleLeaveRoom(data);
        if (response && response.errCode === 0) {
          setIdChatRoom(null);
          handleFindChatRoomWithID(idChatRoom);
          toast.success("You had leave room successfully");
        } else if (response.errCode !== 0) {
          toast.error(`Error when leave room ${response.message}`);
        }
      } else if (arrListMember.length > 1) {
        if (
          dataChatRoom &&
          dataUser &&
          dataChatRoom.roomCreatorId === dataUser.user.id
        ) {
          toast.error(
            "You are the leader group, please tranfer permission for other before leaving"
          );
          return;
        } else if (dataChatRoom.roomCreatorId !== dataUser.user.id) {
          const response = await chatServices.handleLeaveRoom(data);
          if (response && response.errCode === 0) {
            setIdChatRoom(null);
            handleFindChatRoomWithID(idChatRoom);
            toast.success("You had leave room successfully");
          } else if (response.errCode !== 0) {
            toast.error(`Error when leave room ${response.message}`);
          }
        }
      }
    }
  };

  const handleCloseModalPromoteToLeader = () => {
    setOpenModalPromoteLeader(false);
  };

  const handlePromoteToLeader = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.set("roomId", idChatRoom);
    data.set("userId", idUserPromoteToLeader && idUserPromoteToLeader);

    try {
      const response = await chatServices.handlePromoteToLeader(data);

      if (response && response.errCode === 0) {
        toast.success(
          "You had tranfer permission leader group for other successfully"
        );
        handleFindChatRoomWithID(idChatRoom);
        handleCloseModalPromoteToLeader();
        handleCloseModalListMember();
      } else if (response.errCode !== 0) {
        toast.success("Error when tranfer permission leader group for other");
      }
    } catch (error) {
      toast.success("Error when tranfer permission leader group for other");
    }
  };

  const handleSendLetter = async () => {
    const data = new FormData();
    data.set("roomId", dataChatRoom && dataChatRoom.id);
    data.set("userId", dataUser && dataUser.user.id);
    data.set("content", text);

    try {
      const response = await chatServices.handleCreateMessage(data);

      if (response && response.errCode === 0) {
        setShowEmoji(false);
        setText("");
        handleGetAllMessage();
        setReloadSidebarChat(!reloadSidebarChat);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // socket
  // const handleSendLetter = () => {
  //     const data = {
  //         roomId: dataChatRoom && dataChatRoom.id,
  //         userId: dataUser && dataUser.user.id,
  //         content: text,
  //     };

  //     try {
  //         // Gửi tin nhắn mới qua Socket.IO thay vì sử dụng API
  //         socket.emit("newMessage", data);

  //         // Reset trạng thái và làm mới dữ liệu nếu cần
  //         setShowEmoji(false);
  //         setText("");
  //         handleGetAllMessage();
  //         setReloadSidebarChat(!reloadSidebarChat);

  //         // Cập nhật giá trị của biến để kích hoạt useEffect
  //         // setSendMessageFlag(!sendMessageFlag);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  const handleGetAllMessage = async () => {
    const response = await chatServices.getAllMessage();
    if (response && response.errCode === 0) {
      let messages = response.messages;
      const findMessagesInRoom =
        (idChatRoom &&
          messages.length > 0 &&
          messages.filter((item) => item.roomId === idChatRoom)) ||
        [];
      if (findMessagesInRoom.length > 0) {
        setListMessage(findMessagesInRoom);
      } else {
        if (listMessage.length > 0) {
          setListMessage([]);
        }
      }
    }
  };

  useEffect(() => {
    handleGetAllMessage();
  }, [idChatRoom]);

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

  const handleRecallMessage = async (id) => {
    const data = new FormData();
    data.set("id", id);

    try {
      const response = await chatServices.handleRecallMessage(data);
      if (response && response.errCode === 0) {
        handleGetAllMessage();
        setReloadSidebarChat(!reloadSidebarChat);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMessage = async (id) => {
    const data = new FormData();
    data.set("id", id);

    try {
      const response = await chatServices.handleDeleteMessage(data);
      if (response && response.errCode === 0) {
        handleGetAllMessage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // socket
  // const handleRecallMessageSocket = (id) => {
  //     console.log("handleRecallMessageSocket id", id);
  //     try {
  //         // Gửi tin nhắn mới qua Socket.IO thay vì sử dụng API
  //         socket.emit("recallMessage", id);

  //         // Reset trạng thái và làm mới dữ liệu nếu cần
  //         handleGetAllMessage();
  //         setReloadSidebarChat(!reloadSidebarChat);

  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  // const handleDeleteMessageSocket = (id) => {
  //     console.log("handleRecallMessageSocket id", id);
  //     try {
  //         // Gửi tin nhắn mới qua Socket.IO thay vì sử dụng API
  //         socket.emit("deleteMessage", id);

  //         // Reset trạng thái và làm mới dữ liệu nếu cần
  //         handleGetAllMessage();
  //         setReloadSidebarChat(!reloadSidebarChat);

  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  // useEffect(() => {
  //     console.log("run useEffect socket")
  //     // send letter
  //     socket.on("newMessage", (message) => {
  //         // Xử lý tin nhắn mới nhận được từ server (nếu cần)
  //         console.log("New message received:", message);
  //         if (message && message.errCode === 0) {
  //             console.log("re load send letter");
  //             setShowEmoji(false);
  //             setText("");
  //             handleGetAllMessage();
  //             setReloadSidebarChat(!reloadSidebarChat);
  //         }
  //     });

  //     // recall message
  //     socket.on("recallMessage", (message) => {
  //         // Xử lý tin nhắn mới nhận được từ server (nếu cần)
  //         console.log("Recall message received:", message);
  //         if (message && message.errCode === 0) {
  //             handleGetAllMessage();
  //             setReloadSidebarChat(!reloadSidebarChat);
  //         }
  //     });

  //     // delete message
  //     socket.on("deleteMessage", (message) => {
  //         // Xử lý tin nhắn mới nhận được từ server (nếu cần)
  //         console.log("Delete message received:", message);
  //         if (message && message.errCode === 0) {
  //             handleGetAllMessage();
  //             setReloadSidebarChat(!reloadSidebarChat);
  //         }
  //     });

  //     // return () => {
  //     //     // Ngắt kết nối khi component unmount
  //     //     socket.disconnect();
  //     // };
  // }, [handleSendLetter, handleRecallMessageSocket, handleDeleteMessageSocket]);

  // console.log("dataChatRoom",dataChatRoom);
  // console.log("dataUser",dataUser);

  return (
    <Fragment>
      <div className="bg-white h-full mx-3 mt-2 px-4 pb-2 w-[calc(100%-1.5rem)] rounded-lg shadow-xl flex flex-col justify-between">
        {dataChatRoom ? (
          <Fragment>
            <div className="flex justify-between items-center border-b-2 border-solid border-gray-400 pb-2">
              <div className="flex items-center">
                <Image
                  src={imageChatRoom || ""}
                  className={
                    "w-14 h-14 rounded-full border border-solid border-gray-200"
                  }
                  fallback={imageChatRoom}
                />
                <h3 className="text-lg font-semibold text-black ml-3">
                  {dataUser &&
                  dataChatRoom &&
                  dataUser.user.id !== dataChatRoom.roomCreatorId
                    ? `${dataChatRoom.User.name} (${dataChatRoom.User.username})`
                    : dataChatRoom.name}
                </h3>
              </div>

              <div className="flex items-center">
                <PhoneIcon
                  className={
                    "!w-10 !h-10 cursor-pointer p-2 hover:bg-gray-100 rounded-full text-[#548be6] mx-1"
                  }
                />
                <CameraVideoIcon
                  className={
                    "!w-10 !h-10 cursor-pointer p-2 hover:bg-gray-100 rounded-full text-[#548be6] mx-1"
                  }
                />
                <div className="px-2 relative group h-full flex justify-center items-center">
                  <DotHorizontalIcon
                    className={
                      "!w-10 !h-10 cursor-pointer p-2 hover:bg-gray-100 rounded-full text-[#548be6] mx-1"
                    }
                  />
                  <div className="bg-white text-[#4a4a4a] hidden shadow-black-rb-0.35 flex-col min-w-[14rem] z-50 absolute top-full right-0 rounded-b-lg overflow-hidden group-hover:flex cursor-pointer">
                    {dataChatRoom &&
                      dataUser &&
                      dataChatRoom.roomCreatorId === dataUser.user.id && (
                        <div
                          className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
                          onClick={() => handleOpenModalGroupName()}
                        >
                          <span className="text-current mr-2">
                            <ChangeIcon className={"!w-6 !h-6"} />
                          </span>
                          <p className="text-current whitespace-nowrap inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize">
                            Thay đổi tên nhóm
                          </p>
                        </div>
                      )}
                    <div
                      className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
                      onClick={() => handleOpenModalListMember()}
                    >
                      <span className="text-current mr-2">
                        <UsersIcon className={"!w-6 !h-6"} />
                      </span>
                      <p className="text-current whitespace-nowrap inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize">
                        Danh sách thành viên
                      </p>
                    </div>
                    {dataChatRoom &&
                      dataUser &&
                      dataChatRoom.roomCreatorId === dataUser.user.id && (
                        <div
                          className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
                          onClick={() => handleOpenModalAddMember()}
                        >
                          <span className="text-current mr-2">
                            <UserPlusIcon className={"!w-6 !h-6"} />
                          </span>
                          <p className="text-current whitespace-nowrap inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize">
                            Thêm thành viên
                          </p>
                        </div>
                      )}

                    {dataChatRoom &&
                      dataUser &&
                      dataChatRoom.roomCreatorId === dataUser.user.id && (
                        <div
                          className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
                          onClick={() => handleOpenModalRemoveMember()}
                        >
                          <span className="text-current mr-2">
                            <UserSlashIcon className={"!w-6 !h-6"} />
                          </span>
                          <p className="text-current whitespace-nowrap inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize">
                            Xóa thành viên
                          </p>
                        </div>
                      )}
                    <div
                      className="w-full h-10 leading-10 relative select-none group hover:bg-[#e6f2fe] transition-all duration-300 rounded-lg px-4 inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize hover:text-[#548be6]"
                      onClick={() => handleLeaveRoom()}
                    >
                      <span className="text-current mr-2">
                        <LogOutIcon className={"!w-6 !h-6"} />
                      </span>
                      <p className="text-current whitespace-nowrap inline-flex items-center text-[#4a4a4a] text-sm font-medium tracking-wider capitalize">
                        Rời cuộc trò truyện
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col justify-between">
              <div className="w-full h-full max-h-[440px] overflow-y-scroll scrollbar px-2 pt-2">
                <div className="flex flex-col space-y-4">
                  {listMessage.length > 0 &&
                    listMessage.map((item, index) => {
                      let getTime = formatDateTime(item.createdAt);
                      let canRecall = true;

                      if (item.content === "Tin nhắn đã được thu hồi") {
                        canRecall = false;
                      }

                      const server = process.env.REACT_APP_BACKEND_URL;
                      const image = `/public/avatar/${item.User.avatar}`;
                      const getAvatar = server.concat(image);

                      if (dataUser && item.userId === dataUser.user.id) {
                        return (
                          <div
                            className="flex items-end justify-end group"
                            key={index}
                          >
                            <span className="mr-2 hidden group-hover:flex">
                              {canRecall && (
                                <ChangeIcon
                                  className={
                                    "mr-1 !w-6 !h-6 p-1 rounded-full text-gray-400 cursor-pointer hover:text-gray-500 hover:bg-gray-200"
                                  }
                                  onClick={() => handleRecallMessage(item.id)}
                                />
                              )}
                              <TrashIcon
                                className={
                                  "!w-6 !h-6 p-1 rounded-full text-gray-400 cursor-pointer hover:text-gray-500 hover:bg-gray-200"
                                }
                                onClick={() => handleDeleteMessage(item.id)}
                              />
                            </span>
                            <div className="flex flex-col items-end">
                              <p className="text-[#65676B] text-sm font-normal">
                                {item.User.name || item.User.username}
                              </p>
                              <div
                                className="bg-blue-500 text-white p-3 rounded-lg max-w-xs"
                                title={getTime}
                              >
                                <p>{item.content}</p>
                              </div>
                            </div>
                            <span title={item.User.name || item.User.username}>
                              <Image
                                src={item.User.avatar ? getAvatar : ""}
                                className={
                                  "!w-14 !h-14 ml-2 border border-gray-300 rounded-full"
                                }
                              />
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div
                          className="flex items-end justify-start group"
                          key={index}
                        >
                          <span title={item.User.name || item.User.username}>
                            <Image
                              src={item.User.avatar ? getAvatar : ""}
                              className={
                                "!w-14 !h-14 mr-2 border border-gray-300 rounded-full"
                              }
                            />
                          </span>

                          <div className="flex flex-col items-start">
                            <p className="text-[#65676B] text-sm font-normal">
                              {item.User.name || item.User.username}
                            </p>
                            <div
                              className="bg-gray-100 p-3 rounded-lg max-w-xs"
                              title={getTime}
                            >
                              <p>{item.content}</p>
                            </div>
                          </div>

                          {dataUser && item.userId === dataUser.user.id && (
                            <span className="ml-2 hidden group-hover:flex">
                              {canRecall && (
                                <ChangeIcon
                                  className={
                                    "mr-1 !w-6 !h-6 p-1 rounded-full text-gray-400 cursor-pointer hover:text-gray-500 hover:bg-gray-200"
                                  }
                                  onClick={() => handleRecallMessage(item.id)}
                                />
                              )}
                              <TrashIcon
                                className={
                                  "!w-6 !h-6 p-1 rounded-full text-gray-400 cursor-pointer hover:text-gray-500 hover:bg-gray-200"
                                }
                                onClick={() => handleDeleteMessage(item.id)}
                              />
                            </span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="w-[calc(100%-1rem)] flex items-center h-[90px] mx-2">
                <textarea
                  className="resize-none border border-solid border-gray-300 rounded-md p-2 mr-2 w-full"
                  placeholder="Thêm bình luận..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onClick={() => {
                    setShowEmoji(false);
                  }}
                ></textarea>
                <div className="relative">
                  <EmojiWinkIcon
                    className={
                      "!w-10 min-w-[2.5rem] !h-10 p-2 mx-2 cursor-pointer rounded-full border border-solid border-[#548be6] bg-gray-100 text-[#548be6] hover:bg-[#e6f2fe]"
                    }
                    onClick={() => setShowEmoji(!showEmoji)}
                  />
                  {showEmoji && (
                    <div
                      className={
                        "absolute top-[-20px] right-0 min-h-[400px] z-[99999999] -translate-y-full select-none"
                      }
                      onClick={(e) => e.preventDefault()}
                    >
                      <Picker
                        data={DataEmoji}
                        previewPosition="none"
                        className={""}
                        onEmojiSelect={(e) => {
                          setText((prevInp) => prevInp + e.native);
                        }}
                      />
                    </div>
                  )}
                </div>
                <SendIcon
                  className={
                    "!w-10 min-w-[2.5rem] !h-10 p-2 mx-2 cursor-pointer rounded-full border border-solid border-[#548be6] bg-gray-100 text-[#548be6] hover:bg-[#e6f2fe]"
                  }
                  onClick={handleSendLetter}
                />
              </div>
            </div>
          </Fragment>
        ) : (
          <div className="text-center w-full h-full flex flex-col justify-center items-center py-4 select-none">
            <Image src={robot} />
            <h1 className="text-3xl font-bold mb-4">
              Welcome {dataUser && dataUser.user.name}
            </h1>
            <p className="text-gray-600 mb-4 font-semibold text-lg">
              Please select a chat to Start Messaging
            </p>
          </div>
        )}
      </div>

      {/* list member */}
      <Modal open={openModalListMember} close={handleCloseModalListMember}>
        <div className="container mx-auto mt-8">
          <Heading variant={TBUTTON_VARIANT.PRIMARY} line>
            List member
          </Heading>
          <div className="grid grid-cols-4 gap-4">
            {listMember.length > 0 &&
              listMember.map((item, index) => {
                const filterRoleName =
                  listRole.length > 0 &&
                  listRole.filter((role) => role.id === item.User.roleId);

                return (
                  <div className="bg-gray-200 p-4 m-2 rounded" key={index}>
                    <Image
                      src={item.User.avatar ? item.User.avatar : ""}
                      className="w-28 h-28 rounded-full mx-auto mb-2"
                    />
                    <div className="flex justify-center items-center">
                      <p className="text-center text-lg font-semibold text-black">
                        {item.User.name || item.User.username}
                      </p>
                      {dataChatRoom &&
                        dataChatRoom.roomCreatorId === item.User.id && (
                          <span className="ml-2">
                            <CrownIcon className={"text-yellow-400"} />
                          </span>
                        )}
                    </div>
                    <p className="text-center text-sm font-semibold text-gray-600">
                      {filterRoleName.length > 0 && filterRoleName[0].name}
                    </p>
                    {dataChatRoom &&
                      dataUser &&
                      dataChatRoom.roomCreatorId !== item.User.id && (
                        <div
                          className="flex justify-start items-center mt-3"
                          onClick={() => {
                            setOpenModalPromoteLeader(true);
                            setIdUserPromoteToLeader(item.User.id);
                          }}
                        >
                          <span title="Promote to Leader">
                            <CrownIcon
                              className={
                                "!w-10 !h-10 p-2 text-black cursor-pointer hover:text-yellow-400 transition-all"
                              }
                            />
                          </span>
                        </div>
                      )}
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end">
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => handleCloseModalListMember()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* add member */}
      <Modal open={openModalAddMember} close={handleCloseModalAddMember}>
        <div className="container mx-auto mt-8">
          <Heading variant={TBUTTON_VARIANT.PRIMARY} line>
            Add member
          </Heading>
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-8 mb-2"
            role="alert"
          >
            <strong className="font-bold mr-3">Chú ý!</strong>
            <span className="block sm:inline">
              Hãy chọn những thành viên sẽ được thêm vào nhóm
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {listUser.length > 0 &&
              listUser.map((item, index) => {
                let canAddMember = false;
                if (listMemberSelected.length <= 0) {
                  canAddMember = true;
                } else {
                  let filterMemberSelected = listMemberSelected.filter(
                    (id) => id === item.id
                  );
                  if (filterMemberSelected.length > 0) {
                    canAddMember = false;
                  } else {
                    canAddMember = true;
                  }
                }

                return (
                  <div className="bg-gray-200 p-4 m-2 rounded" key={index}>
                    <Image
                      src={item.avatar ? item.avatar : ""}
                      className="w-28 h-28 rounded-full mx-auto mb-2"
                    />
                    <div className="flex justify-center items-center">
                      <p className="text-center text-lg font-semibold text-black">
                        {item.name || item.username}
                      </p>
                    </div>
                    <p className="text-center text-sm font-semibold text-gray-600">
                      {item.Role.name}
                    </p>
                    <div className="flex justify-start items-center mt-3">
                      {canAddMember ? (
                        <span
                          title="Promote to Leader"
                          onClick={() => {
                            if (listMemberSelected.length > 0) {
                              const findMemberSelected =
                                listMemberSelected.find((id) => id === item.id);
                              if (findMemberSelected) {
                                setListMemberSelected((prevList) =>
                                  prevList.filter((id) => id !== item.id)
                                );
                              } else {
                                setListMemberSelected((prevList) => [
                                  ...prevList,
                                  item.id,
                                ]);
                              }
                            } else {
                              setListMemberSelected([item.id]);
                            }
                          }}
                        >
                          <UserPlusIcon
                            className={clsx(
                              "!w-10 !h-10 p-2 text-black cursor-pointer hover:text-green-600 transition-all",
                              {
                                "": true,
                              }
                            )}
                          />
                        </span>
                      ) : (
                        <span
                          title="Promote to Leader"
                          onClick={() => {
                            if (listMemberSelected.length > 0) {
                              const findMemberSelected =
                                listMemberSelected.find((id) => id === item.id);
                              if (findMemberSelected) {
                                setListMemberSelected((prevList) =>
                                  prevList.filter((id) => id !== item.id)
                                );
                              } else {
                                setListMemberSelected((prevList) => [
                                  ...prevList,
                                  item.id,
                                ]);
                              }
                            } else {
                              setListMemberSelected([item.id]);
                            }
                          }}
                        >
                          <TrashIcon
                            className={clsx(
                              "!w-10 !h-10 p-2 text-black cursor-pointer hover:text-red-600 transition-all",
                              {
                                "": true,
                              }
                            )}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end">
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => handleAddMember()}
            >
              Submit
            </Button>
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => handleCloseModalAddMember()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Change name group */}
      <Modal open={openModalUpdateGroupName} close={handleCloseModalGroupName}>
        <form autoComplete="off" onSubmit={handleChangeNameGroup}>
          <Heading variant={TBUTTON_VARIANT.PRIMARY}>Change Group Name</Heading>
          <div className="">
            {inputChangeGroupName.map((item, index) => {
              return (
                <InputField
                  key={index}
                  onChange={onChangeInputUpdate}
                  clear={() => inputUpdateClear(item.name)}
                  value={valuesUpdate[item.name]}
                  onClick={() => {}}
                  {...item}
                />
              );
            })}
          </div>
          {/* footer */}
          <div className="flex justify-end">
            <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => handleCloseModalGroupName()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* remove member */}
      <Modal open={openModalRemoveMember} close={handleCloseModalRemoveMember}>
        <div className="container mx-auto mt-8">
          <Heading variant={TBUTTON_VARIANT.PRIMARY} line>
            Remove member
          </Heading>
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-8 mb-2"
            role="alert"
          >
            <strong className="font-bold mr-3">Chú ý!</strong>
            <span className="block sm:inline">
              Hãy chọn những thành viên sẽ phải rời nhóm nhóm
            </span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {listUser.length > 0 &&
              listUser.map((item, index) => {
                let canAddMember = false;
                if (listMemberSelected.length <= 0) {
                  canAddMember = true;
                } else {
                  let filterMemberSelected = listMemberSelected.filter(
                    (id) => id === item.id
                  );
                  if (filterMemberSelected.length > 0) {
                    canAddMember = false;
                  } else {
                    canAddMember = true;
                  }
                }

                return (
                  <div className="bg-gray-200 p-4 m-2 rounded" key={index}>
                    <Image
                      src={item.avatar ? item.avatar : ""}
                      className="w-28 h-28 rounded-full mx-auto mb-2"
                    />
                    <div className="flex justify-center items-center">
                      <p className="text-center text-lg font-semibold text-black">
                        {item.name || item.username}
                      </p>
                    </div>
                    <p className="text-center text-sm font-semibold text-gray-600">
                      {item.Role.name}
                    </p>
                    <div className="flex justify-start items-center mt-3">
                      {canAddMember ? (
                        <span
                          title="Promote to Leader"
                          onClick={() => {
                            if (listMemberSelected.length > 0) {
                              const findMemberSelected =
                                listMemberSelected.find((id) => id === item.id);
                              if (findMemberSelected) {
                                setListMemberSelected((prevList) =>
                                  prevList.filter((id) => id !== item.id)
                                );
                              } else {
                                setListMemberSelected((prevList) => [
                                  ...prevList,
                                  item.id,
                                ]);
                              }
                            } else {
                              setListMemberSelected([item.id]);
                            }
                          }}
                        >
                          <TrashIcon
                            className={clsx(
                              "!w-10 !h-10 p-2 text-black cursor-pointer hover:text-red-600 transition-all",
                              {
                                "": true,
                              }
                            )}
                          />
                        </span>
                      ) : (
                        <span
                          title="Promote to Leader"
                          onClick={() => {
                            if (listMemberSelected.length > 0) {
                              const findMemberSelected =
                                listMemberSelected.find((id) => id === item.id);
                              if (findMemberSelected) {
                                setListMemberSelected((prevList) =>
                                  prevList.filter((id) => id !== item.id)
                                );
                              } else {
                                setListMemberSelected((prevList) => [
                                  ...prevList,
                                  item.id,
                                ]);
                              }
                            } else {
                              setListMemberSelected([item.id]);
                            }
                          }}
                        >
                          <ChangeIcon
                            className={clsx(
                              "!w-10 !h-10 p-2 text-black cursor-pointer hover:text-green-600 transition-all",
                              {
                                "": true,
                              }
                            )}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex justify-end">
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => handleRemoveMember()}
            >
              Submit
            </Button>
            <Button
              variant={TBUTTON_VARIANT.PRIMARY}
              onClick={() => handleCloseModalRemoveMember()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* promote to leader */}
      <Modal
        open={openModalPromoteLeader}
        close={handleCloseModalPromoteToLeader}
      >
        <div className="container mx-auto mt-8">
          <form autoComplete="off" onSubmit={handlePromoteToLeader}>
            <Heading variant={TBUTTON_VARIANT.PRIMARY}>
              Promote to Leader
            </Heading>
            <p>Are you sure you want to elevate this person to leader?</p>

            <div className="flex justify-end">
              <Button variant={TBUTTON_VARIANT.PRIMARY}>Submit</Button>
              <Button
                variant={TBUTTON_VARIANT.PRIMARY}
                onClick={() => handleCloseModalPromoteToLeader()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
}

export default ChatWindow;
