import { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { dataUser } from "../../../data/fakeDataUser";
import * as userServices from "../../../services/userServices";

function UserManagement() {
  const [listUsers, setListUsers] = useState([]);
  const [listUsersPreview, setListUsersPreview] = useState([]);

  const handleGetAllUsers = async () => {
    const res = await userServices.getAllUsers("all");
    console.log("res", res);
    if (res && res.errCode === 0 && res.users) {
      // show full info
      setListUsers(res.users);

      // show preview
      const dataListUsers = res.users || [];
      let splitFields =
        dataListUsers.length > 0 &&
        dataListUsers.map((item) => {
          delete item.address;
          delete item.createdAt;
          delete item.updatedAt;
          delete item.gender;
          delete item.id;
          delete item.phone;
          delete item.avatar;

          return item;
        });
      setListUsersPreview(splitFields);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <div className="pl-3 w-[calc(100%-1rem)]">
      <div className="bg-white px-3 py-4 rounded-lg">
        <h1 className="mb-3 text-2xl font-semibold capitalize">
          User Management
        </h1>
        {listUsers.length > 0 && listUsersPreview.length > 0 && (
          <DataTable data={listUsers} dataPreview={listUsersPreview}/>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
