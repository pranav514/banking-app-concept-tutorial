import React, { useEffect, useState } from 'react'
import { AppBar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
    const [balance , setBalance] = useState(0);
    const [id , setId] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance"  ,{
            headers : {
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        } ).then(response => {
            setBalance(response.data.balance);
            setId(response.data.userId)
        })
    } , [])
  return (
    <div>
        <AppBar />
        <Balance value = {balance} />
        <Button label={"Update"} onClick={() => {
            navigate(`/update/${id}`)
        }} />
        <Users />
    </div>
  )
}

export default Dashboard