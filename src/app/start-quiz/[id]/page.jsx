"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notfound from "../../not-found";
import Quiz from "@/components/user/Quiz";
import ModalImage from "react-modal-image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { userTryCatch } from "@/utils/UserActions";
import moment from "moment";
import { ClipLoader } from "react-spinners";

const Page = ({ params }) => {
  const quizId = params.id;
  const { quizes, user } = useSelector((state) => state.user);

  const [quiz, setQuiz] = useState(null);
  const [isReattempt, setIsReattempt] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('quizId:', quizId);
    // console.log('quizes:', quizes);

    const GetQuizesData = async () => {
      try {
        const { data } = await axios.get(`/api/user/quiz?id=${quizId}`);
        setQuiz(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      }
    };

    if (quizes) {
      const foundQuiz = quizes.find((i) => i._id === quizId);
      // console.log('foundQuiz:', foundQuiz);
      setQuiz(foundQuiz);
      setLoading(false);
      // console.log(foundQuiz)
    } else {
      GetQuizesData();
    }
  }, [quizId, quizes]);

  if (!quiz || quiz?.questions.length < 1) {
    return loading ? (
      <div className="w-full p-5 flex justify-center items-center">
        <ClipLoader color="#9f33c7" size={100} />{" "}
      </div>
    ) : (
      <Notfound />
    );
  }

  if (quiz.usersDone.find((i) => i.id === user._id) && !isReattempt) {
    // console.log(quiz.usersDone.find(i => i.id === user._id))
    // console.log(quiz.usersDone)
    return (
      quiz &&
      quiz.questions.length > 0 && (
        <>
          <QuizDone
            questions={quiz.questions}
            name={quiz.name}
            userId={user._id}
            score={quiz.usersDone.find((u) => u.id === user._id)?.score}
            setIsReAttempt={setIsReattempt}
            quizId={quizId}
          />
        </>
      )
    );
  }

  return (
    <div>
      {quiz && quiz.questions.length > 0 && (
        <Quiz
          questions={quiz.questions}
          name={quiz.name}
          quizId={quiz._id}
          userId={user._id}
          isReattempt={isReattempt}
        />
      )}
    </div>
  );
};

export default Page;

const QuizDone = ({
  name,
  questions,
  userId,
  score,
  setIsReAttempt,
  quizId,
}) => {
  // console.log(questions[0].users.find(u => u.id === userId)?.choosed,questions[0].options.a,Object.keys(questions[0].options)[4])
  const [isResultAnswer, setIsResultAnswer] = useState(false);
  return (
    <div className="px-4 sm:px-40 pt-12">
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="flex items-center justify-center gap-5 mb-4 sm:mb-0">
          <div className="bg-purple-600 w-16 h-16 rounded-lg flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer hover:scale-125 duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div>
            <p className="text-3xl">{name}</p>
            <p className="text-gray-300 font-light">
              {questions.length} Questions
            </p>
          </div>
        </div>
      </div>

      {isResultAnswer ? (
        <ResultAnswers
          setIsResultAnswer={setIsResultAnswer}
          questions={questions}
          userId={userId}
        />
      ) : (
        <Result
          score={score}
          setIsReAttempt={setIsReAttempt}
          totalQuestions={questions.length}
          setIsResultAnswer={setIsResultAnswer}
          quizId={quizId}
        />
      )}
    </div>
  );
};

const OptionDiv = ({ index, data, isSelected, isRight }) => {
  return (
    <div
      className={`${!isRight ? "border" : "border-2"} ${
        index === 5 && "hidden"
      } flex items-center gap-3 cursor-pointer ${
        isRight
          ? "border-green-600"
          : isSelected
          ? "border-rose-600"
          : "border-gray-500"
      } w-full rounded-lg py-2 min-w-16 ${""} `}
    >
      <p className="text-xl border-r-2 border-gray-600 px-3 font-mono">
        {index}
      </p>
      <p>{data}</p>
      <div className="border flex justify-center items-center size-7 min-w-7 p-1  ml-auto mr-3 rounded-full border-gray-600">
        <div
          className={`size-full rounded-full ${
            isSelected && isRight
              ? "bg-green-600/85"
              : isSelected
              ? "bg-rose-600"
              : ""
          }`}
        ></div>
      </div>
    </div>
  );
};

const Result = ({
  score,
  totalQuestions,
  setIsResultAnswer,
  setIsReAttempt,
  quizId,
}) => {
  return (
    <div className=" text-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4 text-yellow-400 text-center flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-28"
          >
            <path
              fillRule="evenodd"
              d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-2">Your Score</h1>
        <h2 className="text-2xl mb-4">
          {score}/{totalQuestions}
        </h2>
        <Link href={"/start-quiz"}>
          <button className="bg-purple-600 mt-5 text-white py-2 px-4 rounded-md hover:bg-purple-500">
            Go Back
          </button>
        </Link>
      </div>

      <div className="flex justify-around items-center mt-12 w-full">
        <button
          onClick={() => setIsReAttempt(true)}
          className="bg-yellow-500 flex text-white py-2 px-4 rounded-md hover:bg-yellow-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
              clipRule="evenodd"
            />
          </svg>
          Reattempt
        </button>
        <button
          onClick={() => setIsResultAnswer(true)}
          className="bg-yellow-500 flex gap-2 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
            <path
              fillRule="evenodd"
              d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
              clipRule="evenodd"
            />
          </svg>
          Show Results
        </button>
      </div>
      <QuizComment quizId={quizId} />
    </div>
  );
};

const ResultAnswers = ({ questions, userId, setIsResultAnswer }) => {
  const [activeTab, setActiveTab] = useState("Right");
  return (
    <div>
      <div className="flex justify-center items-center mt-4">
        <svg
          onClick={() => setIsResultAnswer(false)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 mr-5"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>

        <button
          className={`px-4 py-2 ${
            activeTab === "Right"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-400"
          } rounded-l-lg`}
          onClick={() => setActiveTab("Right")}
        >
          Right
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Wrong"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-400"
          }`}
          onClick={() => setActiveTab("Wrong")}
        >
          Wrong
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Not Attempted"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-400"
          } rounded-r-lg`}
          onClick={() => setActiveTab("Not Attempted")}
        >
          Not Attempted
        </button>
      </div>
      {questions.map((question, index) => {
        const result = question.users.find((u) => u.id === userId)?.result;
        // console.log(result);
        if (result === activeTab) {
          return (
            <div key={index} className="py-10 px-4 sm:px-20">
              <div className="flex justify-center items-center bg-gray-900 max-sm:mx-3 px-2 py-1 rounded-md gap-2">
                <p>{index + 1}.</p>{" "}
                {!questions[index].questionUrl ? (
                  <p className="font-mono text-lg w-full sm:w-[90%]">
                    {questions[index].question}
                  </p>
                ) : (
                  <ModalImage
                    className="max-h-64 w-full object-contain"
                    small={questions[index].questionUrl}
                    large={questions[index].questionUrl} // Replace with your actual image URL
                    alt="question Image"
                  />
                )}
              </div>

              <div
                className={`flex ${
                  question.questionUrl || "flex-col"
                } flex-wrap justify-evenly gap-5 pt-8 px-4 sm:px-10 text-xl`}
              >
                {Object.values(question.options).map((option, i) => {
                  // console.log(Object.keys(option))
                  return (
                    <OptionDiv
                      key={i}
                      data={option}
                      index={i + 1}
                      isSelected={
                        question.users.find((u) => u.id === userId)?.choosed ===
                        Object.keys(questions[0].options)[i]
                      }
                      isRight={
                        question.answer === Object.keys(questions[0].options)[i]
                      }
                      isNotAttemp={"e" === Object.keys(questions[0].options)[i]}
                    />
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

const QuizComment = ({ quizId }) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [commentData, setCommentData] = useState([]);

  const getComments = userTryCatch(async () => {
    const { data } = await axios.get(`/api/user/quiz/comment?id=${quizId}`);
    setCommentData(data.data);
    setLoading(false);
  });

  const handleSubmitComment = userTryCatch(async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/user/quiz/comment", {
      quizId,
      message,
    });
    toast.success(data.message);
    setMessage("");
    getComments();
  });

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="w-full my-10">
      <p className="text-2xl font-sans border-b">Comments</p>
      <form
        className=" flex justify-center items-center flex-col"
        onSubmit={handleSubmitComment}
      >
        <textarea
          placeholder="Your Comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-3 mt-4 rounded-lg focus:outline-none w-full bg-gray-800"
          rows="2"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 self-start text-white px-6 py-3 mt-4 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>

      {loading ? (
        <div className="w-full p-5 flex justify-center items-center">
          <ClipLoader color="#46e53c" size={100} />{" "}
        </div>
      ) : (
        <div>
          {commentData &&
            [...commentData].reverse().map((i, j) => (
              <div
                key={j}
                className="flex items-center gap-4 border rounded-md px-4 py-2 my-5"
              >
                <ModalImage
                  className="h-12 w-12 rounded-full object-cover"
                  small={i.user.avatar}
                  large={i.user.avatar} // Replace with your actual image URL
                  alt="question Image"
                />
                <div className="w-[90%]">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-lg font-bold">
                      {i.user.name[0].toUpperCase() + i.user.name.slice(1)}
                    </p>
                    <p className="text-xs font-extralight text-gray-300">
                      {moment(i.updatedAt).fromNow()}
                    </p>
                  </div>
                  <p className="text-gray-200 font-extralight font-sans">
                    {i.message}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
