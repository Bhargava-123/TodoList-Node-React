var express = require('express')
var cors = require('cors');
const app = express();
const apiRoutes = require('./routes')
PORT = 8000
var bodyParser = require('body-parser');
const { readFileSync, writeFileSync } = require('fs');
const path = './data.json';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:5173']
}))

app.use('/', apiRoutes);

app.listen(PORT, () => {
    console.log("App Started");
})  