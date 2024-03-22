import React, { useEffect, useState } from 'react'
import { baseUrl, getSessionStorageRole } from '../layouts/sidebarItems';

const Employee = () => {
  const [employee,setEmployee] = useState([]);
  const token = getSessionStorageRole();
  console.log('token',token);
  useEffect(()=>{
    const getEmployee = async ()=>{
      let response = await fetch(baseUrl+`/employees/getEmployeeDetails/email/${token?.email}`);
      if(!response.ok){
        console.log('employees not responded properly');
        return
      }
      const data = await response.json();
      setEmployee(data?.data);
    }
    getEmployee();
  },[]);
console.log('employee',employee);
  return (
    <div>Employee</div>
  )
}

export default Employee;