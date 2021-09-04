import React from "react";
import showContent from "../script";
import axios from "axios"
import user from "../user";
import { useState } from "react";

export default function EmailInput(){
    const [email, setemail] = useState("")
    function handleSumbit(e){
        e.preventDefault();
        axios.post("/login",{email:email})
        .then(response => {updateUser(response.data[0].email)})
        .catch(error => console.log(error));
    }
    function updateUser(newUser){
        user.email = newUser;
        showContent()
    }
    function handleInputChange(e){
        setemail(e.target.value)
    }
    return(
        <div id="email-container" className="focus-container">
            <div>
                <form onSubmit={handleSumbit} action="" className="flex flex-col px-10">
                    <input onChange={handleInputChange} value={email} type="text" name="email" id="email" className="text-2xl py-4 rounded mb-5" />
                    <button className="text-2xl p-3 rounded w-full bg-purple-400" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}