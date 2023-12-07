import { useState, useEffect } from 'react';
import "./App.css";
import deleteLogo from './assets/delete.png';
import closeLogo from './assets/close.svg';
import { Modal, Button, Form } from "react-bootstrap";

//TODO:  1. Add New Task Empty TaskName and TaskDesc
//2. Deleting One Task deletes all with the same name
//3. removing Striked Out TaskName doesn't work when UnChecked


function App() {
  const URL = "http://localhost:8000";
  var [taskList, setTaskList] = useState([]);
  var [checkedList, setCheckList] = useState([]);

  var [taskName, setTaskName] = useState("");
  var [taskDesc, setTaskDesc] = useState("");

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  var handleAdd = () => {
    fetch(URL + "/create-task", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "taskName": taskName,
        "taskDesc": taskDesc
      })
    }).then((res) => res.json()).then((data) => setTaskList(data)); 
  }

  var handleCheck = (event, key) => {

    if (event.target.checked) {
      checkedList = checkedList.concat([key]);
      setCheckList(checkedList);
    }
    else {
      checkedList.splice(key, 1);
      setCheckList(checkedList);
    }
    console.log(checkedList);
  }

  var handleDelete = (event, value) => {
    var newTaskList = [];
    var idToBeDeleted;
    taskList.map((task) => {
      //check if ever element in current taskList is not equal to selected task
      if (task['taskName'] != value['taskName']) {
        newTaskList = [...newTaskList, task];
      } 
      else {
        idToBeDeleted = value["id"];
      }
    })

    fetch(URL + `/delete-task/${idToBeDeleted}`, {method: "DELETE",})

    setTaskList(newTaskList);
  }
  var TaskName =
    (props) => {
    if (props.isChecked) {
      return <strike className="taskName">{ props.value['taskName'] }</strike>
    }
    else {
      return <div className="taskName">{props.value['taskName']}</div>
    }
  }

  useEffect(() => {
    fetch(URL + "/read-tasks").then(
      (res) => res.json()
    ).then((data) => {
      setTaskList(data);
    });


  }, []);

  return (
    <>
      <header>
        <h1>To-Do List</h1>
      </header>
      
      <div className="container">
        <div className="taskListContainer">
          {
            taskList.length == 0 ? <div className="emptyMessage">Get Some Work Done....</div> : <div></div>
          }
          {
            taskList.map((value, key) => {
              return (
                <div className="taskContainer" key={key}>
                  <div className="taskNameContainer">
                    <input type="checkbox" className='checkBox' name="" id="" onChange={event => handleCheck(event, key)} key={key} />
                    <TaskName isChecked={checkedList.includes(key)} value={value}></TaskName>
                    <img src={deleteLogo} className='deleteLogo' alt="" onClick={event => handleDelete(event,value)} />
                  </div>
                  <hr />
                  <div className="taskDescContainer">
                    <div className="taskDesc">{ value['taskDesc'] }</div>
                  </div>
                </div>
              )
            })
          }
          <div className="addButtonContainer" onClick={handleShow}>
            Add New Task
          </div>
         
        </div>
        
      </div>
      <Modal show={show} className='popupContainer' centered >
        <Modal.Header className='modelHeader'>
          <div className="modelDummyHeader"></div>
          <Modal.Title className='modelTitle' centered>Add New Task</Modal.Title>
          <img src={closeLogo} className="modelCloseButton" onClick={() => {setShow(false)}}/>
        </Modal.Header>
        <Modal.Body className='modelBody'>
          <>
            <input type="text" className="modelTextInput" placeholder='Task Name'
            onChange={(event) => setTaskName(event.target.value)}/>
            <textarea type="text" className="modelTextInput textArea" placeholder='Task Description' onChange={(event) => setTaskDesc(event.target.value)} />
          </>
        </Modal.Body>
        <Modal.Footer className='modelFooter'>
          <Button variant="secondary" className="modelButton" onClick={() => { handleAdd(); setShow(false) }}>Add Task</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App
