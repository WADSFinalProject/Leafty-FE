import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'daisyui/dist/full.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import '../../style/TableComponent.css';
import 'primeicons/primeicons.css';

function TableComponent({ data, header, columns, ColorConfig }) {
  const [globalFilter, setGlobalFilter] = useState('');

  const renderHeader = () => {
    return (
      <div className="table-header">
        <h3>{header}</h3>
        <div className="table-header-actions">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Global Search"
              className="custom-input"
            />
          </span>
          <Button icon="pi pi-filter" label="Filter" className="p-button-secondary" />
        </div>
      </div>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <Button icon="pi pi-ellipsis-h" className="p-button-warning" />
    );
  };

  return (
    <div className="container mx-auto w-full p-4 ">
      <DataTable
        value={data}
        paginator
        rows={10}
        tableStyle={{ minWidth: '80rem' }}
        filters={columns}
        globalFilter={globalFilter}
        header={renderHeader()}
      >
        {columns.map((column, i) => (
          <Column key={i} field={column.field} header={column.header} sortable body={column.field === 'status' ? ColorConfig : null} />
        ))}
        <Column key="action" header="Action" sortable body={actionTemplate} />
      </DataTable>
    </div>
  );
}

export default TableComponent;