import axios from "../utils/axios";

export const getAllChatRoom = () => {
    const res = axios.get(`/api/get-all-chatroom`);
    return res;
};

export const getAllMessage = () => {
    const res = axios.get(`/api/get-all-message`);
    return res;
};

export const getAllRoomParticipant = () => {
    const res = axios.get(`/api/get-all-room-participant`);
    return res;
};
export const getAllChatRoomWithId = (id) => {
    const res = axios.get(`/api/get-all-chatroom-with-id?id=${id}`);
    return res;
};

export const handleCreateChatroom = (data) => {
    return axios.post("/api/create-chatroom", data);
};

export const findChatRoom = (id) => {
    const res = axios.get(`/api/find-chatroom?id=${id}`);
    return res;
};

export const getAllMemberInRoom = (roomId) => {
    const res = axios.get(`/api/get-all-member-in-room?roomId=${roomId}`);
    return res;
};

export const handleAddMember = (data) => {
    return axios.post("/api/add-member", data);
};

export const handleChangeNameGroup = (data) => {
    return axios.put("/api/change-name-group", data);
};

export const handleRemoveMember = (data) => {
    return axios.delete("/api/remove-member", {
        data: data,
    });
};

export const handlePromoteToLeader = (data) => {
    return axios.put("/api/promote-to-leader", data);
};

export const handleLeaveRoom = (data) => {
    return axios.delete("/api/leave-room", {
        data: data,
    });
};

export const handleCreateMessage = (data) => {
    return axios.post("/api/create-message", data);
};

export const handleRecallMessage = (data) => {
    return axios.put("/api/recall-message", data);
};

export const handleDeleteMessage = (data) => {
    return axios.delete("/api/delete-message", {
        data: data,
    });
};
