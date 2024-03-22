import React, { useEffect, useState } from 'react'
import ViewEmployeeTable from './ViewEmployeeTable';
import { columns } from './principalRough';
import { baseUrl, getToken } from '../layouts/sidebarItems';
    const ViewEmployees = () => {
    const [employeeData,setEmployeeData] = useState([]);
    const getData = async ()=>{
        const response = await fetch(baseUrl+'/employees/allEmployees',{
          method:'GET',
          headers:{
              'Content-Type':'application/json',
              'authorization':`Bearer ${getToken()}`
          },
      });
        const data = await response.json();
        if(response.ok){
            setEmployeeData(data.data)
        }
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <>
    <div>ViewEmployees</div>
   <ViewEmployeeTable columns={columns} rows={employeeData}/>
    </>
  )
}

export default ViewEmployees;