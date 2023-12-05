const { readFileSync, writeFileSync } = require('fs');
const path = './data.json';
const router = require('express').Router();


//create Task
router.post("/create-task", (req, res) => {

    //read the existing tasks
    const data = readFileSync(path);
    oldTaskList = JSON.parse(data);
    try {
        newId = oldTaskList[oldTaskList.length - 1]['id'] + 1;
    }
    catch (err) {
        newId = 1
    }
    
    const newTask = {
        "id": newId,
        "taskName": req.body['taskName'],
        "taskDesc": req.body['taskDesc'],
        "isCompleted" : false,
    }
    //add new task to the existing json Object
    const newTaskList = oldTaskList.concat(newTask);
    //update new task list to the json file
    try {
        writeFileSync(path, JSON.stringify(newTaskList), 'utf-8');
        res.status(200).json(newTask);
    }
    catch (error) {
        res.status(400).json(
            {
                "message": error.message,
            }
           
        )
    }
    
});

//Read All Tasks
router.get('/read-tasks', (req, res) => {
    const taskList = JSON.parse(readFileSync(path));
    res.send(taskList);
})

//Delete All Tasks
router.delete('/delete-task/:id', (req, res) => {

    var found = false;
    const taskList = JSON.parse(readFileSync(path));

    var newTaskList = []
    taskList.map((task, key) => {
        if (task["id"] == req.params.id) {
            //delete Task
            res.send("Task Found");
            found = true;
        }
        else {
            newTaskList.concat(task);
        }
    })

    if (found == false) {
        res.send("Task Not Found");
    } else {
        writeFileSync(path, JSON.stringify(newTaskList), 'utf-8');
    }
})


module.exports = router;