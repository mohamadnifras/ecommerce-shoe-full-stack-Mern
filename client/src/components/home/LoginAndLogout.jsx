// import React, { useState } from "react";
// import { Button, Menu, MenuItem } from "@mui/material";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import {logoutUser} from "../../features/authSlice"
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function LoginAndLogout() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//     const handleLogout = () => {
//       dispatch(logoutUser())
//         .unwrap()
//         .then((respons) => {
//           toast.success(respons.message)
//           navigate("/login");
//         })
//         .catch((error) => {
//           toast.error("Failed to log out. Please try again.", error);
//         });
//     };

//     const handleLogin = () => {
//       navigate("/login");
//     };

//   return (
//     <div>
//        <ToastContainer
//                 position="top-right"
//                 autoClose={350}
//                 hideProgressBar={false}
//                 newestOnTop
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 limit={1}
//               />
//       <Button
//         aria-controls=""
//         aria-haspopup="true"
//         onClick={handleMenuClick}
//         className=""
//       >
//         <FaRegCircleUser />
//         <span className="icon-text">{user ? user.username : "Login"}</span>

//         <Menu
//           id="user-menu"
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//           transformOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <MenuItem>Profile</MenuItem>
//           <MenuItem>My Account</MenuItem>
//           {user ? <MenuItem onClick={handleLogout}>Logout</MenuItem> : <MenuItem onClick={handleLogin}>Login</MenuItem>}
//         </Menu>
//       </Button>
//     </div>
//   );
// }

// export default LoginAndLogout;

import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingBag, User } from "lucide-react";


function LoginAndLogout() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        navigate("/");
        
      })
      .catch(() => {
        toast.error("Failed to log out. Please try again.");
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative tracking-wider">
      <ToastContainer position="top-right" autoClose={350} limit={1} />
      <Button
        onClick={handleMenuClick}
        className="flex items-center gap-2 text-white  "
      >
        <User size={24} className="text-black font-bold" />
        <span className="text-black font-bold">
          {user ? user.username : "Login"}
        </span>
      </Button>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {user && <MenuItem onClick={handleMenuClose}>Profile</MenuItem>}
        {user && <MenuItem onClick={()=> navigate("/ordercard")}><ShoppingBag className="pr-2"/>My Order</MenuItem>}
        {user ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default LoginAndLogout;
