"use client";
import AddQuestion from "@/components/Dialogs/AddQuestion";
import ConfirmButton from "@/components/Dialogs/ConfirmButton";
import EditQuestion from "@/components/Dialogs/EditQuestion";
import { checkAdmin } from "@/redux/actions/adminActions";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

const Page = ({ params }) => {
  const { id } = params;
  const [confirmShowAdd, setConfirmShowAdd] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);

  const { questions } = useSelector((state) => state.admin);

  useEffect(() => {
    setMounted(true);
    if (questions) {
      setQuestionsData(questions.filter((q) => q.for.includes(id)).reverse());
    }
  }, [questions, id]);

  if (!mounted) return null;

  return (
    <>
      <div className="w-full flex flex-col flex-wrap justify-center gap-5 p-4 cursor-pointer">
        <AddButton
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          }
          runFunction={() => setConfirmShowAdd(true)}
          text={"Add Question"}
        />
        {questionsData &&
          questionsData.map((i, v) => (
            <div key={i._id}> {/* Ensure this div has a unique key */}
            <Accordion
              key={`${i._id}-desktop`} 
              title={i.question}
              data={i}
              index={questionsData.length - v}
              quizId={id}
            />
            <AccordionMobile
              key={`${i._id}-mobile`}
              title={i.question}
              data={i}
              index={questionsData.length - v}
              quizId={id}
            />
          </div>
          ))}
      </div>

      <AddQuestion
        isOpen={confirmShowAdd}
        setIsOpen={setConfirmShowAdd}
        quiz={id}
      />
    </>
  );
};

const Accordion = ({ title, data, index, quizId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const response = await axios.delete(
        `/api/admin/question?quiz=${quizId}&questionId=${data._id}`
      );

      console.log(response.data);

      setLoadingDelete(false);
      await dispatch(checkAdmin());
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      error.response
        ? toast.error(error.response.data.message)
        : toast.error(error.message);
      setLoadingDelete(false);
    }
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="border border-gray-700 rounded-lg mb-4  max-sm:hidden sm:flex flex-col">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-gray-900 hover:bg-gray-800"
          onClick={toggleAccordion}
        >
          <div className="flex justify-start">
            <p className="text-purple-500 text-xl"> Question-{index} : </p>
            <span className="text-purple-400 text-lg  ml-2">
              {title ? title : "Image Question"}
            </span>
          </div>
          <span className="text-purple-500">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        </div>
        {isOpen && (
          <div className="p-4">
            <div className="flex flex-col space-y-4 px-5 ">
              {data.questionUrl ? (
                <img
                  className="h-80 m-auto"
                  src={data.questionUrl}
                  alt="Question image"
                />
              ) : (
                <div className="space-y-4">
                  <Option label="A " text={data.options.a} />
                  <Option label="B " text={data.options.b} />
                  <Option label="C " text={data.options.c} />
                  <Option label="D " text={data.options.d} />
                  <Option label="E " text={data.options.e} />
                </div>
              )}

              <div className="flex flex-col lg:flex-row gap-5 mx-12">
                <Option label="Answer " text={data.answer.toUpperCase()} />
                <Option label="Timer " text={`${data.timer} Minutes`} />
              </div>
              <div className="flex sm:justify-center md:justify-between gap-5 mx-3">
                <p className="text-gray-400 sm:hidden md:block">
                  {moment(data.createdAt).fromNow()}
                </p>
                <div className="flex gap-5 mx-3">
                  <button
                    onClick={() => setIsConfirmDialogOpen(true)}
                    className="active:scale-105 duration-75 inline-flex items-center justify-center text-white  overflow-hidden  font-medium  rounded-lg group bg-gradient-to-r from-purple-600 to-rose-500 group-hover:from-purple-600 group-hover:to-rose-500 hover:text-white  focus:outline-none "
                  >
                    <span className="flex justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-rose-700 hover:text-gray-300 rounded-md group-hover:bg-opacity-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 mr-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span>
                        {loadingDelete ? (
                          <BeatLoader className=" self-center" color="white" />
                        ) : (
                          "Delete"
                        )}
                      </span>
                    </span>
                  </button>
                  <button
                    onClick={() => setIsOpenDialog(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 mr-2"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <EditQuestion
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        questionData={data}
        quiz={quizId}
      />
      <ConfirmButton
        runFunction={handleDelete}
        buttonText={"Delete"}
        confirmState={isConfirmDialogOpen}
        setConfirmState={setIsConfirmDialogOpen}
      />
    </>
  );
};
const AccordionMobile = ({ title, data, index, quizId }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <>
      <div
        className="flex max-sm:flex sm:hidden justify-between items-center p-4 cursor-pointer  rounded-xl bg-gray-900 hover:bg-gray-800"
        onClick={() => setIsOpenDialog(true)}
      >
        <div className="flex justify-start">
          <p className="text-purple-500 text-xl"> Question-{index} : </p>
          <span className="text-purple-400 text-lg  ml-2">
            {title ? title : "Image Question"}
          </span>
        </div>
        <span className="text-purple-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      <EditQuestion
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        questionData={data}
        quiz={quizId}
      />
    </>
  );
};

const Option = ({ label, text }) => {
  return (
    <div className="flex items-center space-x-5">
      <span className="font-bold">{label}</span>
      <span className="font-bold">:</span>
      <input
        type="text"
        value={text}
        readOnly
        className="flex-grow bg-gray-800 text-gray-300 px-4 py-2 rounded focus:outline-none"
      />
    </div>
  );
};

const AddButton = ({ icon, runFunction, text }) => {
  return (
    <button
      onClick={runFunction}
      className="active:scale-105 w-full h-14 duration-75 inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-r from-rose-600 to-violet-500 group-hover:from-rose-600 group-hover:to-violet-500 hover:text-white dark:text-white  focus:outline-none "
    >
      <span className="flex justify-center w-full h-full items-center px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 mr-2"
        >
          {icon}
        </svg>
        <p className="text-lg font-normal">{text}</p>
      </span>
    </button>
  );
};

export default Page;
