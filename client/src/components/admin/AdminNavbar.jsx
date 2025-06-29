import React from "react";
import { Menu } from "lucide-react";
import { logoutUser } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminNavbar({ toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((respons) => {
        toast.success(respons.message);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to log out. Please try again.");
      });
  };
  return (
    <>
      <nav className="bg-cyan-400 text-white p-4 flex items-center justify-between">
        {/* Left side: Menu + Title */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        {/* Right side: Logout */}
        <button
          onClick={onLogout}
          className="bg-white text-cyan-600 px-4 py-2 rounded hover:bg-cyan-100 transition-all text-sm font-semibold"
        >
          Logout
        </button>
      </nav>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default AdminNavbar;
