import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import LoginAndLogout from "./LoginAndLogout";
import { getCart } from "../../features/cartSlice";

function Navbar({ searchTerm, setSearchTerm }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector( (state) => state.auth)

    const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setIsOpen(false); // Close mobile menu
    }
  };

  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCart({ page: 1, limit: 100 }));
  }, [dispatch]);

  return (
    <nav className="bg-white shadow-md z-50 items-center text-black fixed md:pt-7 tracking-wider">
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className=" font-bold flex gap-1">
            <img src="/brandlogo.png" alt="brandlogo" className="w-[50px] h-[50px] hidden md:block" />
            <img src="/brandlogo1.png" alt="brandlogo1" className="w-[50px] h-[30px] block md:hidden" />
            <span className="text-amber-400 text-2xl hidden md:block">
              Track<span className="text-red-500">Toes</span>
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-200  overflow-hidden px-2"
            >
              <input
                type="text"
                placeholder="Search..."
                className="text-black px-2 py-1 outline-none placeholder:font-normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="text-slate-900 font-bold px-2">
                <Search />
              </button>
            </form>
            <Link
              to="/man"
              className="hover:text-red-600 border-b-2 border-transparent hover:border-yellow-400 transition duration-300 font-bold"
            >
              MEN
            </Link>
            <Link
              to="/women"
              className="hover:text-red-600 border-b-2 border-transparent hover:border-yellow-400 transition duration-300 font-bold"
            >
              WOMEN
            </Link>
            <Link
              to="/kids"
              className="hover:text-red-600 border-b-2 border-transparent hover:border-yellow-400 transition duration-300 font-bold"
            >
              KIDS
            </Link>
            {user&&(
              <>
            <Link to="/ordercard" className="hover:text-red-600">
              <ShoppingBag />
            </Link>
            <Link to="/cart" className="relative hover:text-red-600">
              <ShoppingCart />
              {Array.isArray(cart?.items) && cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cart.items.length}
                </span>
              )}
            </Link>
              </>
            )}
            <LoginAndLogout />
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex gap-3 items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Search size={24} />}
            </button>
          {user&&(
            <>
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {Array.isArray(cart?.items) && cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cart.items.length}
                </span>
              )}
            </Link>
            </>
          )}

            <LoginAndLogout />
          </div>
        </div>
      </div>

      {/* Mobile menu */}

      <div>
        {isOpen && (
          <div className="md:hidden bg-white px-4 pt-4 pb-4 shadow-md text-black">
            <div className="flex flex-wrap gap-2 justify-around">
              <Link
                to="/man"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Men
              </Link>
              <Link
                to="/women"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Women
              </Link>
              <Link
                to="/kids"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Kids
              </Link>
            </div>

            {/* Mobile Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-200  overflow-hidden px-2 mt-4"
            >
              <input
                type="text"
                placeholder="Search..."
                className="text-black px-2 py-1 outline-none flex-1"
               value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="text-blue-600 font-bold px-2">
                <Search />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
