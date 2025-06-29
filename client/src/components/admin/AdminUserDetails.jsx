import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  featchAllUser,
  blockAndUnblock,
  getByIdOrder,
} from "../../features/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserOrder from "./UserOrder";

function AdminUserDetails() {
  const [showOrder, setShowOder] = useState(false);
  const dispatch = useDispatch();
  const { users, loading, order} = useSelector((state) => state.admin);
console.log(order,'userOrderkitty')
  useEffect(() => {
    dispatch(featchAllUser({ page: 1, limit: 10 }));
  }, [dispatch]);

  const toggleBlockAndUnblock = (userId) => {
    dispatch(blockAndUnblock(userId))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        dispatch(featchAllUser({ page: 1, limit: 10 }));
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong, please try again!");
      });
  };

  const handleShowProduct = (userId) => {
    dispatch(getByIdOrder(userId));
    setShowOder(true);
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading ? (
        <p>Loading users...</p>
      ) : (
        users?.map((user) => (
          <div
            key={user._id}
            className="w-72 h-auto flex flex-col justify-center p-2 bg-neutral-50 rounded-lg shadow "
          >
            <div className="flex gap-2">
              <img
                className="bg-neutral-500 w-24 h-24 shrink-0 rounded-lg"
                alt="profile"
                src={`https://ui-avatars.com/api/?name=${user.username}`} // Just an example avatar
              />
              <div className="flex flex-col">
                <span className="font-bold text-neutral-700 italic">
                  {user.username}
                </span>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Role: {user.role}</p>
                <p className="text-sm text-gray-600">
                  Status: {user.blocked ? "Blocked" : "Active"}
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <button
                onClick={() => handleShowProduct(user._id)}
                className="hover:bg-blue-700 bg-blue-500 font-bold text-white rounded p-2"
              >
                View Orders
              </button>
              <button
                onClick={() => toggleBlockAndUnblock(user._id)}
                className={`${
                  user.blocked
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } font-bold text-white rounded p-2`}
              >
                {user.blocked ? "Block" : "Unblock"}
              </button>
            </div>
          </div>
        ))
      )}
      <UserOrder showOrder={showOrder} setShowOder={setShowOder} order={order}/>
    </div>
  );
}

export default AdminUserDetails;
