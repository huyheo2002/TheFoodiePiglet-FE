import { useEffect, useState } from "react";
import NotificationCard from "../../../components/NotificationCard";
import StatisticelCard from "../../../components/StatisticelCard";
import clsx from "clsx";
import * as notificationServices from "../../../services/notificationServices";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
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
        <div className="w-[calc(75%-1rem)] pr-4 ">
          <div className="w-full h-auto bg-white rounded-lg px-3 py-4">
            <h1 className="mb-3 text-2xl font-semibold capitalize">
              Dashboard
            </h1>
            <StatisticelCard />
          </div>
          <div className="w-full bg-white mt-3 px-3 py-4 rounded-lg">
            <h2 className="mb-3 text-xl font-semibold capitalize">Section 1</h2>
            <div className={clsx("w-[75vw-1rem]")}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Section 1: Orders */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Orders Management</h2>
                  <p className="text-gray-600">
                    View and manage incoming orders. Keep track of customer details, order status, and more.
                  </p>
                  {/* Add additional components for order management */}
                </div>

                {/* Section 2: Menu */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu Management</h2>
                  <p className="text-gray-600">
                    Update and modify the restaurant menu. Add new items, edit prices, and categorize dishes.
                  </p>
                  {/* Add additional components for menu management */}
                </div>

                {/* Section 3: Analytics */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics</h2>
                  <p className="text-gray-600">
                    Gain insights into restaurant performance. Analyze sales, customer trends, and popular dishes.
                  </p>
                  {/* Add additional components for analytics */}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white mt-3 px-3 py-4 rounded-lg">
            <h2 className="mb-3 text-xl font-semibold capitalize">Section 2</h2>
            <div className={clsx("w-[75vw-1rem]")}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Section 4: User Management */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
                  <p className="text-gray-600">
                    Manage restaurant staff accounts. Assign roles, reset passwords, and monitor account activity.
                  </p>
                  {/* Add additional components for user management */}
                </div>

                {/* Section 5: Overview Statistics */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview Statistics</h2>
                  <p className="text-gray-600">
                    View high-level statistics for the restaurant. Track overall performance and customer satisfaction.
                  </p>
                  {/* Add additional components for overview statistics */}
                </div>
              </div>
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
