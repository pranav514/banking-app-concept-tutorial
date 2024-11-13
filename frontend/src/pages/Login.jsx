import React, { useState } from 'react'
import {Heading} from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const  navigate = useNavigate();
    return (
        <div className='bg-slate-400 h-screen flex justify-center'>
          <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                      <Heading label = {'Login'} />
            <SubHeading label =  {"Enter The Information To Login Yourself"} />
            <InputBox label = {"Username"} placeholder={"enter the username"} onChange={(e) => {
                setUsername(e.target.value);
            }} />
            <InputBox label = {"Password"} placeholder={"enter the password"} onChange={(e) => {
                setPassword(e.target.value);
            }} />
            <Button onClick={async () => {
                const res = await  axios.post("http://localhost:3000/api/v1/user/login" , {
                    username : username ,
                    password : password
                })
                localStorage.setItem("token" , res.data.token)
                localStorage.setItem("firstname" , res.data.firstname)
                navigate("/dashboard")
            }} label={"Login"} />
            <BottomWarning label = {"Don't have an account?"} buttonText={"Register"} to={'/register'} /> 
            </div>
    
          </div>
            
          
            
        </div>
      )
}

export default Login