import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiArrowRight,
  FiEdit,
  FiShare2,
  FiCopy,
} from "react-icons/fi";
import { adminTryCatch } from "@/utils/AdminActions";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { checkAdmin } from "@/redux/actions/adminActions";
import moment from "moment";
import { useRouter } from "next/navigation";
import UpdateQuiz from "../Dialogs/EditQuiz";

const UserTable = ({ data }) => {
  const linkWeb = window.location.href.split("raithan-add")[0] + "start-quiz/";
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const [editQuizDialog, setEditQuizDialog] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    studentId: null,
  });
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filtered = data.filter((quiz) =>
      quiz.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handlePublishQuiz = adminTryCatch(async (id) => {
    const response = await axios.get(`/api/admin/quiz?id=${id}`);
    if (response.data.success) {
      dispatch(checkAdmin());
    } else {
      toast.error(response.data.message);
    }
  });

  const handleContextMenu = (e, studentId) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      studentId,
    });
  };

  const handleShare = async (Quiz) => {
    if(!Quiz.publish) return toast.error('Publish Before Share!');
    let date = new Date(Quiz.updatedAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    // console.log(formattedDate);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out Test Link!",
          text: `\n\n◉ Test No. ${data.length} \n◉ Total Question(s) : ${Quiz.questions.length} \n◉ Date : ${formattedDate} \n \n◉ Your MCQ Test link is Here.\n \n 👇👇👇👇👇 \n \n`,
          url: linkWeb + Quiz._id, // Shares the current page URL
        });
        toast.success("Link shared successfully");
      } catch (error) {
        toast.error("Error sharing the link", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, i) => i + 1,
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Icon",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIclu8YXkCr64EGkn23I4q_CeL1c5cD1WDug&s"
            }
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full"
          />
        ),
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => moment(value).fromNow(),
        sortType: (rowA, rowB) => {
          const dateA = new Date(rowA.original.createdAt);
          const dateB = new Date(rowB.original.createdAt);
          return dateA - dateB;
        },
      },
      {
        Header: "Courses",
        accessor: "forCourse",
        Cell: ({ cell: { value } }) => value.length,
        sortType: (rowA, rowB) => {
          return (
            rowA.original.forCourse.length - rowB.original.forCourse.length
          );
        },
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Questions",
        accessor: "questions",
        Cell: ({ cell: { value } }) => +value.length,
        sortType: (rowA, rowB) => {
          return (
            rowA.original.questions.length - rowB.original.questions.length
          );
        },
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Done",
        accessor: "usersDone",
        Cell: ({ cell: { value } }) => +value.length,
        sortType: (rowA, rowB) => {
          return (
            rowA.original.usersDone.length - rowB.original.usersDone.length
          );
        },
      },
      {
        Header: "Published",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) =>
          value.publish ? (
            <span
              onContextMenu={(e) => handleContextMenu(e, value._id)}
              className="cursor-pointer"
            >
              Yes
            </span>
          ) : (
            <button
              onClick={() => handlePublishQuiz(value._id)}
              className="px-2 py-1 bg-blue-500 text-white rounded-lg"
            >
              Publish
            </button>
          ),
        sortType: (rowA, rowB) => {
          return rowA.original.verified - rowB.original.verified;
        },
      },
      {
        Header: "Edit",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <button
            onClick={() => {
              setEditQuiz(value);
              setEditQuizDialog(true);
            }}
            className="px-2 py-1 text-2xl bg-blue-500 text-white rounded-lg"
          >
            <FiEdit />
          </button>
        ),
      },
      {
        Header: "Share",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <div className="flex gap-4">
            <button
              onClick={() => {
                if(!value.publish) return toast.error('Publish Before Copy!');
                navigator.clipboard.writeText(`${linkWeb + value._id}`);
                toast.success("coppied successfully");
              }}
              className="px-2 py-1 text-2xl bg-blue-500 text-white rounded-lg"
            >
              <FiCopy />
            </button>
            <button
              onClick={() => {
                handleShare(value);
              }}
              className="px-2 py-1 text-2xl bg-blue-500 text-white rounded-lg"
            >
              <FiShare2 />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of rows, we use page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageIndex: 0,
        pageSize: 8,
        sortBy: [
          {
            id: "createdAt",
            desc: true, // Set to true for descending order, false for ascending
          },
        ],
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="container mx-auto py-4 px-2">
        <div className="flex gap-2 items-center mb-4 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name"
            value={searchInput}
            onChange={handleSearch}
            className="px-2 py-1 max-sm:pr-20 max-sm:w-max max-sm:mx-2 border bg-gray-700/50 border-gray-300 focus:outline-none rounded-md"
          />
        </div>
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="table-auto w-full border-collapse border border-gray-400"
          >
            <thead className="bg-gray-700">
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, j) => (
                    <th
                      key={j}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={`px-4 py-2 border border-gray-600 text-left cursor-pointer text-sm text-gray-50 ${
                        column.className || ""
                      }`}
                    >
                      {column.render("Header")}
                      <span className="inline-block max-sm:hidden">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FiChevronDown className="inline-block ml-1" />
                          ) : (
                            <FiChevronUp className="inline-block ml-1" />
                          )
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-center inline-block"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                            />
                          </svg>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="">
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    key={i}
                    {...row.getRowProps()}
                    className="even:bg-gray-800/70 hover:bg-gray-800"
                  >
                    {row.cells.map((cell, j) => (
                      <td
                        key={j}
                        {...cell.getCellProps()}
                        onClick={() =>
                          (cell.column.Header !== "Name" &&
                            cell.column.Header !== "Icon" &&
                            cell.column.Header !== "#" &&
                            cell.column.Header !== "Created") ||
                          router.push(`quizes/${row.original._id}`)
                        }
                        className={`${
                          (cell.column.Header !== "Name" &&
                            cell.column.Header !== "Icon" &&
                            cell.column.Header !== "#" &&
                            cell.column.Header !== "Created") ||
                          "cursor-pointer text-blue-200"
                        } border border-gray-600 px-4 py-2 text-sm ${
                          cell.column.className || ""
                        }`}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-4">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-3 py-1 bg-gray-600 text-white rounded-lg"
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-3 py-1 bg-gray-600 text-white rounded-lg"
            >
              <FiArrowRight />
            </button>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Page</span>
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <div className="flex items-center max-sm:hidden">
            <span className="mr-2">Go to page:</span>
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              className="w-16 px-2 py-1 border border-gray-300 bg-gray-900/70 rounded-md"
            />
          </div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 bg-gray-900 rounded-md"
          >
            {[3, 5, 8, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          className="absolute"
          style={{ top: contextMenu.y + 5, left: contextMenu.x + 5 }}
        >
          <button
            onClick={() => handlePublishQuiz(contextMenu.studentId)}
            className="px-4 py-2 bg-rose-700 hover:bg-rose-700/90 rounded "
          >
            Unpublish
          </button>
        </div>
      )}

      {editQuiz && (
        <UpdateQuiz
          confirmState={editQuizDialog}
          setConfirmState={(state) => {
            setEditQuizDialog(state);
            if (!state) setEditQuiz(null);
          }}
          quizData={editQuiz}
        />
      )}
    </>
  );
};

export default UserTable;
