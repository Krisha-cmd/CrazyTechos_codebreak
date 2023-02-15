import React, { useState } from "react"

export const login =()=> {
    const [email,setEmail]=usestate('');
    const [pass,setPass]=usestate('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(email);

    }
    return(
        
        <form onSubmit={handleSubmit}>
			<label for="email">Email</label>
			<input value="email" type="email" id="email" name="email" placeholder="abc@example.com" required>
			<label for="password">Password</label>
			<input value="pass" type="password" id="password" name="password" required>
			<button type="submit">Login</button>
        </form>
        <div id="toggle-login">Don't have an account? Sign up</div>
    )
}