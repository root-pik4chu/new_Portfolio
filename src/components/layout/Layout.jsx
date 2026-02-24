import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "../navbar/Navbar";
import PageTransition from "../transitions/PageTransition";


const Layout = () => {
  const location = useLocation();

  return (
    <>
      <PageTransition locationKey={location.key} />
      <Navbar />


      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;