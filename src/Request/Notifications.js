import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../index/header'
import { Link } from 'react-router-dom'

function Notifications() {


    const [Items,setItems] = useState([])

  useEffect(()=>{
    const fetchAllItems = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/Notifications")
        setItems(res.data.Items ||[])
      }catch(err){
        console.log(err)
      }
    }
    fetchAllItems()
  },[])
  return (
    <div>
         <Header />
        <div>
        
            <h1>Requests</h1>
          <div className='Requests'>

            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Department</th>
                  <th scope='col'>Machine Code</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Name of the Employee</th>
                  <th scope='col'>Date and Time</th>
                  <th scope='col'>Spare parts Requests</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {Items.length === 0 ?(
                    <tr>
                        <td colSpan='10'>Not available</td>
                    </tr>
                ):(
                Items.map((Item)=>(
                  <tr key={Item.id}>
                    <td>{Item.id}</td>
                    <td>{Item.machine_code}</td>
                    <td>{Item.department}</td>
                    <td>{Item.type}</td>
                    <td>{Item.description}</td>
                    <td>{Item.name_of_technician}</td>
                    <td>{Item.date_and_time}</td>
                    <td>{Item.requested_parts}</td>
                    <td>{Item.status}</td>
                    
                    <td>
                      <button className='btn btn-success'><Link className='link-light link-opacity-10-hover link-underline link-underline-opacity-0' >Update</Link></button>
                      
                      
                    </td>

                  </tr>
                ))
            )}

              </tbody>

            </table>

          </div>

          
        </div>
      
    </div>
  )
}

export default Notifications
