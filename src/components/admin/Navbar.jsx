import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/navigation";
import { NavbarData } from "@/utils/AdminNavbarData";
import Link from "next/link";
import ConfirmButton from "../Dialogs/ConfirmButton";
import AddStudent from "../Dialogs/AddStudent";

const Navbar = () => {
  const router = useRouter();
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

  return (
    <>
      <nav className="bg-gray-800 sm:hidden">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div>
              <div
                onClick={() => router.push("/raithan-add")}
                className="flex flex-shrink-0 items-center cursor-pointer"
              >
                <img
                  className="h-16 w-auto"
                  src="/Logo_Design_Template-removebg-preview.png"
                  alt="Your Company"
                />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                onClick={() => setConfirmShowAdd(true)}
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-7 text-white"
                >
                  <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                </svg>
              </button>
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
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
                    {NavbarData.map((i) => (
                      <Menu.Item key={i.id}>
                        {({ active }) => (
                          <Link
                            href={i.herf}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } px-4 py-2 text-gray-700 flex`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-6 w-6 mr-2"
                            >
                              {i.icon}
                            </svg>
                            {i.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/"
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-purple-700 text-center border-t border-black`}
                        >
                          Student View
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          onClick={() => setConfirmShowAdd(true)}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } block px-4 py-2 text-sm text-purple-700 text-center`}
                        >
                          Add Student
                        </p>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          onClick={() => setConfirmShowLogout(true)}
                          className={`${
                            active ? "bg-rose-100" : ""
                          } block px-4 py-2 text-rose-700 text-center`}
                        >
                          Log out
                        </p>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
      <ConfirmButton
        confirmState={confirmShowLogout}
        setConfirmState={setConfirmShowLogout}
        runFunction={logoutHandler}
        buttonText={"LogOut"}
      />
      <AddStudent
        confirmState={confirmShowAdd}
        setConfirmState={setConfirmShowAdd}
      />
    </>
  );
};

export default Navbar;
