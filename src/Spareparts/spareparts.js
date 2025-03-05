import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../index/header'

function Spareparts() {

    const [Items,setItems] = useState([])

  useEffect(()=>{
    const fetchAllItems = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/Spareparts")
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
        
            <h1>Spare Parts</h1>
          <div className='spare-parts'>

            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Catagory</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Item Name</th>
                  <th scope='col'>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Items.length === 0 ?(
                    <tr>
                        <td colSpan='5'>Not available</td>
                    </tr>
                ):(
                Items.map((Item)=>(
                  <tr key={Item.id}>
                    <td>{Item.id}</td>
                    <td>{Item.catagory}</td>
                    <td>{Item.type}</td>
                    <td>{Item.item}</td>
                    <td>{Item.quantity}</td>
                    
                    <td>
                      <button className='btn btn-success'><Link className='link-light link-opacity-10-hover link-underline link-underline-opacity-0' >Update</Link></button>
                      <button className='btn btn-danger'>Delete</button>
                      
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

export default Spareparts
