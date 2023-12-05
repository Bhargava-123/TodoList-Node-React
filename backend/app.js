var express = require('express')
const app = express();
const apiRoutes = require('./routes')
PORT = 8000
var bodyParser = require('body-parser');
const { readFileSync, writeFileSync } = require('fs');
const path = './data.json';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', apiRoutes);

app.listen(PORT, () => {
    console.log("App Started");
})  