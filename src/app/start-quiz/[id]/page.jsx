"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Notfound from "../../not-found";
import Quiz from "@/components/user/Quiz";
import ModalImage from "react-modal-image";
import Link from "next/link";

const Page = ({ params }) => {
  const quizId = params.id;
  const { quizes, user } = useSelector((state) => state.user);

  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // console.log('quizId:', quizId);
    // console.log('quizes:', quizes);

    if (quizes) {
      const foundQuiz = quizes.find((i) => i._id === quizId);
      // console.log('foundQuiz:', foundQuiz);
      setQuiz(foundQuiz);
      // console.log(foundQuiz)
    }
  }, [quizId, quizes]);

  if (!quiz || quiz?.questions.length < 1) {
    return <Notfound />;
  }

  if (quiz.usersDone.find((i) => i.id === user._id)) {
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
        />
      )}
    </div>
  );
};

export default Page;

const QuizDone = ({ name, questions, userId, score }) => {
  // console.log(questions[0].users.find(u => u.id === userId)?.choosed,questions[0].options.a,Object.keys(questions[0].options)[4])
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

      <Result score={score} totalQuestions={questions.length} />

      {questions.map((question, index) => {
        return (
          <div key={index} className="py-10 px-4 sm:px-20">
            <div className="flex items-center gap-5">
              <div className="bg-purple-600 w-14 h-14 rounded-lg flex justify-center items-center">
                <p className="text-4xl font-mono">{index + 1}</p>
              </div>
              {!question.questionUrl ? (
                <p className="font-mono text-lg w-full sm:w-[80%]">
                  {question.question}
                </p>
              ) : (
                <div className="w-[80%]">
                  <ModalImage
                    small={question.questionUrl}
                    large={question.questionUrl} // Replace with your actual image URL
                    alt="question Image"
                  />
                </div>
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
      })}
    </div>
  );
};

const OptionDiv = ({ index, data, isSelected, isRight, isNotAttemp }) => {
  // console.log(isRight)
  return (
    <div className="flex items-center gap-3">
      <p className="text-3xl font-mono">{index}.</p>
      <div
        className={`border-2 flex justify-between items-center gap-3 cursor-pointer border-purple-600 w-full rounded-lg p-3 min-w-16 text-center ${
          isRight
            ? "bg-green-600/85"
            : isSelected && isNotAttemp
            ? "bg-purple-600/85"
            : isSelected && "bg-rose-600/85"
        }`}
      >
        {data}
        {isSelected && isRight ? (
          <span>+1</span>
        ) : isSelected && isNotAttemp ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          isSelected && <span>-0.25</span>
        )}
      </div>
    </div>
  );
};

const Result = ({ score, totalQuestions }) => {
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
        <Link href={"/"}>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-500">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};
