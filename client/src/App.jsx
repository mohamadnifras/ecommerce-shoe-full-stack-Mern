import React, { useState } from "react";
import "./App.css";
import SingUp from "./components/authentication/SingUp";
import { Route, Routes, useLocation,Navigate } from "react-router-dom";
import Login from "./components/authentication/Login";
import HomePage from "./components/home/HomePage";
import IndividualProduct from "./components/home/IndividualProduct";
import Cart from "./components/cart/Cart";
import Navbar from "./components/home/Navbar";
import Order from "./components/cart/Order";
import OrderCard from "./components/cart/OrderCard";
import MenProduct from "./components/home/MenProduct";
import WomenProduct from "./components/home/WomenProduct";
import KindsProduct from "./components/home/KindsProduct";
import AdminPage from "./components/admin/AdminPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProducts from "./components/admin/AdminProducts";
import AdminUserDetails from "./components/admin/AdminUserDetails";
function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup", "/order",];
  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && !location.pathname.startsWith("/admin") && (
  <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
)}
      <Routes>
       { /*User Side */}
        <Route path="/signup" element={<SingUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />}></Route>
        <Route path="/product/:id" element={<IndividualProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/ordercard" element={<OrderCard />}></Route>
        <Route path="/man" element={<MenProduct />}></Route>
        <Route path="/women" element={<WomenProduct />}></Route>
        <Route path="/kids" element={<KindsProduct />}></Route>
        { /*Admin Side */}
        <Route path="/adminmain" element={<Navigate to="/admin/dashboard"/>}></Route>
        <Route path="/admin/*" element={<AdminPage />}>
        <Route path="dashboard" element={<AdminDashboard />}></Route>
        <Route path="products" element={<AdminProducts />}></Route>
        <Route path="users" element={<AdminUserDetails />}></Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
