import React, { useEffect, useState } from 'react'
import Header from '../index/header'
import './css/Engineerdashboardcss.css'
import axios from 'axios'
import { Modal,Button,Form } from 'react-bootstrap'


function EngineerDashboard() {


  const [works,setWorks] = useState([])

  useEffect(()=>{
    const fetchAllIWorks = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/Engineer")
        setWorks(res.data.works || [])
      }catch(err){
        console.error(err)
      }
    }
    fetchAllIWorks()
  },[])

  const handleAccept = () =>{
    if()
  }
  
  return (
    <div>
      <div>
        <Header />
        <div className='div-00'>
            <div className='div-01'>
              
                <table className='table table-striped'>
                  <thead>
                    <tr>
                        <th scope='col'>Word ID</th>
                        <th scope='col'>Department</th>
                        <th scope='col'>Machine Code</th>
                        <th scope='col'>Action</th>
                    </tr>
                    </thead>
                    
                   <tbody>
                    {works.length === 0 ? (
                      <tr>
                        <td colSpan="4">Not available</td>
                      </tr>
                    ):(
                      works.map((work)=>(
                        <tr key={work.id}>
                            <td>{work.id}</td>
                            <td>{work.department}</td>
                            <td>{work.machine_code}</td>
                            <td>
                              <button className='btn btn-success' onClick={()=>setShwoModal(true)}>Edit</button>
                            <Modal show={showModal} onHide={()=>setShwoModal(false)}>
                              <Modal.Header>
                                <Modal.Title>Edit Request</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form.Group>
                                  <Form.Lable>
                                    Required spare parts
                                  </Form.Lable>
                                  <Form.Control type='text' value={work.requested_parts}></Form.Control>

                                </Form.Group>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant='secondary' onClick={()=>setShwoModal(false)}>Cancle</Button>
                                <Button variant='success' onClick={handleAccept}>Accept</Button>
                              </Modal.Footer>

                            </Modal>


                            </td>
                        </tr>
                      ))
                    )}
                   </tbody>
                </table>
            </div>
            <div className='div-02'>
            <table>
                   
                </table>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default EngineerDashboard
