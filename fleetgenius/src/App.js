/*import React, { useState } from "react"

import logo from './logo.svg';
import './App.css';
import { Login } from "./login";
import { Register } from "./register";

function App() {
  const [currentForm, setCurrentForm]= useState('login')
  const toggleform =(formname)=>{
    setCurrentForm(formname);

  }
  return (
    <div className='initial'>
      <div class="background"></div>
      { currentForm === "login"?<Login onFormSwitch={toggleform}/> :<Register onFormSwitch={toggleform}/>}
    </div>
  );
}

export default App;*/
import React from 'react';
import Connector from './Connector';

function App() {
  return (
    <div className="App">
      <Connector />
    </div>
  );
}

export default App;

