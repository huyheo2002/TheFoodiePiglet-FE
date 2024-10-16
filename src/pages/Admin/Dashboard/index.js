import { useEffect, useState } from "react";
import NotificationCard from "../../../components/NotificationCard";
import StatisticelCard from "../../../components/StatisticelCard";
import clsx from "clsx";
import * as notificationServices from "../../../services/notificationServices";
import { useNavigate } from "react-router-dom";
import RevenueChart from "../../../components/Chart/RevenueChart";
import OrderDistributionChart from "../../../components/Chart/OrderDistributionChart";
import OrdersPerHourChart from "../../../components/Chart/OrdersPerHourChart";
import EmployeePerformanceChart from "../../../components/Chart/EmployeePerformanceChart";
import FoodTypeDistributionChart from "../../../components/Chart/FoodTypeDistributionChart";
import RevenueByFoodCategoryChart from "../../../components/Chart/RevenueByFoodCategoryChart ";
import WindowScrollTop from "../../../utils/windowScroll";

const revenueData = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3"],
  values: [500000, 700000, 600000],
};

const orderDistributionData = {
  labels: ["Fast Food", "Dessert", "Drink"],
  values: [40, 25, 35],
};

const ordersPerHourData = {
  labels: ["8h", "10h", "12h", "14h", "16h"],
  values: [10, 20, 30, 15, 25],
};

const employeePerformanceData = [
  {
    name: "Nhân viên A",
    performance: [80, 90, 70, 85],
  },
  {
    name: "Nhân viên B",
    performance: [70, 80, 75, 80],
  },
];

const foodTypeDistributionData = {
  labels: ["Món chính", "Món phụ", "Đồ uống", "Tráng miệng"],
  values: [300, 150, 100, 80],
};
const revenueByCategoryData = {
  labels: ["Đồ uống", "Món tráng miệng", "Món chính"],
  values: [200000, 150000, 400000],
};

function DashBoard() {
  const navigate = useNavigate();
  const [listNotify, setListNotify] = useState([]);
  const numberOfItemsToShow = 4;
  const visibleList =
    listNotify.length > 0 && listNotify.slice(0, numberOfItemsToShow);

  const handleGetAllNotify = async () => {
    const respon = await notificationServices.handleGetAllNotification();
    if (respon && respon.errCode === 0) {
      setListNotify(respon.notify);
    }
  };

  useEffect(() => {
    handleGetAllNotify();
  }, []);

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
            <h2 className="mb-3 text-xl font-semibold capitalize">
              Restaurant Management
            </h2>
            <div className={clsx("w-[75vw-1rem]")}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                  onClick={() => {
                    navigate("/system/product");
                    WindowScrollTop();
                  }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Product Management
                  </h2>
                  <p className="text-gray-600">
                    Manage your product inventory. Add, update, or remove items
                    and track stock levels.
                  </p>
                </div>

                <div
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                  onClick={() => {
                    navigate("/system/news");
                    WindowScrollTop();
                  }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    News Management
                  </h2>
                  <p className="text-gray-600">
                    Create and publish news articles. Keep your customers
                    informed with the latest updates.
                  </p>
                </div>

                <div
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                  onClick={() => {
                    navigate("/system/bill");
                    WindowScrollTop();
                  }}
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Invoice Management
                  </h2>
                  <p className="text-gray-600">
                    Oversee all invoices and payments. Generate and send
                    invoices to customers efficiently.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white mt-3 px-3 py-4 rounded-lg">
            <h2 className="mb-3 text-xl font-semibold capitalize">
              Restaurant Analytics
            </h2>
            <div className={clsx("w-[75vw-1rem]")}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Revenue Chart
                  </h2>
                  <RevenueChart data={revenueData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Order Distribution Chart
                  </h2>
                  <OrderDistributionChart data={orderDistributionData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Orders Per Hour Chart
                  </h2>
                  <OrdersPerHourChart data={ordersPerHourData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Employee Performance Chart
                  </h2>
                  <EmployeePerformanceChart data={employeePerformanceData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Food Type Distribution Chart
                  </h2>
                  <FoodTypeDistributionChart data={foodTypeDistributionData} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Revenue Food Category Chart
                  </h2>
                  <RevenueByFoodCategoryChart data={revenueByCategoryData} />
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
              {visibleList.length > 0 ? (
                visibleList.map((item, index) => {
                  return (
                    <NotificationCard
                      data={item}
                      key={index}
                      onClick={() => navigate("/system/notify-detail")}
                    />
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center p-4 bg-white">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="No notifications"
                    className="w-full h-fit mb-3 opacity-50"
                  />
                  <p className="text-gray-600 mb-4 text-center">
                    Hiện bạn chưa có thông báo nào.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
