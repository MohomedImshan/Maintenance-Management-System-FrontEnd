    import React, { useEffect, useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import validation from '../login/RegistartionValidation'
    import axios from 'axios'

    const Update = ({id})=> {
        const [formData,setFormData] = useState({
            email:'',
            password:'',
            user_name:'',
            position:'',
            status:''

        })
    //     const [values,setValues]=useState({
    //         email:'',
    //         password:'',
    //         user_name:'',
    //         position:''
    //    })


        useEffect(()=>{
            axios.get(`http://localhost:8800/Update/${id}`)
            .then(res=>setFormData(res.data))
            .catch(err => console.error(err))
        },[id])
        const navigate = useNavigate()

    const handleInput = (event)=>{
        setFormData(prev=>({...prev,[event.target.name]:event.target.value}))
    }
    const [errors,setErrors] = useState({})

        const handleSubmit = (event)=>{

            event.preventDefault()

            const validationErrors = validation(formData)
            setErrors(validationErrors)
            if(Object.keys(validationErrors).length === 0 ){
                axios.put(`http://localhost:8800/Update/${id}`,formData)
                .then(() =>{
                    alert('Data updated successfuly')
                    navigate('/Home')
                })
                .catch(err =>console.error(err))
            }

    }

    return (
        <div>
        
        <form onSubmit={handleSubmit} className='form-01 '>
        <h1>Edit User Information</h1>
                    
                    <div className='mb-3'>
                        <label id='user_name'>User Name :</label>
                        <input type='text' name='user_name' onChange={handleInput} value={formData.user_name}  className='form-control' required />
                        {errors.user_name && <span className='text-danger' >{errors.user_name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label id='email'>E-Mail :</label>
                        <input type='email' name='email' onChange={handleInput} value={formData.email} placeholder='Enter email ' className='form-control'  required />
                        {errors.email && <span className='text-danger' >{errors.email}</span>}
                    </div>
                                
                    <div className='mb-3'>
                        <label id='password'>Passsword :</label>
                        <input type='password' name='password' onChange={handleInput} placeholder='Enter password' className='form-control'  required  />
                        {errors.password && <span className='text-danger' >{errors.password}</span>}
                    </div>

                    <div className='mb-3'>
                        <label id='position'>Position :</label>
                        <select className="form-select" name='position' onChange={handleInput} aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Assistant Engineer">Assistant Engineer</option>
                            <option value="Technician">Technician</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label id='status'>Status :</label>
                        <select className="form-select" name='status' onChange={handleInput} aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Disable">Disable</option>
                        </select>


                    </div>


                    <button type='submit' className='btn btn-success'>Update</button><br /><br />

                    
                </form>
        </div>
    )
    }

    export default Update
