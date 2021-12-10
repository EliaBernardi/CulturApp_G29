var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require("mongodb").MongoClient;
const { request, response } = require("express");
var CONNECTION_STRING = "mongodb+srv://root:culturapp2021@cluster0.4onwb.mongodb.net/test"



var cors = require('cors')
app.use(cors())


var DATABASE = "culturappDB";
var database;

app.listen(49146, () => {

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
    })

});

app.get('/', (request, response) => {
    response.json('Hello World');
});