import React, {useState, useEffect} from 'react'
import SideBar from '../components/SideBar'
import { Typography } from '@mui/material'
import DataTable from '../components/Table'
import CreateModal from '../components/Modal'
import ResponsiveDrawer from '../components/SideBar'

const Dashboard = () => {
  
  return (
    <>
    <SideBar>
        <Typography sx={{fontSize:24, fontWeight:700, fontFamily: "Raleway"}}  variant='h4'>
            Assessment
        </Typography>

        <div  className='w-full flex justify-end'>
          <CreateModal/>          
        </div>


        <div className='bg-[#fff] p-2 overflow-x-scroll'>
            <DataTable/>
        </div>
        
    </SideBar>
      
    </>
  )
}

export default Dashboard
