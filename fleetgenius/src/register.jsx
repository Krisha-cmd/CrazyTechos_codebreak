import React, { useState } from "react"

export const Register=(props)=>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} type="name" id="name" name="name" required />
                <label htmlFor="email">Email</label>
                <input value={email} type="email" id="email" name="email" placeholder="abc@example.com" required />
                <label htmlFor="password">Password</label>
                <input value={pass} type="password" id="password" name="password" required />
                <button type="submit" id="loginbutton">Sign up</button>
            </form>
            <button onClick={()=>props.onFormSwitch('login')} id="toggle-login">Have an account? Log in</button>
        </div>
    )
}