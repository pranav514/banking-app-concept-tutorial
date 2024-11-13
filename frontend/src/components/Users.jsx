import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { isRouteErrorResponse, useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Users = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [users  , setUsers] = useState([]);
    useEffect( () => {
     axios.get(`http://localhost:3000/api/v1/user/search?filter=${searchTerm}` , {
        headers : {
            Authorization : 'Bearer ' + localStorage.getItem("token"),
        }
     }).then(response => {
        setUsers(response.data.user)
     })
    } , [searchTerm])


    return (
        <div className="p-4 max-w-md mx-auto">
            <div className="font-bold text-2xl mb-4">Users</div>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search users to send money"
                    className="w-full px-4 py-2 border rounded-lg shadow-sm border-slate-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="space-y-4 ">
                {users.map((user, index) => (
                    <User key={index} user={user} />
                ))}
                {users.length === 0 && (
                    <div className="text-center text-slate-500">No users found</div>
                )}
            </div>
        </div>
    );
}

function User({ user }) {

    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-blue-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                    {user.firstName[0]}{user.lastName[0]}
                </div>
                <div className="text-lg font-medium">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            
            <Button onClick={(e) => {
               navigate("/send?id=" + user._id + "&name=" + user.firstName) 
            }} label="Send Money" className= "text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors" />
        </div>
    );
}

export default Users;
