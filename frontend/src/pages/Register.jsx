import React, { useState } from 'react'
import {Heading} from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import {  useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
function Register() {
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [firstname , setFirstname] = useState("");
  const [lastname , setLastName] = useState("");
  const navigate = useNavigate();
  return (
    <div className='bg-slate-400 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                  <Heading label = {'Register'} />
        <SubHeading label =  {"Enter The Information To Register Yourself"} />
        <InputBox label = {"Username"} placeholder={"enter the username"} onChange={(e) => {
          setUsername(e.target.value)
        }} />
        <InputBox label = {"Password"} placeholder={"enter the password"} onChange={(e) => {
          setPassword(e.target.value);
        }} />
        <InputBox label = {"FirstName"} placeholder={"enter the FirstName"} onChange={(e) => {
          setFirstname(e.target.value);
        }} />
        <InputBox label = {"LastName"} placeholder={"enter the LastName"} onChange={(e) => {
          setLastName(e.target.value);
        }} />
        <Button onClick={async () => {
          const res = await axios.post("http://localhost:3000/api/v1/user/register" , {
            username,
            password,
            firstname,
            lastname,
          })
          toast("Registration succesfully");
          navigate("/login")
        }} label={"Register"} />
        <BottomWarning label = {"Already have an account?"} buttonText={"login"} to={'/login'} /> 
        </div>

      </div>
        
      
        
    </div>
  )
}

export default Register