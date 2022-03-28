const express = require('express');
const fs = require('fs');
const cors = require('cors')
const bodyParser = require("body-parser");
const path = require('path');
const res = require('express/lib/response');

const app = express()

const PORT = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('BY DWR')
})

app.get('/name:name', (request, response) => {
    var p = request.params;
    console.log(p);
    response.send('Hello ' + request.params.name)
})

app.post('/data', (request, response) => {

    var {
    filename,
       head,
       lines
    } = request.body

    const path = `files/${filename}`;


    var content = head + "" + lines.join("");
    fs.writeFile(path, content, function (err) {
        if (err) {
            return response.status(500).json({
                msg: "Server side error",
                Error: err
            });
        }
    });
    response.status(201).json({
        msg: "SUCCESS: File is created.",
        filename: filename
    })
});

module.exports = {
    app
}