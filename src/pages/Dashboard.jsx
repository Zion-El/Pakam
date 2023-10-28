import React, {useState, useEffect} from 'react'
import SideBar from '../components/SideBar'
import { Typography } from '@mui/material'
import DataTable from '../components/Table'
import CreateModal from '../components/Modal'
import ResponsiveDrawer from '../components/SideBar'

const Dashboard = () => {
  const [data, setData] = useState([
    {
        id: 1,
        name: '',
        description:"",
        quantity:""
    }
  ])


  useEffect(() => {
    const productList = localStorage.getItem('productList')
    if (productList.length > 0){
      setData(JSON.parse(productList))      
    }

  }, [data])

  return (
    <>
    <SideBar>
        <Typography variant='h4'>
            Assessment
        </Typography>

        <div  className='w-full flex justify-end'>
          <CreateModal/>          
        </div>


        <div className='bg-[#fff] p-2 overflow-x-scroll'>
            <DataTable list={data}/>
        </div>
        
    </SideBar>
      
    </>
  )
}

export default Dashboard
