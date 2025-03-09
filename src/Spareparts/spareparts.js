import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../index/header'
import {Modal,Form,Button} from 'react-bootstrap'


function Spareparts() {
  
  const [Items,setItems]=useState([])
  const [showModal,setShowModal]=useState(false)
  const [newDepartment,setNewDepartment]= useState('')
  const [newItemName,setNewItemName] = useState('')
  const [newItemType,setNewItemType] = useState('')
  const [newQuantity,setNewQuantity] = useState('')

  

  


  useEffect(()=>{
    const fetchAllItems = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/Spareparts")
        setItems(res.data.spareParts )
      }catch(err){
        console.log(err)
      }
    }
    fetchAllItems()
  },[])

  const handleAddItem = async ()=>{
    if(newDepartment && newItemName && newItemType&& newQuantity){

      const newItem = {
        
        department:newDepartment,
        type:newItemType,
        item:newItemName,
        quantity:newQuantity
      }
      try{
        await axios.post('http://localhost:8800/Spareparts',newItem)
        setItems([...Items,newItem])
        setShowModal(false)
        setNewDepartment('')
        setNewItemType('')
        setNewItemName('')
        setNewQuantity('')
      }catch(err){
        console.error('Error adding new item :',err)
      }
      
    } else{
      console.log("Please fill all fields");
    }
  }

  return (
    <div>
        
        <div>
        <Header />
            <h1>Spare Parts</h1>

            <button className="btn btn-success my-2" 
                            onClick={()=>setShowModal(true)}
                            >Add Spare Part</button>
                           
                                
                            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Spare Part</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group>
                                    <Form.Label>Catagory</Form.Label>
                                        
                                    <Form.Select value={newDepartment} id='department'
                                    onChange={(e)=>setNewDepartment(e.target.value)}
                                    >
                                      <option value="" disabled>Select Catagory</option>
                                      <option value="Machanical">Machanical</option>
                                      <option value="Electrical">Electrical</option>
                                      <option value="Genaral">Genaral</option>
                                      <option value="Other">Other</option>
                                      
                                      </Form.Select>    


                                        <Form.Label>Type</Form.Label>
                                        <Form.Control type='text'
                                        placeholder="Enter the Type "
                                        value={newItemType}
                                        onChange={(e)=>setNewItemType(e.target.value)}
                                        />
                                      <Form.Label>Item</Form.Label>
                                        <Form.Control type='text'
                                        placeholder="Enter the Item "
                                        value={newItemName}
                                        onChange={(e)=>setNewItemName(e.target.value)}
                                        />

                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control type='number'
                                        placeholder="Enter the Quantity "
                                        value={newQuantity}
                                        onChange={(e)=>setNewQuantity(e.target.value)}
                                        />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={()=>setShowModal(false)}>
                                        Cancle
                                    </Button>
                                    <Button variant="success" onClick={handleAddItem}>
                                        Add Spare Part
                                    </Button>
                                </Modal.Footer>
                            </Modal>

          <div className='spare-parts'>

            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>Department</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Item Name</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Action</th>

                </tr>
              </thead>
              <tbody>
                {Items.length === 0 ? (
                    <tr>
                        <td colSpan='5'>Not available</td>
                    </tr>
                ) : (
                Items.map((Item)=>(
                  <tr key={Item.id}>
                    <td>{Item.id}</td>
                    <td>{Item.department}</td>
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
