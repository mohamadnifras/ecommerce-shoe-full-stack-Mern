import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../../features/authSlice";
import HeroSection from "./HeroSection";
import AllProduct from "./AllProduct";
import Footer from "./Footer";
// import Navbar from "./Navbar";



function HomePage({searchTerm}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  return (
   <div className="h-full w-full overflow-hidden">
      {/* <Navbar  /> */}

      {/* If searching, show AllProduct first */}
      {searchTerm ? (
        <>
          <AllProduct searchTerm={searchTerm} />
          <HeroSection />
          <Footer />
        </>
      ) : (
        <>
          <HeroSection />
          <AllProduct searchTerm={searchTerm} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default HomePage;
