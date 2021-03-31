const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
let MongoClient = require('mongodb').MongoClient;
const apiPort = 3000

var url = "mongodb+srv://user:<password>@cluster0.omr6r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.get('/:name', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("customers").findOne({
            name: req.params.name
        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))