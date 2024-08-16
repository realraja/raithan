"use client";
import React, { useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BellIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import ConfirmButton from "../Dialogs/ConfirmButton";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { CheckUser } from "@/utils/UserActions";
import {
  loginAction,
  logoutAction,
  setLoadingFalse,
} from "@/redux/slices/userSlice";
import { BeatLoader } from "react-spinners";
import { CheckAdmin } from "@/utils/AdminActions";
import { checkAdmin } from "@/redux/actions/adminActions";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.admin);
  const { loading, isUser, user } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const logoutHandle = async () => {
    try {
      const { data } = await axios.get("/api/logout");
      await dispatch(logoutAction());
      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
      error.response
        ? toast.error(error.response.data.message)
        : toast.error(error.message);
    }
  };

  useEffect(() => {
    const checkUserFun = async () => {
      const data = await CheckUser();
      // console.log("data======>",data);
      if (data.success) {
        await dispatch(loginAction(data.data.user));
        toast.success("User Verified Successfully");
      } else {
        dispatch(setLoadingFalse());
        pathname.split("/")[2] !== "login" || toast.error(data.message);
        router.push("/login");
      }
    };
    const CheckIsAdmin = async () => {
      const data = await CheckAdmin();
      if (data.success) {
        await dispatch(checkAdmin());
      }
    };
    checkUserFun();
    CheckIsAdmin();
  }, [router, dispatch]);

  return (
    <nav
      className={`bg-gray-900 border-b border-gray-700 w-full sticky top-0 z-50 ${
        (pathname.split("/")[2] !== "login" &&
          pathname.split("/")[1] !== "register" &&
          pathname.split("/")[1] !== "admin-login" &&
          pathname.split("/")[1] !== "forget-password" &&
          // pathname.split("/")[1] !== "start-quiz" &&
          pathname.split("/")[1] !== "login") ||
        "hidden"
      }`}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch justify-start">
            <div
              onClick={() => router.push("/")}
              className="flex flex-shrink-0 items-center cursor-pointer"
            >
              <img
                className="h-16 w-auto"
                src="/Logo_Design_Template-removebg-preview.png"
                alt="Your Company"
              />
              <span className="text-3xl sm:block font-serif font-extralight">
                Raithan Classes
              </span>
            </div>
            <div className="max-sm:hidden flex justify-center items-center gap-3 ml-5">
              <Link
                href={"/"}
                className={`px-5 py-2 rounded-md ${
                  pathname === "/"
                    ? "bg-gray-950  text-purple-300"
                    : "hover:bg-gray-800"
                }`}
              >
                <p>Home</p>
              </Link>
              <Link
                href={"/study"}
                className={`px-5 py-2 rounded-md ${
                  pathname.split("/")[1] === "study"
                    ? "bg-gray-950  text-purple-300"
                    : "hover:bg-gray-800"
                }`}
              >
                <p>Study</p>
              </Link>
              <Link
                href={"/profile"}
                className={`px-5 py-2 rounded-md ${
                  pathname.split("/")[1] === "profile"
                    ? "bg-gray-950  text-purple-300"
                    : "hover:bg-gray-800"
                }`}
              >
                <p>Profile</p>
              </Link>
            </div>
          </div>
          {loading ? (
            <BeatLoader color="#b03acf" margin={4} speedMultiplier={3} />
          ) : isUser ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                onClick={() => router.push("/01-test-image")}
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar}
                      alt="user"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Home
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/study"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Study
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    {isAdmin && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/raithan-add"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Admin View
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          onClick={() => setIsOpen(true)}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          Sign out
                        </p>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <Link
              href={"/login"}
              className="text-purple-500 flex justify-center items-center gap-2"
            >
              Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <ConfirmButton
        confirmState={isOpen}
        setConfirmState={setIsOpen}
        runFunction={logoutHandle}
        buttonText={"Logout"}
      />
    </nav>
  );
};

export default Navbar;
