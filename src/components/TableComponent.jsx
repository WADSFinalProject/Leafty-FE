import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'daisyui/dist/full.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import '../style/TableComponent.css';
import 'primeicons/primeicons.css';

function TableComponent({ data, header, columns, ColorConfig }) {
  const [globalFilter, setGlobalFilter] = useState('');

  const renderHeader = () => {
    return (
      <div className="flex flex-row justify-between m-0">
        <h3>{header}</h3>
        <div className="table-header-actions">
          <input
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search"
            className="input custom-input input-bordered gap-2 input-sm"
          />
          <Button icon="pi pi-filter" label="" className="p-button-secondary" />
        </div>
      </div>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-0"><Button icon="pi pi-ellipsis-h" className="p-button-warning" /></div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Details</a></li>
            <li><a>Edit</a></li>
            <li><a>Remove</a></li>
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
        <Column key="action" header="Action" body={actionTemplate} />
      </DataTable>
    </div>
  );
}

export default TableComponent;