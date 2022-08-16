import React from 'react'
import { useRowState, useSortBy } from 'react-table';
import Table from './Table';

export default function Salarios() {

  //persist the state of the table on the client side


  const data = React.useMemo(()=>[{    
      "id": 1,
      "name": "Juan",
      "surname": "Perez",
      'age': 30,
    },
    {
      "id": 2,
      "name":"Rolando",
      "surname": "Alvarez",
      'age': 25,
    },
    {
      "id": 3,
      "name": 'Lu',
      "surname": "Perez",
      'age': 20,
    }
  ], []);

  const columns = React.useMemo(()=>[
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Surname',
      accessor: 'surname',
    },
    {
      Header: 'Age',
      accessor: 'age',
      isSortable: true,
      
    },
  ], []);

  return (
    <>
    <div>Salarios</div>

    <Table columns={columns} data={data} sortBy ={[]} />
    </>


  )
}