import React, { useEffect } from "react";
import {
  featchAllUser,
  getAllOrders,
  getTotalRevenue,
} from "../../features/adminSlice";
import { fetchProducts } from "../../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import DashboardChart from "./DashboardChart";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { users, totalUsers, order, totalRevenue } = useSelector(
    (state) => state.admin
  );
  const {
    totalProducts,
    totalManProduct,
    totalWomenProduct,
    totalKidsProduct,
  } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(featchAllUser({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOrders({ page: 1, limit: 10 }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTotalRevenue());
  }, [dispatch]);
  console.log(totalRevenue, "hello");

  const blockedUsers = users.filter((user) => user.blocked === true).length;
  const unblockedUsers = users.filter((user) => user.blocked === false).length;

  //Product chart
  const productData = {
    labels: ["Men", "Women", "Kids", "Total Product"],
    datasets: [
      {
        label: "Product Categories",
        data: [
          totalManProduct,
          totalWomenProduct,
          totalKidsProduct,
          totalProducts,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  //user chart
  const data = {
    labels: ["Total User", "Block", "UnBlock"],
    datasets: [
      {
        label: "Users",
        data: [totalUsers, blockedUsers, unblockedUsers],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 0, 0, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const cardStyle =
    "w-[250px] h-[250px] bg-[#e0e0e0] flex flex-col items-center p-5 rounded-[30px] shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] transition-transform duration-300 hover:scale-105 cursor-pointer";

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {/* Product Overview */}
        <div className={cardStyle}>
          <h2 className="text-xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Product Overview
          </h2>
          <div className="space-y-2 text-center text-[16px]">
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700">Total Product:</h4>
              <p className="text-lg font-bold text-blue-700">{totalProducts}</p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700">Total Man:</h4>
              <p className="text-lg font-bold text-green-700">
                {totalManProduct}
              </p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700">Total Woman:</h4>
              <p className="text-lg font-bold text-pink-600">
                {totalWomenProduct}
              </p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700">Total Kids:</h4>
              <p className="text-lg font-bold text-amber-500">
                {totalKidsProduct}
              </p>
            </div>
          </div>
        </div>

        {/* User Overview */}
        <div className={cardStyle}>
          <h2 className="text-xl font-extrabold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            User
          </h2>
          <div className="space-y-2 text-center text-[16px]">
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700">Total User:</h4>
              <p className="text-lg font-bold text-blue-700">{totalUsers}</p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700">Blocked:</h4>
              <p className="text-lg font-bold text-red-600">{blockedUsers}</p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700">Unblocked:</h4>
              <p className="text-lg font-bold text-green-600">
                {unblockedUsers}
              </p>
            </div>
          </div>
        </div>
        {/*  Sales price */}
        <div className={cardStyle}>
          <h2 className="text-xl font-extrabold mb-4 bg-gradient-to-r from-yellow-500 to-cyan-500 bg-clip-text text-transparent">
            Order Overview
          </h2>
          <div className="space-y-2 text-center text-[16px]">
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700 ">Total Sales price:</h4>
              <p className="text-lg font-bold text-blue-700">{totalRevenue}</p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <h4 className="font-mono text-gray-700">Total Order:</h4>
              <p className="text-lg font-bold text-red-600">
                {order?.totalOrder}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-4 sm:p-6  grid-cols-1 md:grid-cols-2">
        <div className="w-full h-full bg-white rounded-xl shadow-md p-4">
          <p className="text-xl sm:text-2xl font-bold underline mb-4">
            Product Chart
          </p>
          <DashboardChart data={productData} />
        </div>

        <div className="w-full h-full bg-white rounded-xl shadow-md p-4">
          <p className="text-xl sm:text-2xl font-bold underline mb-4">Users</p>
          <DashboardChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
