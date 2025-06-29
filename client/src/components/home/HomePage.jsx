import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../../features/authSlice";
import HeroSection from "./HeroSection";
import AllProduct from "./AllProduct";
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
        </>
      ) : (
        <>
          <HeroSection />
          <AllProduct searchTerm={searchTerm} />
        </>
      )}
    </div>
  );
}

export default HomePage;
