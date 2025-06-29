import { Link, useLocation } from "react-router-dom";

function AdminSidebar({ isOpen, closeSidebar }) {
  const location = useLocation();
  const active = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      location.pathname.includes(path) ? "bg-blue-200 font-bold" : ""
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white border-r p-4 transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="mt-16 md:mt-0 space-y-2">
          <Link to="/admin/dashboard" onClick={closeSidebar} className={active("dashboard")}>
            Dashboard
          </Link>
          <Link to="/admin/products" onClick={closeSidebar} className={active("products")}>
            Products
          </Link>
          <Link to="/admin/users" onClick={closeSidebar} className={active("users")}>
            User Details
          </Link>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
