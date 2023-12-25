import { Children } from "react";
import { createContext } from "react";
import { useState,useEffect } from "react";

export const GlobalContext = createContext({})

export default function GlobalContextProvider({children}) {
    
    const URL = "http://localhost:8000";
    var [taskList, setTaskList] = useState([]);
    var [checkedList, setCheckedList] = useState([]);

    var [taskName, setTaskName] = useState("");
    var [taskDesc, setTaskDesc] = useState("");

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    var handleAdd = () => {
        fetch(URL + "/create-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "taskName": taskName,
                "taskDesc": taskDesc
            })
        }).then((res) => res.json()).then((data) => setTaskList(data));
        setTaskDesc("");
        setTaskName("");
    }

    var handleCheck = (value) => {
        fetch(URL + `/set-complete/${value['id']}`)
            .then((res) => res.json()).then((data) => setTaskList(data));
    }

    var handleDelete = (event, value) => {
        var idToBeDeleted = value["id"];
        fetch(URL + `/delete-task/${idToBeDeleted}`, { method: "DELETE", })
            .then((res) => res.json()).then((data) => setTaskList(data));
        // setTaskList(newTaskList);
    }
    var TaskName =
        (props) => {
            if (props.isChecked) {
                console.log(checkedList);
                return <strike className="taskName">{props.value['taskName']}</strike>
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
        })
    }, []);
    

    var states = {taskList,handleCheck,handleAdd,handleDelete,handleShow,setTaskName,setTaskDesc,setShow,show}

    return (
        <GlobalContext.Provider value={states}>
            {children}

        </GlobalContext.Provider>
    )
}
