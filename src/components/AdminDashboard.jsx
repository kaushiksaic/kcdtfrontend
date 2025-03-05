import axios from 'axios'
import React, { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;
import { useSelector } from 'react-redux';

const AdminDashboard = () => {

 const [overviewData,setOverviewData] = useState([]);
 const [totalSum,setTotalSum] = useState('');
//  const { userid, usertype } = useSelector((store) => store.user);
const user = JSON.parse(localStorage.getItem("user") || "null");
const userid = user?.userid;
const usertype = user?.usertype;

 useEffect(() => {
  const handleAdminFetch = async () => {
    try {
      const res =  await axios.get(BASE_URL + "/japa/overview",{headers: {
        "x-userid": userid,
        "x-usertype": usertype
      },withCredentials: true})
      // console.log("API Response :",res.data)
      if(res.data) {
        setOverviewData(res.data.overview);
        setTotalSum(res.data.sum);
      }
    } catch(err) {
     console.error(err);
    }
  }
  handleAdminFetch();
 
 },[])






  return (
    <>
    <div className="card lg:card-side bg-base-100 shadow-xl mx-5 my-5">
  <div className="card-body">
    <h2 className="card-title">Overview</h2>
    <div className="overflow-x-auto">
  <table className="table table-xs">
    <thead>
      <tr>
        <th>UserID</th>
        <th>Mobile Number</th>
        <th>Name</th>
        <th>City</th>
        <th>Count</th>
        <th>PIN Number</th>
      </tr>
    </thead>
    <tbody>
      {overviewData.map((row) => (
        <tr key={row.userid}>
          <td>{row.userid}</td>
          <td>{row.mobilenum}</td>
          <td>{row.name}</td>
          <td>{row.city ? row.city : 'N/A'}</td>
          <td>{row.count}</td>
          <td>{row.pinnum}</td>
        </tr>
      ))}
    </tbody>
    
  </table>
</div>
<h4 className='font-bold text-3xl mt-2'>Total Count : {totalSum}</h4>
  </div>
</div>
    </>
  )
}

export default AdminDashboard