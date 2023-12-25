import { useState, useEffect } from 'react';
import "./App.css";
import deleteLogo from './assets/delete.png';
import closeLogo from './assets/close.svg';
import { Modal, Button, Form } from "react-bootstrap";
import Content from './Content'
import Header from './Header';
import Popup from './Popup';
import  GlobalContextProvider  from './Context';

//TODO:  1. Add New Task Empty TaskName and TaskDesc
//2. Deleting One Task deletes all with the same name
//3. removing Striked Out TaskName doesn't work when UnChecked


function App() {
  

  return (
    <GlobalContextProvider>
      <Header></Header>
      <Content></Content>
      <Popup></Popup>
    </GlobalContextProvider>
  )
}

export default App
