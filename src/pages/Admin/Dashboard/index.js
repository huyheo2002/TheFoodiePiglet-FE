import { useEffect, useState } from "react";
import StatisticelCard from "../../../components/StatisticelCard";
import clsx from "clsx";
import * as productServices from "../../../services/productServices";
import * as paymentServices from "../../../services/paymentServices";
import { useNavigate } from "react-router-dom";
import RevenueChart from "../../../components/Chart/RevenueChart";
import OrderDistributionChart from "../../../components/Chart/OrderDistributionChart";
import OrdersPerHourChart from "../../../components/Chart/OrdersPerHourChart";
import FoodTypeDistributionChart from "../../../components/Chart/FoodTypeDistributionChart";
import RevenueByFoodCategoryChart from "../../../components/Chart/RevenueByFoodCategoryChart ";
import WindowScrollTop from "../../../utils/windowScroll";

const revenueByCategoryData = {
  labels: ["Đồ uống", "Món tráng miệng", "Món chính"],
  values: [200000, 150000, 400000],
};

function DashBoard() {
  const navigate = useNavigate();
  const [categoriesProduct, setCategoriesProduct] = useState({
    labels: [],
    values: []
  });

  const [revenueData, setRevenueData] = useState();
  const [ordersPerHourData, setOrdersPerHourData] = useState();

  const fetchGetProductCountByCategories = async () => {
    let response = await productServices.handleGetProductCountByCategories();
    if (response && response?.errCode === 0) {
      const updatedCategories = { ...categoriesProduct };

      response.countProductOfCategories.forEach((item) => {
        if (!updatedCategories.labels.includes(item.category)) {
          updatedCategories.labels.push(item.category);
          updatedCategories.values.push(item.count);
        }
      });

      setCategoriesProduct(updatedCategories);
    }
  };

  const fetchListPayments = async () => {
    const response = (await paymentServices.getRevenueData()) ?? null;
    if (response && response?.errCode === 0) {
      setRevenueData(response.revenueData.revenueDataByMonth);
      setOrdersPerHourData(response.revenueData.revenueDataByHour);
    }
  };

  useEffect(() => {
    fetchGetProductCountByCategories();
    fetchListPayments();
  }, []);

  return (
    <div className="pl-3 w-[calc(100%-1rem)]">
      <div className="flex justify-between">
        <div className="w-full">
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
                  {revenueData &&
                    <RevenueChart data={revenueData} />
                  }
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Order Distribution Chart
                  </h2>
                  {categoriesProduct &&
                    <OrderDistributionChart data={categoriesProduct} />
                  }
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Orders Per Hour Chart
                  </h2>
                  {ordersPerHourData &&
                    <OrdersPerHourChart data={ordersPerHourData} />
                  }
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Food Type Distribution Chart
                  </h2>
                  <FoodTypeDistributionChart data={categoriesProduct} />
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
      </div>
    </div>
  );
}

export default DashBoard;
