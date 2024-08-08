"use client"
import { UpdateQuestion, UpdateQuiz } from "@/utils/UserActions";
import Link from "next/link";
import { useState, useEffect } from "react";
import ModalImage from "react-modal-image";

const questionss = [
  // Your questions array
];

export default function Quiz({ questions = questionss, name, quizId, userId ,isReattempt}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(questions[currentQuestion].timer * 60); // 1 minute for each question
  const [score, setScore] = useState(null);
  const [result, setResult] = useState({ right: 0, wrong: 0, notAttempted: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleNext = () => {


    if(selectedOptions[currentQuestion] === null) {
      const newSelections = [...selectedOptions];
      newSelections[currentQuestion] = 4;
      setSelectedOptions(newSelections);
    }

    const selectedOptionKey = Object.keys(questions[currentQuestion].options)[selectedOptions[currentQuestion]];

    UpdateQuestion({ questionId: questions[currentQuestion]._id, option: selectedOptionKey || 'e' });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(questions[currentQuestion + 1].timer * 60); // reset timer for next question
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      const newSelections = [...selectedOptions];
      newSelections[currentQuestion] = 4;
      setSelectedOptions(newSelections);
      handleNext();
    }
  }, [timeLeft]);

  useEffect(() => {
   if(!isReattempt){ const newSelections = [...selectedOptions];
    questions.forEach((i, j) => {
      const userAnswer = i.users.find(user => user.id === userId)?.choosed;
      if (userAnswer) {
        if (j < questions.length - 1) {
          setCurrentQuestion(j + 1);
          setTimeLeft(questions[j + 1].timer * 60); // reset timer for next question
        }
        switch (userAnswer) {
          case 'a':
            newSelections[j] = 0;
            setSelectedOptions(newSelections);
            break;
          case 'b':
            newSelections[j] = 1;
            setSelectedOptions(newSelections);
            break;
          case 'c':
            newSelections[j] = 2;
            setSelectedOptions(newSelections);
            break;
          case 'd':
            newSelections[j] = 3;
            setSelectedOptions(newSelections);
            break;
          default:
            newSelections[j] = 4;
            setSelectedOptions(newSelections);
            break;
        }
      }
    });}
  }, []);

  const handleOptionSelect = (index) => {
    const newSelections = [...selectedOptions];
    newSelections[currentQuestion] = index;
    setSelectedOptions(newSelections);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    let getResult = { right: 0, wrong: 0, notAttempted: 0 };
    selectedOptions.forEach((option, index) => {
      const correctAnswer = questions[index].answer;
      const selectedOptionKey = Object.keys(questions[index].options)[option];
      if (selectedOptionKey === correctAnswer) {
        calculatedScore += 1;
        getResult.right += 1;
      } else if (selectedOptionKey === "e") {
        getResult.notAttempted += 1;
      } else {
        calculatedScore -= 0.25;
        getResult.wrong += 1;
      }
    });
    UpdateQuiz({ quizId, score: calculatedScore });
    setScore(calculatedScore);
    setResult(getResult);
  };

  if (score !== null) {
    return (
      <Result score={score} totalQuestions={questions.length} correctAnswers={result.right} incorrectAnswers={result.wrong} notAttempted={result.notAttempted} />
    );
  }

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
          {currentQuestion + 1}/{questions.length} Questions
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 px-2 text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-purple-600"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
            clipRule="evenodd"
          />
        </svg>

        <p>{new Date(timeLeft * 1000).toISOString().substr(14, 5)}</p>
      </div>
    </div>

    <div className="py-14 px-4 sm:px-20">
      <div className="flex justify-center items-center bg-gray-900 max-sm:mx-3 px-2 py-1 rounded-md">
        {!questions[currentQuestion].questionUrl?<p className="font-mono text-lg w-full sm:w-[90%]">
          {currentQuestion + 1}. {questions[currentQuestion].question}
        </p>:
        <ModalImage
        className="max-h-64 w-full object-contain"
            small={questions[currentQuestion].questionUrl}
            large={questions[currentQuestion].questionUrl} // Replace with your actual image URL
            alt="question Image"
          />
          }
      </div>

      <div className={`flex ${questions[currentQuestion].questionUrl || 'flex-col'} flex-wrap justify-evenly gap-5 pt-8 px-4 sm:px-10 text-xl`}>
        {Object.values(questions[currentQuestion].options).map(
          (option, index) => (
            <OptionDiv
              key={index}
              data={option}
              index={index + 1}
              onClick={() => handleOptionSelect(index)}
              isSelected={selectedOptions[currentQuestion] === index}
            />
          )
        )}
      </div>

      <div className="flex justify-between pt-8 px-4 sm:px-10">
        <button
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0}
          className="flex justify-center items-center gap-3 bg-purple-700 text-xl px-5 py-2 lg:px-8 lg:py-3 rounded-xl disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Previous</span>
        </button>
        <button
          onClick={handleNext}
          className="flex justify-center items-center gap-3 bg-purple-700 text-xl px-5 py-2 lg:px-8 lg:py-3 rounded-xl disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? (
            <span>Submit</span>
          ) : (
            <>
              <span>Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
  );
}

const OptionDiv = ({ index, data, isSelected, onClick,isHidden }) => {
  return (
      <div
      onClick={onClick}
        className={`${!isSelected?'border':'border-2'} ${index===5 && 'hidden'} flex items-center gap-3 cursor-pointer border-purple-600 w-full rounded-lg py-2 min-w-16 ${
         ''
        } ${isHidden && "hidden"}`}
      >
        <p className="text-xl border-r-2 border-purple-600 px-3 font-mono">{index}</p>
        <p>{data}</p>
        <div className="border flex justify-center items-center size-7 min-w-7 p-1  ml-auto mr-3 rounded-full border-purple-600">
        <div className={`size-full rounded-full ${ isSelected && "bg-purple-600/85" }`}></div>
        </div></div>
  );
};

const Result = ({ score, totalQuestions, correctAnswers, incorrectAnswers, notAttemped }) => {
  return (
    <div className="h-[calc(90dvh)] text-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
      <div className="text-6xl mb-4 text-yellow-400 text-center flex justify-center" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-28">
  <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
</svg>
</div>
        <h1 className="text-4xl font-bold mb-2">Your Score</h1>
        <h2 className="text-2xl mb-4">{score}/{totalQuestions}</h2>
        <Link href={'/start-quiz'}>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 mb-4">
            Go Back
          </button>
        </Link>
        <div className="text-lg">
          <p className="text-green-400">✔ Correct Answers: {correctAnswers}</p>
          <p className="text-red-400">✖ Incorrect Answers: {incorrectAnswers}</p>
          <p className="text-purple-400"> Not Answered: {notAttemped}</p>
        </div>
      </div>
    </div>
  );
}


/* 
return (
    <div className="max-w-2xl mx-auto p-5 bg-gray-800 text-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-5">{name}</h1>
      <div className="flex justify-between mb-4">
        <p>{currentQuestion + 1} / {questions.length} Questions</p>
        <p>Time Left: {new Date(timeLeft * 1000).toISOString().substr(14, 5)}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{questions[currentQuestion].question}</h2>
        <ul>
          {Object.values(questions[currentQuestion].options).map((option, index) => (
            <li
              key={index}
              className={`p-2 mt-2 border rounded cursor-pointer ${
                selectedOptions[currentQuestion] === index ? 'bg-green-500' : 'bg-gray-700'
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-5">
        <button
          className="bg-gray-600 p-2 rounded disabled:opacity-50"
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          className="bg-gray-600 p-2 rounded disabled:opacity-50"
          onClick={handleNext}
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );*/


  // <div className="p-5 text-center">
      //   <h1 className="text-2xl font-bold">Quiz Result</h1>
      //   <p className="text-xl">Your score: {score}</p>
      //   <h2 className="text-xl mt-4 font-semibold">Correct Answers</h2>
      //   <ul className="list-disc list-inside">
      //     {questions.map((q, index) => (
      //       <li key={index}>
      //         {q.question} - {q.options[q.answer]}
      //       </li>
      //     ))}
      //   </ul>
      // </div>