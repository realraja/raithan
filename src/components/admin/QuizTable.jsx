// import React, { useMemo } from 'react';
// import { useTable } from 'react-table';

// const data = useMemo(() => [
//   {
//     _id: "669e4cdf5f50a572343f96ee",
//     name: "test",
//     score: 6
//   },
//   {
//     _id: "669e4d46760c6dc0133d9df7",
//     name: "test 2",
//     score: 2.75
//   },
//   // Add more rows here...
// ], []);

// const columns = useMemo(() => [
//   {
//     Header: 'ID',
//     accessor: '_id', // accessor is the "key" in the data
//   },
//   {
//     Header: 'Name',
//     accessor: 'name',
//   },
//   {
//     Header: 'Score',
//     accessor: 'score',
//   },
// ], []);

// function TableComponent() {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, data });

//   return (
//     <div className="dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md overflow-x-auto">
//       <table {...getTableProps()} className="min-w-full table-auto">
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-900">
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()} className="px-4 py-2">
//                   {column.render('Header')}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} className="bg-gray-700">
//                 {row.cells.map(cell => (
//                   <td {...cell.getCellProps()} className="px-4 py-2 border-b border-gray-600">
//                     {cell.render('Cell')}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default TableComponent;
