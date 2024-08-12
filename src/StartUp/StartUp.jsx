"use client";
import Layout from "@/components/admin/Layout";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { usePathname } from "next/navigation";
import React from "react"; 
import { useSelector } from "react-redux";
import { GridLoader } from "react-spinners";

const StartUp = ({ children }) => {
  const pathname = usePathname();
  const userLoading = useSelector((state) => state.user).loading;

  // useEffect(() => {
  //   console.log(pathname);
  //   // pathname.split("/")[1] === "raithan-add" && dispatch(checkAdmin());
  //   dispatch(checkUser());
  // }, [dispatch,pathname]);

  if (
    pathname.split("/")[1] === "raithan-add" &&
    pathname.split("/")[2] !== "login"
  ) {
    return <Layout>{children}</Layout>;
  }

  return (
    <>
      <Navbar />
      {userLoading ? (
        <div className="h-full flex justify-center items-center">
          <GridLoader
            color="#a13bda"
            loading
            margin={30}
            size={50}
            speedMultiplier={3}
          />{" "}
        </div>
      ) : (
        <div>
        {children}
        </div>
      )}
      {pathname.split("/")[2] !== "login" &&
          pathname.split("/")[1] !== "admin-login" &&
          pathname.split("/")[1] !== "forget-password" &&
          pathname.split("/")[1] !== "register" &&
          // pathname.split("/")[1] !== "start-quiz" &&
          pathname.split("/")[1] !== "login" && <Footer />}

    </>
  );
};

export default StartUp;
