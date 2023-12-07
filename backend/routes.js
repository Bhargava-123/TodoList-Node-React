const { readFileSync, writeFileSync } = require('fs');
const path = './data.json';
const router = require('express').Router();


//create Task
router.post("/create-task", (req, res) => {

    console.log(req.body);
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
        const taskList = JSON.parse(readFileSync(path));
        res.status(200).json(taskList);
    }
    catch (error) {
        res.status(400).json(
            {
                "message": error.message,
            }
        )
    }
    //send updates TaskList in return
    
});

//Read All Tasks
router.get('/read-tasks', (req, res) => {
    const taskList = JSON.parse(readFileSync(path));
    res.send(taskList);
})

//Delete All Tasks
router.delete('/delete-task/:id', (req, res) => {

    const taskList = JSON.parse(readFileSync(path));
    taskList.map((task) => {
        if (req.params.id == task["id"]) {
            var index = taskList.indexOf(task);
            taskList.splice(index, 1);
            console.log(index);
        }
    })

    writeFileSync(path, JSON.stringify(taskList), 'utf-8');
    res.status(200).json({
        "status": "success"
    });
})


module.exports = router;