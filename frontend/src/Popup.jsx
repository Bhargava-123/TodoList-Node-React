import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from './Context';
import { Modal, Button, Form } from "react-bootstrap";
import deleteLogo from './assets/delete.png';
import closeLogo from './assets/close.svg';

export default function Popup() {

    const { setTaskName, setTaskDesc, setShow,show,handleAdd } = useContext(GlobalContext);
  return (
      <Modal show={show} className='popupContainer' centered >
          <Modal.Header className='modelHeader'>
              <div className="modelDummyHeader"></div>
              <Modal.Title className='modelTitle' centered>Add New Task</Modal.Title>
              <img src={closeLogo} className="modelCloseButton" onClick={() => { setShow(false) }} />
          </Modal.Header>
          <Modal.Body className='modelBody'>
              <>
                  <input type="text" className="modelTextInput" placeholder='Task Name'
                      onChange={(event) => setTaskName(event.target.value)} />
                  <textarea type="text" className="modelTextInput textArea" placeholder='Task Description' onChange={(event) => setTaskDesc(event.target.value)} />
              </>
          </Modal.Body>
          <Modal.Footer className='modelFooter'>
              <Button variant="secondary" className="modelButton" onClick={() => { handleAdd(); setShow(false) }}>Add Task</Button>
          </Modal.Footer>
      </Modal>
  )
}
