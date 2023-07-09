import { useContext, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { BookOpenIcon } from "../../../components/Icons";
import NotificationCard from "../../../components/NotificationCard";
import StatisticelCard from "../../../components/StatisticelCard";
import { dataUser } from "../../../data/fakeDataUser";
import GlobalContext from "../../../contexts/globalContext";
import * as userServices from "../../../services/userServices";
import clsx from "clsx";

function DashBoard() {
  const manyFeatures = [
    {
      name: "read",
      icon: <BookOpenIcon />,
    },
    {
      name: "edit",
      icon: <BookOpenIcon />,
    },
    {
      name: "delete",
      icon: <BookOpenIcon />,
    },
    {
      name: "updateRole",
      icon: <BookOpenIcon />,
    },
  ];

  const handleTest = () => {
    // console.log("hello world");
  };

  const updatedManyFeatures = manyFeatures.map((feature) => {
    const updatedFeature = { ...feature, onClick: handleTest };
    return updatedFeature;
  });

  const [listUsers, setListUsers] = useState([]);

  const handleGetAllUsers = async () => {
    const res = await userServices.getAllUsers("all");
    // console.log("res", res);
    if (res && res.errCode === 0 && res.users) {
      const dataListUsers = res.users || [];
      let splitFields =
        dataListUsers.length > 0 &&
        dataListUsers.map((item) => {
          // handle role users
          // console.log("item role", item.roleId)
          if(item.roleId) {
            if(item.roleId === 1) {
              item.roleName = "Admin";
            } else if(item.roleId === 2) {
              item.roleName = "Manager";              
            } else if(item.roleId === 3) {
              item.roleName = "Staff";              
            } else if(item.roleId === 4) {
              item.roleName = "User";              
            }

            delete item.roleId;
          }

          delete item.address;
          delete item.createdAt;
          delete item.updatedAt;
          delete item.gender;
          delete item.id;
          delete item.phone;
          delete item.avatar;

          return item;
        });

      // show full info
      if (splitFields.length > 0) {
        setListUsers(splitFields);
      }
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <div className="pl-3 min-h-[1000px] w-[calc(100%-1rem)]">
      <div className="flex justify-between">
        {/* left */}
        <div className="w-[calc(75%-1rem)] pr-4 ">
          <div className="w-full h-auto bg-white rounded-lg px-3 py-4">
            <h1 className="mb-3 text-2xl font-semibold capitalize">
              Dashboard
            </h1>
            <StatisticelCard />
          </div>
          <div className="w-full bg-white mt-3 px-3 py-4 rounded-lg">
            <h2 className="mb-3 text-xl font-semibold capitalize">Table</h2>
            <div className={clsx("w-[75vw-1rem] overflow-x-scroll scrollbar",
              "lg:overflow-x-hidden",
            )}>
              {listUsers.length > 0 && (
                <DataTable data={listUsers} manyFeatures={updatedManyFeatures} />
              )}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-1/4">
          <div className="bg-white rounded-lg px-3 py-4 ">
            <h1 className="mb-3 text-2xl font-semibold capitalize">Update</h1>
            <div className="">
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
            </div>
          </div>
          {/* <div>hello</div> */}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
