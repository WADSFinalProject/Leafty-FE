import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import 'daisyui/dist/full.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import '../../style/TableComponent.css';
import 'primeicons/primeicons.css';
import search from "../../assets/SearchLogo.svg";
import filter from "../../assets/icons/filter.svg";
import plus from "../../assets/Plus.svg";
import Popup from '@components/Popups/Popup';

function TableComponent({
  data,
  header,
  columns,
  ColorConfig,
  admin = false,
  rows = 10,
  paginator = true,
  depends = 'status',
  onDetailsClick,
  onEditClick,
  onDelete,
  showSearch = true,
  showFilter = true,
  widihmin = '65rem',
  action = true,
  totalRecords,
  currentPage,
  onPageChange
}) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRowForDeletion, setSelectedRowForDeletion] = useState(null);

  const renderHeader = () => (
    <div className="flex flex-row justify-between m-0 items-center">
      <h3>{header}</h3>
      <div className="table-header-actions flex flex-row gap-4 items-center justify-center">
        {showSearch && (
          <label className="input input-bordered flex items-center gap-2 input-md">
            <img src={search} className="w-4 h-4" alt="search" />
            <input
              type="search"
              className="grow"
              placeholder="Search"
              onChange={(e) => setGlobalFilter(e.target.value)}
              value={globalFilter}
            />
          </label>
        )}
      </div>
    </div>
  );

  const handleDeleteClick = (rowData) => {
    setSelectedRowForDeletion(rowData);
  };

  const actionTemplate = (rowData) => (
    <div className="relative">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="m-0">
          <Button icon="pi pi-ellipsis-h" className="p-button-warning" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50 absolute"
        >
          <li tabIndex={2}>
            <a onClick={() => onDetailsClick(rowData)}>Details</a>
          </li>
          {admin && (
            <>
              <li tabIndex={3}>
                <a onClick={() => onEditClick(rowData)}>Edit</a>
              </li>
              <li tabIndex={4}>
                <a onClick={() => handleDeleteClick(rowData)}>Remove</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container">
      <DataTable
        value={data}
        tableStyle={{ minWidth: widihmin }}
        globalFilter={globalFilter}
        header={renderHeader()}
        size="large"
      >
        {columns.map((column, i) => (
          <Column
            key={i}
            field={column.field}
            header={column.header}
            sortable
            body={column.field === depends ? ColorConfig : null}
          />
        ))}
        {action && <Column key="action" header="Action" body={actionTemplate} />}
      </DataTable>
      <Paginator
        first={(currentPage - 1) * rows}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={(e) => onPageChange(e.page + 1)}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
      <Popup
        warning
        leavesid="delete-confirm-popup"
        description="Are you sure you want to delete this item?"
        confirm
        onConfirm={() => onDelete(selectedRowForDeletion?.userid)}
        onCancel={() => setSelectedRowForDeletion(null)}
      />
    </div>
  );
}

export default TableComponent;