import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css'
import validation from './RegistartionValidation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

    const [values,setValues]=useState({
        email:'',
        password:'',
        user_name:'',
        position:''
   })
    const navigate = useNavigate()

   const handleInput = (event)=>{
    setValues(prev=>({...prev,[event.target.name]:event.target.value}))
   }
   const [errors,setErrors] = useState({})


   const handleSubmit = (event)=>{

        event.preventDefault()

        const validationErrors = validation(values)
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0 ){
            axios.post("http://localhost:8800/register",values)
            .then(res =>{
                navigate('/')
            })
            .catch(err =>console.log(err))
        }

   }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='p-3 bg-white w-25 '>
            
            <form onSubmit={handleSubmit} className='form-01 '>
                <h1>Registration  Form</h1>

                <div className='mb-3'>
                    <label id='user_name'>User Name :</label>
                    <input type='text' name='user_name' onChange={handleInput} placeholder='Enter User name ' className='form-control' required />
                    {errors.user_name && <span className='text-danger' >{errors.user_name}</span>}
                </div>
                <div className='mb-3'>
                    <label id='email'>E-Mail :</label>
                    <input type='email' name='email' onChange={handleInput} placeholder='Enter email ' className='form-control'  required />
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


                <button type='submit' className='btn btn-success'>Register</button><br /><br />

                
            </form>
        </div>
    </div>
  )
}

export default Register
