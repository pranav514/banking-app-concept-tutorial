import axios from "axios"
// import { modelNames } from "mongoose";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
export const SendMoney = () => {
    const [searchParams]  = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount , setAmount] = useState(0);
    const [loading , setloading] = useState(true);
    return (
        
        <div class="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span class="text-2xl text-white">
                                {name[0]}
                            </span>

                        </div>
                        <h3 class="text-2xl font-semibold">{name}</h3>

                    </div>
                    <div class="space-y-4">
                        <div className="space-y-2">
                   <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount" >
                            Amount (is Rs)

                   </label>
                   <input
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />
                        </div>
                        <button onClick={() => {
                            axios.post("http://localhost:3000/api/v1/account/transfer" ,{
                                to : id,
                                amount
                            }, {
                                headers:{
                                    Authorization : "Bearer " + localStorage.getItem("token")
                                }
                            }
                        )
                        setloading(false);
                        }}  class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            {loading ? "Transfer Money": "Transfer sucessfull"  }
                        </button>

                    </div>
                </div>
            </div>
            
        </div>
    )
}