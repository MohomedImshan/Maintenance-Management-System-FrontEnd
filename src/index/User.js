import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './header'

function User() {
    const [users,setUsers] = useState([])

  useEffect(()=>{
    const fetchAllUsers = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/User")
        setUsers(res.data.users)
      }catch(err){
        console.log(err)
      }
    }
    fetchAllUsers()
  },[])

  return (
    
    <div>
     <Header />
      <div className='home'>

<table className='table table-striped'>
  <thead>
    <tr>
      <th scope='col'>User Name</th>
      <th scope='col'>Email</th>
      <th scope='col'>Position</th>
      <th scope='col'>Status</th>
      <th scope='col'>Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user)=>(
      <tr key={user.user_id}>
        <td>{user.user_name}</td>
        <td>{user.email}</td>
        <td>{user.position}</td>
        <td>{user.status}</td>
        <td>
          <button className='btn btn-success'><Link className='link-light link-opacity-10-hover link-underline link-underline-opacity-0' to={`/Update/${user.user_id}`}>Update</Link></button>
          <button className='btn btn-danger'>Delete</button>
          
        </td>

      </tr>
    ))}

  </tbody>

</table>

</div>
      
    </div>
    
  )
}

export default User
