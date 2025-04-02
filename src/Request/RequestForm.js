import React, { useState } from 'react'
import Header from '../index/header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Modal , Button ,Form} from 'react-bootstrap'

function Requests({id}) {
const [items,setItems]=useState([''])

const [showModal,setShowModal]=useState(false)
const [newItem,setNewItem]= useState('')
const [newQuantity,setNewQuantity]= useState('')
const [newId,setNewId]= useState('')
const [values,setValues] = useState({})



    const navigate = useNavigate()
    // const [errors,setErrors] = useState({})



    const handleSubmit = (event)=>{
        event.preventDefault()

        const requestData = {
            ...values,spare_parts:items,
        }
        if(Object.keys(values).length === 0 ){
            axios.post(`http://localhost:8800/request/${id}`,requestData)
            .then(res =>{
                navigate('/request')
            })
            .catch(err =>console.log(err))
        }

    }

    const handleInput = (event) =>{
        setValues(prev=>({...prev,[event.target.name]:event.target.value}))
    }
    const handleInputChange = (index,value)=>{
        const updatedItems = [...items]
        updatedItems[index] = value
        setItems(updatedItems)
    }

    const handleAddItem = ()=>{
        if(newId.trim() && newItem.trim() && newQuantity.trim()){
            setItems([...items,{id:newId,name:newItem,quantity:newQuantity}])
            setNewId('')
            setNewItem('')
            setNewQuantity('')
            setShowModal(false)
        }
    }
  return (
    <div>
      <Header />

      <div className='d-flex vh-10 justify-content-center align-items-center'>
        <div className='p-3 bg-white w-25 '>
            
            <form onSubmit={handleSubmit} className='form-01' >
                                    <h1>Requests Form</h1><br />
                        
                            <div className="form-group ">
                            <label >Machine Code : </label>
                            <input type="text" className="form-control" name="machine_code" onChange={handleInput} placeholder='00000' />
                            </div>
                            <div className="form-group ">
                            <label >Department</label>
                            <select name="department" onChange={handleInput} className="form-control" value={values.department || ""}>
                                <option value="" disabled>Select Department</option>
                                <option value='Machanical'>Machanical</option>
                                <option value='Electrical'>Electrical</option>
                                <option value='Genaral'>Genaral</option>
                                <option value='Other'>Other</option>
                            </select>
                            </div>
                        
                        <div className="form-group">
                            <label >Type</label>
                            <input type="text" name='type' onChange={handleInput} className="form-control" id="type" placeholder="Enter type ..." />
                        </div>
                        <div className="form-group">
                            <label >Description</label>
                            <input type="text" name='description' onChange={handleInput} className="form-control" id="description" placeholder="Details about the issue..." />
                        </div>
                            {items.map((item,index)=>(
                                 <div key={index} className="form-group d-flex align-items-center">
                                 <label className='w-50'>Spare Part {index+1} :</label>
                                 <input type="text" className="form-control w-75" 
                                 id={`item-${index}`}
                                 value={item.id}
                                 onChange={(e)=>handleInputChange(index,"id",e.target.value)}
                                 required />
                                 <input type="text" className="form-control w-75" 
                                 id={`item-${index}`}
                                 value={item.name}
                                 onChange={(e)=>handleInputChange(index,"name",e.target.value)}
                                 required />
                                  <input type="number" className="form-control w-25" 
                                 id={`item-${index}`}
                                 value={item.quantity}
                                 onChange={(e)=>handleInputChange(index,"quantity",e.target.value)}
                                 required />
                                 </div>
                            ))}
                            <button className="btn btn-success my-2" 
                            onClick={()=>setShowModal(true)}
                            >+Add Spare Parts</button>
                           
                                
                            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Spare Part</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group>
                                    <Form.Label>Spare Parts Name</Form.Label>
                                        <Form.Control type='text'
                                        placeholder="Enter the parts id"
                                        value={newId}
                                        onChange={(e)=>setNewId(e.target.value)}
                                        />
                                        <Form.Label>Spare Parts Name</Form.Label>
                                        <Form.Control type='text'
                                        placeholder="Enter the parts name"
                                        value={newItem}
                                        onChange={(e)=>setNewItem(e.target.value)}
                                        />
                                         <Form.Control type='number'
                                        placeholder="Add quantity"
                                        value={newQuantity}
                                        onChange={(e)=>setNewQuantity(e.target.value)}
                                        />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={()=>setShowModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="success" onClick={handleAddItem}>
                                        Add Spare Part
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                      <br />
                        <button type="submit" className="btn btn-primary">Send Request</button>

             
                

                
            </form>
        </div>
    </div>

    </div>
  )
}

export default Requests
