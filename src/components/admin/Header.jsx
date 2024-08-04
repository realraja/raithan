// "use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ConfirmButton from "../Dialogs/ConfirmButton";
import AddStudent from "../Dialogs/AddStudent";
import AddButton from "../Basics/AddButton";
import { checkAdmin } from "@/redux/actions/adminActions";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmShowLogout, setConfirmShowLogout] = useState(false);
  const [confirmShowAdd, setConfirmShowAdd] = useState(false);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/admin/logout");
      await dispatch(checkAdmin());
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  return (<>
      <header className="bg-gray-900 text-white p-4 flex justify-end items-center gap-3 max-sm:hidden md:flex">
        <div className="flex justify-center items-center gap-4 mx-3">
          <AddButton icon={<><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></>} runFunction={()=> router.push('/')} text={"Student View"} />
          <AddButton icon={<path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />} runFunction={()=> setConfirmShowAdd(true)} text={"Add Student"} />
          <button
            onClick={() => setConfirmShowLogout(true)}
            className="active:scale-105 duration-75 inline-flex items-center justify-center text-white  overflow-hidden  font-medium  rounded-lg group bg-gradient-to-r from-purple-600 to-rose-500 group-hover:from-purple-600 group-hover:to-rose-500 hover:text-white  focus:outline-none "
          >
            <span className="flex justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-rose-700 hover:text-gray-300 rounded-md group-hover:bg-opacity-0">
              {/* <AiFillStar className="w-6 h-6 mr-1" /> */}
              <span>LogOut</span>
            </span> 
          </button>
        </div>
      </header>
        <ConfirmButton
          confirmState={confirmShowLogout}
          setConfirmState={setConfirmShowLogout}
          runFunction={logoutHandler}
          buttonText={"LogOut"}
        />
        <AddStudent confirmState={confirmShowAdd} setConfirmState={setConfirmShowAdd} />
      </>
  );
};

export default Header;
