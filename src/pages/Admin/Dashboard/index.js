import { useContext, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { BookOpenIcon } from "../../../components/Icons";
import NotificationCard from "../../../components/NotificationCard";
import StatisticelCard from "../../../components/StatisticelCard";
import { dataUser } from "../../../data/fakeDataUser";
import GlobalContext from "../../../contexts/globalContext";
import * as userServices from "../../../services/userServices";
import clsx from "clsx";
import * as notificationServices from "../../../services/notificationServices";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  // notify
  const [listNotify, setListNotify] = useState([]);
  const numberOfItemsToShow = 4;
  const visibleList = listNotify.length > 0 && listNotify.slice(0, numberOfItemsToShow);

  const handleGetAllNotify = async () => {
    const respon = await notificationServices.handleGetAllNotification();
    if (respon && respon.errCode === 0) {
      setListNotify(respon.notify)
    }
  }

  useEffect(() => {
    handleGetAllNotify();
  }, [])

  return (
    <div className="pl-3 w-[calc(100%-1rem)]">
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
            <div className={clsx("w-[75vw-1rem] overflow-x-scroll scrollbar")}>
              hello
            </div>
          </div>
        </div>

        {/* right */}
        <div className="w-1/4">
          <div className="bg-white rounded-lg px-3 py-4 ">
            <h1 className="mb-3 text-2xl font-semibold capitalize">Update</h1>
            <div className="">
              {visibleList.length > 0 && visibleList.map((item, index) => {
                return <NotificationCard data={item} key={index} onClick={() => navigate("/system/notify-detail")} />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
