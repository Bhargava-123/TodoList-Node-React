import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "./Context";
import deleteLogo from './assets/delete.png';
import closeLogo from './assets/close.svg';


export default function Content() {

    const { taskList, handleCheck, handleAdd, handleDelete, handleShow } = useContext(GlobalContext);

  return (
      <div>
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
                                      <input type="checkbox" className='checkBox' name="" id="" checked={value['isCompleted']} onClick={() => handleCheck(value)} key={key} />
                                      {
                                          !value['isCompleted'] ? <div className="taskName">{value['taskName']}</div> : <strike className="taskName">{value['taskName']}</strike>
                                      }
                                      <img src={deleteLogo} className='deleteLogo' alt="" onClick={event => handleDelete(event, value)} />
                                  </div>
                                  <hr className='hr' />
                                  <div className="taskDescContainer">
                                      <div className="taskDesc">{value['taskDesc']}</div>
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
      
    </div>
  )
}
