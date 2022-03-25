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
    response.send('Hello ----------- ')
})

app.get('/name:name', (request, response) => {
    var p = request.params;
    console.log(p);
    response.send('Hello ' + request.params.name)
})

app.post('/data', (request, response) => {

    var {
        POID,
        POName,
        OrderDate,
        CustomerOrderNumber,
        OrderType,
        CustomerAccountID,
        CustomerCompanyName,
        SupplierCompanyName,
        ShippingAddressId,
        Lines
    } = request.body

    const filename = POID + '-' + POName;
    const path = `files/${filename}`;
    const head = "Head~" + OrderDate + "~" + CustomerOrderNumber + "~" + OrderType + "~" + CustomerAccountID + "~" + CustomerCompanyName + "~" + SupplierCompanyName + "~" + ShippingAddressId;
    const lines = [];
    for (let i = 0; i < Lines.length; i++) {
        const line = "\nLine~" + Lines[i].Quantity + "~" + Lines[i].RequestedDate + "~" + Lines[i].SupplierPartNr + "~" + Lines[i].CustomerPartNr + "~" + Lines[i].PackCode;
        lines[i] = line;
    }

    var content = head + "" + lines.join("");
    fs.writeFile(path, content, function (err) {
        if (err) {
            response.status(500).json({
                msg: "Server side error",
                Error: err
            });
            return console.log(err);
        }
    });
    response.status(201).json({

        msg: "SUCCESS: File is created.",
        name: filename
    })
});

module.exports = {
    app
}