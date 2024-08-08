import React, { useMemo, useState, useEffect, useRef } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiArrowRight,
  FiEdit,
} from "react-icons/fi";
import { adminTryCatch } from "@/utils/AdminActions";
import axios from "axios";
import toast from "react-hot-toast";
import ShowPassword from "../Dialogs/ShowPassword";
import EditStudent from "../Dialogs/EditStudent";
import { useDispatch } from "react-redux";
import { checkAdmin } from "@/redux/actions/adminActions";

const UserTable = ({ data }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const [password, setPassword] = useState('');
  const [studentData, setStudentData] = useState(null);

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [editStudentDialog, setEditStudentDialog] = useState(false);
  
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, studentId: null });
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
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
    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(value) ||
        user.phone.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleEditStudent = adminTryCatch(async (allData) => {
    const { data } = await axios.get(`/api/admin/student?user=${allData._id}`);
    if (data.success) {
      setPassword(data.data.password);
      setStudentData(allData);
      setEditStudentDialog(true);
    } else {
      toast.error(data.message);
    }
  });

  const handleShowPassword = adminTryCatch(async (id) => {
    const response = await axios.get(`/api/admin/student?user=${id}`);
    if (response.data.success) {
      setPassword(response.data.data.password);
      setShowPasswordDialog(true);
    } else {
      toast.error(response.data.message);
    }
  });

  const handleVerifyStudent = adminTryCatch(async (id) => {
    const response = await axios.put(`/api/admin/student/verify`, { userId: id });
    if (response.data.success) {
      await dispatch(checkAdmin());
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

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, studentId: null });
  };



  const ReturnRight = (detail) => {
    let right = detail.questions.reduce((accumulator, i) => {
      const users = i.users.find(u => u.id === detail._id);
      return users.result === 'Right' ? accumulator + 1 : accumulator;
    }, 0)
    return right;
  }

  const ReturnScore = (detail) => {
    let totalScore = detail.quizes.reduce((accumulator, quiz) => {
      const userScore = quiz.usersDone.find(u => u.id === detail._id);
      return userScore ? accumulator + userScore.score : accumulator;
    }, 0);
    return totalScore;
  }

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, i) => i + 1,
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Avatar",
        accessor: "avatar",
        Cell: ({ cell: { value } }) => (
          <img src={value} alt="avatar" className="w-12 h-12 rounded-full" />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Courses",
        accessor: "courses",
        Cell: ({ cell: { value } }) => value.length,
        sortType: (rowA, rowB) => {
          return rowA.original.courses.length - rowB.original.courses.length;
        },
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "MCQ",
        accessor: "quizes",
        Cell: ({ cell: { value } }) => value.length,
        sortType: (rowA, rowB) => {
          return rowA.original.quizes.length - rowB.original.quizes.length;
        },
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Score",
        accessor: (row) => ReturnScore(row),
        Cell: ({ cell: { value } }) => value,
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Questions",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => ReturnRight(value) + '/' + value.questions.length,
        sortType: (rowA, rowB) => {
          return rowA.original.questions.length - rowB.original.questions.length;
        },
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Verified",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) =>
          value.verified ? (
            <span
              onContextMenu={(e) => handleContextMenu(e, value._id)}
              className="cursor-pointer"
            >
              Yes
            </span>
          ) : (
            <button
              onClick={() => handleVerifyStudent(value._id)}
              className="px-2 py-1 bg-blue-500 text-white rounded-lg"
            >
              Verify
            </button>
          ),
          sortType: (rowA, rowB) => {
            return rowA.original.verified - rowB.original.verified;
          },
      },
      {
        Header: "Password",
        accessor: "_id",
        Cell: ({ cell: { value } }) => (
          <button
            onClick={() => handleShowPassword(value)}
            className="px-2 py-1 bg-green-500 text-white rounded-lg"
          >
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
          </button>
        ),
        className: "max-sm:hidden sm:table-cell",
      },
      {
        Header: "Edit",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <button
            onClick={() => handleEditStudent(value)}
            className="px-2 py-1 text-2xl bg-blue-500 text-white rounded-lg"
          >
            <FiEdit />
          </button>
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
      initialState: { pageIndex: 0, pageSize: 8 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="container mx-auto py-4 px-2">
        <div className="flex gap-2 items-center mb-4 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or phone"
            value={searchInput}
            onChange={handleSearch}
            className="px-2 py-1 max-sm:pr-20 max-sm:w-max max-sm:mx-2 border bg-gray-700/50 border-gray-300 focus:outline-none rounded-md"
          />
        </div>
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="table-auto w-full border-collapse border border-gray-600"
          >
            <thead className="bg-gray-800">
              {headerGroups.map((headerGroup,i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column,j) => (
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
            <tbody {...getTableBodyProps()}>
              {page.map((row,i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()} className="border border-gray-600">
                    {row.cells.map((cell,j) => (
                      <td key={j}
                        {...cell.getCellProps()}
                        className={`px-4 text-center py-2 border border-gray-600 text-sm text-gray-50 ${
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
        <div className="pagination mt-4 flex justify-between items-center text-gray-50">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-4 max-sm:hidden sm:block py-2 bg-gray-700 text-gray-50 rounded disabled:opacity-50"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-gray-700 text-gray-50 rounded disabled:opacity-50"
          >
            <FiArrowLeft />
          </button>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 bg-gray-700 text-gray-50 rounded disabled:opacity-50"
          >
            <FiArrowRight />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-4 max-sm:hidden sm:block py-2 bg-gray-700 text-gray-50 rounded disabled:opacity-50"
          >
            {">>"}
          </button>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="ml-2 p-2 bg-gray-700 text-gray-50 rounded"
          >
            {[3,5,8, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      {showPasswordDialog && (
        <ShowPassword
          isOpen={showPasswordDialog}
          setIsOpen={setShowPasswordDialog}
          password={password}
        />
      )}
      {editStudentDialog && studentData && (
        <EditStudent
          confirmState={editStudentDialog}
          setConfirmState={setEditStudentDialog}
          studentData={studentData}
          studentPassword={password}
        />
      )}
      {contextMenu.visible && (
      <div ref={contextMenuRef} style={{ position: "absolute", top: contextMenu.y, left: contextMenu.x }}>
        <button className="px-4 py-2 bg-rose-700 hover:bg-rose-700/90 rounded " onClick={() => handleVerifyStudent(contextMenu.studentId)}>Unverify</button>
      </div>
    )}
    </>
  );
};

export default UserTable;
