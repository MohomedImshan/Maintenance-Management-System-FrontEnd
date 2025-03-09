import React, { useState }  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import validation  from './LoginValidation'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'



const Login=({setUser}) => {

   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
   const [errors,setErrors] = useState('')
   const navigate = useNavigate()

    
   

//    const handleSubmit = (event)=>{
//         event.preventDefault()

//         const validationErrors = validation(values)
//         setErrors(validationErrors)
//         if(Object.keys(validationErrors).length === 0 ){
//             axios.post("http://localhost:8800/login",values)
//             .then(res =>{
//                 if(res.data === "Success"){
//                     navigate("/Home")
//                 }else{
//                     alert("No record existed")
//                 }
//             })
//             .catch(err =>console.log(err))
//         }
//    }


    const handleLogin = async ()=>{
        try{
            const response = await axios.post('http://localhost:8800/api/login',{email,password})
            const {position,user_name} = response.data

            setUser({user_name,position})

            if(position === 'Admin') navigate('/Admin')
            else if(position === 'Engineer') navigate('/Engineer')
            else if(position === 'Asisstent Engineer') navigate('/Assistent-Engineer')
            else if(position === 'Technician') navigate('/Technician')
            else setErrors('Invalid role received from server')

        }catch(err){
            setErrors("Invalid email or password")
        }
    }
    
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='p-3 bg-white w-25 '>
            
            <form className='form-01'>
                <h1>Login Form</h1>

                {errors && <p className='text-red-500 mb-4'>{errors}</p>}

                <div className='mb-3'>
                    <label id='email'>E-Mail :</label>
                    <input type='email' placeholder='Enter email ' 
                    name='email'
                    onChange={(e)=>setEmail(e.target.value)}
                    className='form-control' 
                    required />
                    {errors.email && <span className='text-danger' >{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label id='password'>Passsword :</label>
                    <input type='password' placeholder='Enter password' 
                    name='password' onChange={(e)=>setPassword(e.target.value)}
                    className='form-control'  />
                    {errors.password && <span className='text-danger' >{errors.password}</span>}
                </div>
                <button onClick={handleLogin}  className='btn btn-success' disabled={!email ||!password} >Login</button><br /><br />

                <p>Didn't have an Account:<button className='btn btn-light'><Link to={"/Register"}>Register</Link></button> </p>
            </form>
        </div>
    </div>
  )
}

export default Login
