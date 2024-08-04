"use client";
import TableComponent from "@/components/admin/QuizTable";
import AddButton from "@/components/Basics/AddButton";
import AddQuiz from "@/components/Dialogs/AddQuiz";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [confirmShowAdd, setConfirmShowAdd] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { quizes } = useSelector((state) => state.admin);

  // console.log(courses)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    // <div className="dark:bg-gray-800 min-h-screen flex items-center justify-center">
    //   <TableComponent />
    // </div>
    <>
      <div className="flex flex-col items-center">
        <AddButton
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          }
          runFunction={() => setConfirmShowAdd(true)}
          text={"Add Quizes"}
        />

        <div className="w-full flex flex-wrap justify-center gap-5 p-4 my-4 cursor-pointer">
          {quizes && quizes.map((i,v)=>(
            <CoursesCard key={v} id={i._id} name={i.name} subjects={i.forSubject.length} questions={i.questions.length} courses={i.forCourse.length} date={i.createdAt}  />
          ))}

          </div>

      </div>

      <AddQuiz
        confirmState={confirmShowAdd}
        setConfirmState={setConfirmShowAdd}
      />
    </>
  );
};

export default Page;



const CoursesCard = ({id,name, subjects, courses,questions, date}) => {
  const router = useRouter();
  return (
    <div onClick={()=> router.push(`quizes/${id}`)} className="bg-gray-800 p-6 rounded-lg shadow-lg w-64">
      <h1 className="text-3xl text-purple-600 font-bold mb-2 text-center">{name}</h1>
      <ul className="list-disc list-inside">
        <li className="mb-2">{questions} questions</li>
        <li className="mb-2">{courses} Courses</li>
        <li className="mb-2">{subjects} Subjects</li>
      </ul>
      <span className="text-gray-400 text-right">Time : {moment(date).fromNow()}</span>
    </div>
  );
}




/*accordian

"use client";
import Layout from "@/components/admin/Layout";
import AddButton from "@/components/Basics/AddButton";
import AddQuiz from "@/components/Dialogs/AddQuiz";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [confirmShowAdd, setConfirmShowAdd] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { quizes } = useSelector((state) => state.admin);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <AddButton
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          }
          runFunction={() => setConfirmShowAdd(true)}
          text={"Add Quizes"}
        />

        <div className="w-full flex flex-col flex-wrap justify-center gap-5 p-4 my-4 cursor-pointer">
          <Accordion title="Accordion Test">
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos quas
              blanditiis labore odio, iure recusandae illo nostrum impedit
              dolorem fugiat. Dolore dolor nam corporis tempore asperiores.
              Pariatur deserunt enim quibusdam!
            </div>
          </Accordion>
          {quizes && quizes.map((i, v) => (
            <CoursesCard key={v} id={i._id} name={i.name} subjects={i.forSubject.length} questions={i.questions.length} courses={i.forCourse.length} date={i.createdAt} />
          ))}
        </div>
      </div>

      <AddQuiz
        confirmState={confirmShowAdd}
        setConfirmState={setConfirmShowAdd}
      />
    </Layout>
  );
};

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-700 rounded-lg mb-4 bg-gray-800">
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-700 hover:bg-gray-600"
        onClick={toggleAccordion}
      >
        <h3 className="text-purple-500">{title}</h3>
        <span className="text-purple-500">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && <div className="p-4 text-gray-300">{children}</div>}
    </div>
  );
};

const CoursesCard = ({ id, name, subjects, courses, questions, date }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`quizes/${id}`)} className="bg-gray-800 p-6 rounded-lg shadow-lg w-64">
      <h1 className="text-3xl text-purple-600 font-bold mb-2 text-center">{name}</h1>
      <ul className="list-disc list-inside">
        <li className="mb-2">{questions} questions</li>
        <li className="mb-2">{courses} Courses</li>
        <li className="mb-2">{subjects} Subjects</li>
      </ul>
      <span className="text-gray-400 text-right">Time : {moment(date).fromNow()}</span>
    </div>
  );
};

export default Page;
*/
