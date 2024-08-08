"use client";
import TableComponent from "@/components/admin/QuizTable";
import AddButton from "@/components/Basics/AddButton";
import AddQuiz from "@/components/Dialogs/AddQuiz";
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
    <div className="flex flex-col items-center justify-center max-sm:w-screen sm:py-5">
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
      {quizes && <TableComponent data={[...quizes].reverse()} />}

      <AddQuiz
        confirmState={confirmShowAdd}
        setConfirmState={setConfirmShowAdd}
      />
    </div>
   
  );
};

export default Page;




