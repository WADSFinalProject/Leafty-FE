import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'daisyui/dist/full.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import '../style/TableComponent.css';
import 'primeicons/primeicons.css';
import InputField from './InputField';
import { Input } from 'postcss';
import search from "../assets/SearchLogo.svg"
import filterDashboard from './filterDashboard';
import filter from "../assets/icons/filter.svg";
import plus from "../assets/Plus.svg";


function TableComponent({ data, header, columns, ColorConfig, admin = false }) {
  const [globalFilter, setGlobalFilter] = useState('');

  const renderHeader = (admin) => {
    return (
      <div className="flex flex-row justify-between m-0 items-center">
        <h3>{header}</h3>
        <div className="table-header-actions flex flex-row gap-4 items-center justify-center">
          <label className="input input-bordered flex items-center gap-2 input-md ">
            <img src={search} className="w-4 h-4"></img>
            <input type={"search"} className="grow" placeholder={"Search"} onChange={(e) => setGlobalFilter(e.target.value)} value={globalFilter} />
          </label>
          {/* <input
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search"
              className="input input-bordered gap-2 input-sm"
            /> */}
          <button className='btn' style = {{background: "#94C3B3"}}><img src={filter}></img></button>
          {admin ? <button className='btn' style = {{background: "#94C3B3"}}><img src={plus}></img></button> : <></>}
        </div>
      </div>
    );
  };

  const actionTemplate = (admin) => {
    return (
      <>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-0"><Button icon="pi pi-ellipsis-h" className="p-button-warning" /></div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Details</a></li>
            {admin ? <><li><a>Edit</a></li><li><a>Remove</a></li></>: <></>}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className="container w-full">
      <DataTable
        value={data}
        paginator
        rows={10}
        tableStyle={{ minWidth: '65rem' }}
        filters={columns}
        globalFilter={globalFilter}
        header={renderHeader()}
      >
        {columns.map((column, i) => (
          <Column key={i} field={column.field} header={column.header} sortable body={column.field === 'status' ? ColorConfig : null} />
        ))}
        <Column key="action" header="Action" body={actionTemplate(admin)} />
      </DataTable>
    </div>
  );
}

export default TableComponent;