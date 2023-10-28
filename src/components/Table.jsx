import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'description', headerName: 'Description', width: 400 },
  { field: 'quantity', headerName: 'Quantity', width: 200 },
];



export default function DataTable(list) {

    const rows = list.list

    let nextId = 1;

    const listWithIds = rows.map((item) => {
    const newItem = { ...item, id: nextId };
    nextId++;
    return newItem;
    });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={listWithIds}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}