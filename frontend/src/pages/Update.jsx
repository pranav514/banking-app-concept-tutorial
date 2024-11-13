import React, { useState  } from 'react'
import { useParams } from 'react-router-dom'
import {Heading} from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
function Update() {
  const [password , setPassword] = useState("");
  const [firstname , setFirstname] = useState("");
  const [lastname , setLastName] = useState("");
  const { id } = useParams()
  const navigate = useNavigate();
  return (
    <div className='bg-slate-400 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                  <Heading label = {'Update'} />
        <SubHeading label =  {"Update your information"} />
        <InputBox label = {"Password"} placeholder={"enter the password"} onChange={(e) => {
          setPassword(e.target.value);
        }} />
        <InputBox label = {"FirstName"} placeholder={"enter the FirstName"} onChange={(e) => {
          setFirstname(e.target.value);
        }} />
        <InputBox label = {"LastName"} placeholder={"enter the LastName"} onChange={(e) => {
          setLastName(e.target.value);
        }} />
        <Button onClick={async() => {
          const res = await axios.put(`http://localhost:3000/api/v1/user/update/${id}` , {
            password : password,
            firstname : firstname,
            lastname :lastname
          } , {
            headers : {
              Authorization : "Bearer " + localStorage.getItem("token"),
            }
          }) 
          localStorage.setItem("firstname" , res.data.firstname)
          navigate("/dashboard")
        }} label={"Register"} />
        </div>

      </div>
        
      
        
    </div>
  )
}

export default Update