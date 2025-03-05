import React, { useState }  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import validation  from './LoginValidation'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'



function Login() {

   const [values,setValues]=useState({
        email:'',
        password:''
   })
    
   const handleInput = (event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
   }
   const [errors,setErrors] = useState({})



   const navigate = useNavigate()
   const handleSubmit = (event)=>{
        event.preventDefault()

        const validationErrors = validation(values)
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0 ){
            axios.post("http://localhost:8800/login",values)
            .then(res =>{
                if(res.data === "Success"){
                    navigate("/Home")
                }else{
                    alert("No record existed")
                }
            })
            .catch(err =>console.log(err))
        }
   }
    
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='p-3 bg-white w-25 '>
            
            <form  onSubmit={handleSubmit} className='form-01'>
                <h1>Login Form</h1>

                

                <div className='mb-3'>
                    <label id='email'>E-Mail :</label>
                    <input type='email' placeholder='Enter email ' 
                    name='email'
                    onChange={handleInput}
                    className='form-control' />
                    {errors.email && <span className='text-danger' >{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label id='password'>Passsword :</label>
                    <input type='password' placeholder='Enter password' 
                    name='password' onChange={handleInput}
                    className='form-control'  />
                    {errors.password && <span className='text-danger' >{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success'>Login</button><br /><br />

                <p>Didn't have an Account:<button className='btn btn-light'><Link to={"/Register"}>Register</Link></button> </p>
            </form>
        </div>
    </div>
  )
}

export default Login
