// import React from 'react'

// import { useTable } from 'react-table'
 
// export default function Salarios() {
//    const data = React.useMemo(
//      () => [
//        {
//          col1: 'Hello',
//          col2: 'World',
//        },
//        {
//          col1: 'react-table',
//          col2: 'rocks',
//        },
//        {
//          col1: 'whatever',
//          col2: 'you want',
//        },
//      ],
//      []
//    )
 
//    const columns = React.useMemo(
//      () => [
//        {
//          Header: 'Column 1',
//          accessor: 'col1', // accessor is the "key" in the data
//        },
//        {
//          Header: 'Column 2',
//          accessor: 'col2',
//        },
//      ],
//      []
//    )
 
//    const {
//      getTableProps,
//      getTableBodyProps,
//      headerGroups,
//      rows,
//      prepareRow,
//      //@ts-ignore
//    } = useTable({ columns, data })
 
//    return (
//      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
//        <thead>
//          {headerGroups.map(headerGroup => (
//            <tr {...headerGroup.getHeaderGroupProps()}>
//              {headerGroup.headers.map((column, index) => (
//                <th
//                  {...column.getHeaderProps()}
//                  style={{
//                    borderBottom: 'solid 3px red',
//                    background: 'aliceblue',
//                    color: 'black',
//                    fontWeight: 'bold',
//                  }}
//                >
//                  {column.render('Header')}
//                </th>
//              ))}
//            </tr>
//          ))}
//        </thead>
//        <tbody {...getTableBodyProps()}>
//          {rows.map(row => {
//            prepareRow(row)
//            return (
//              <tr {...row.getRowProps()}>
//                {row.cells.map(cell => {
//                  return (
//                    <td id={cell.column.id}
//                      {...cell.getCellProps()}
//                      style={{
//                        padding: '10px',
//                        border: 'solid 1px gray',
//                        background: 'papayawhip',
//                      }}
//                    >
//                      {cell.render('Cell')}
//                    </td>
//                  )
//                })}
//              </tr>
//            )
//          })}
//        </tbody>
//      </table>
//    )
//  }

/* eslint-disable react/prop-types */
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import './styles.scss';

export const DatosOcultos = () => (
  <>
    &bull;&bull;&bull;&bull;
  </>
);

const salarios =[
    {
        id: 1,
        nombre: 'Juan',
        apellido: 'Perez',
        salario: '$1,000,000',
        fecha: '01/01/2020',
        puesto: 'Developer',
        estado: 'Activo',
    }
]

export const Salarios = ({ salarios, mostrarSalarios }: any) => {
  const rolSeleccionado = salarios.filter((salario: any) => salario.estado === 'Activo');
  const senioritySeleccionado = salarios.filter((salario: any) => salario.estado === 'Activo');

  const realizarFiltrado = (persona: any) => {
    if (rolSeleccionado === 'Todos' && senioritySeleccionado === 'Todos') {
      return persona;
    }
    if (rolSeleccionado !== 'Todos' && senioritySeleccionado === 'Todos') {
      return persona.puesto === rolSeleccionado;
    }
    if (rolSeleccionado === 'Todos' && senioritySeleccionado !== 'Todos') {
      return persona.seniority === senioritySeleccionado;
    }
    return persona.seniority === senioritySeleccionado && persona.puesto === rolSeleccionado;
  };
  const result = salarios?.filter(realizarFiltrado);
  // TODO conectar servicio bandas para eliminar harcodeo

  const minBanda = 130000;
  const maxBanda = 300000;

  const data: any = React.useMemo(() => salarios, [salarios, rolSeleccionado, senioritySeleccionado]);
  const columns: any = React.useMemo(
    () => [
      {
        Header: 'Fluxer',
        accessor: 'nombre',
        isSortable: true,
        Cell: ({ row }: { row: any }) => (
          <div className="who">
            <h5>
              {row.original.nombre}
              {' '}
              {row.original.apellido}
            </h5>
          </div>
        ),
      },
      {
        Header: 'Rol',
        accessor: 'puesto',
        isSortable: true,
        Cell: ({ row }: { row: any }) => (
          <div>
            {row.original.puesto}
          </div>
        ),
      },
      {
        Header: 'Seniority',
        accessor: 'seniority',
        isSortable: true,
        Cell: ({ row }: { row: any }) => (
          <div className="nowrap">
            {row.original.seniority}
          </div>
        ),
      },
      {
        Header: '',
        accessor: 'banda',
        isSortable: false,
        Cell: ({ row }: { row: any }) => (
          <div className="bandasSalario">
            {
               mostrarSalarios
                 ? (
                   <div id={`popover-${row.original.nroLegajo}`} className="graph" key={row.original.nroLegajo}>
                     <div id={`tooltip-${row.original.nroLegajo}`} role="tooltip">
                       Salario Bruto:
                       <strong>
                         $
                         {row.original.salarioActual}
                       </strong>
                       {' '}
                       Compa-ratio :
                       <strong>
                         {row.original.nroLegajo}
                         %
                       </strong>

                     </div>
                     <span
                       className={row.original.salarioActual < minBanda ? 'min alert' : 'min ok'}
                     >
                      
                     </span>
                     <meter
                       className={row.original.salarioActual < minBanda
                         ? 'tope tope-min'
                         : row.original.salarioActual > maxBanda
                           ? 'tope-max'
                           : 'mix'}
                       min={minBanda}
                       high={minBanda}
                       max={maxBanda}
                       value={row.original.salarioActual}
                     />
                     <span
                       className={row.original.salarioActual < maxBanda && row.original.salarioActual > minBanda
                         ? 'max ok'
                         : row.original.salarioActual > maxBanda
                           ? 'max alert'
                           : 'max'}
                     >
                    
                     </span>

                   </div>
                 )
                 : <DatosOcultos />
             }
          </div>
        ),
      },

    ],
    [mostrarSalarios],
  );

  const tableinstance = useTable({
    columns:columns,
    data:data
    },useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

  } = useTable({ columns, data,  }, useSortBy);

  const emptyStateImage = `${process.env.PUBLIC_URL}/assets/img/EmptyState-salarios.svg`;
  const message : string = 'No hay fluxers en tu equipo con ese rol y seniority.\n Probá una nueva búsqueda';

  return (
    data.length === 0 ? (
      <div className="emptyState">
       kay console.error(message);
       
      </div>
    )
      : (
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="nowrap"
                  >
                    {column.render('Header')}
                   
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell : any) => (
                    <td
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )
  );
};