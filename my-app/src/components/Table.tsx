import React, { useEffect } from 'react'
import {  useSortBy, useTable } from 'react-table'




function Table({ columns, data }: any) {
//check local storage for the state of the table

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  setSortBy,
} = useTable(
  {
    columns,
    data,
    initialState: {
      //verificar si hay algo en local storage
      sortBy: JSON.parse(localStorage.getItem('sortBy') || '[]'),
    },      
  },
  useSortBy
  )
const onView = rows;

console.log(onView);
  return(
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {
                ...column.getHeaderProps()
              }
              onClick={() =>{
                //set sort desc or asc or none and save it on the state and localstorage
                const desc = column.isSortedDesc === true 
                ? undefined
                : column.isSortedDesc === false
                ? true
                : false
                setSortBy([{
                  id: column.id,
                  desc
                }]);
                //guardar nuevo ordenamiento en localstorage
                localStorage.setItem('sortBy', JSON.stringify([{
                  id: column.id,
                  desc
                }]));
                console.log(localStorage.getItem('sortBy'));
             
              }}

              >
                {column.render('Header')}
                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              } )}
            </tr>
            )}
          )}
      </tbody>
    </table>
    
    
  )
}

  export default Table;