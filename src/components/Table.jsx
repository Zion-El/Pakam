import React, {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const columns = [
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'description', headerName: 'Description', width: 400 },
  { field: 'quantity', headerName: 'Quantity', width: 200 },
];



export default function DataTable() {

    const [data, setData] = useState([
        {
            id: 1,
            name: '',
            description:"",
            quantity:""
        }
      ])
    
    
      useEffect(() => {
        fetchData()
    
      }, [])

      const fetchData = () =>{
        const productList = localStorage.getItem('productList')
        if (productList.length > 0){
          setData(JSON.parse(productList))      
        }
      }

    const rows = data

    let nextId = 1;

    const listWithIds = rows.map((item) => {
    const newItem = { ...item, id: nextId };
    nextId++;
    return newItem;
    });

  return (
    <div style={{ height: 400, width: '100%' }}>
        <div className='flex justify-between items-center w-full '>
            <div className='flex gap-3' onClick={fetchData}>
                <RefreshIcon  color='#464F54' size={10}/>
                <span className='text-[Raleway] text-[14px] font-[400] text-[#464F54]'>Refresh</span>
            </div>

            <div className='flex gap-4'>
                <span className='text-[Raleway] text-[14px] font-[400] text-[#464F54]'>0 of 0</span>
                <div className='flex gap-3'>
                    <div><ChevronLeftIcon/></div>
                    <div><ChevronRightIcon/></div>
                </div>

                

            </div>
        </div>
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