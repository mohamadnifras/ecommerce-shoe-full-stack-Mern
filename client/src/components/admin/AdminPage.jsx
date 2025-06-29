import React, { useState } from "react";
import {Outlet} from "react-router-dom"
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

function AdminPage() {
      const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div className="flex flex-col h-screen">
      <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 overflow-y-auto bg-[#e8e8e8]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
