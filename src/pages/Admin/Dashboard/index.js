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
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
