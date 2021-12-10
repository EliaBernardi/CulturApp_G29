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

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

var DATABASE = "culturappDB";
var database;

app.listen(49146, () => {

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE);
        console.log("Mongo DB Connection Successfull");
    })

});

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API for CulturApp',
            version: '1.0.0',
            description:
                'This is a REST API application made with Express.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'GroupXX',
                url: 'http://localhost:49146/',
            },
        },
        servers: [
            {
                url: 'http://localhost:49146/',
                description: 'Development server',
            },
        ],
    },
    apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (request, response) => {
    response.json('Hello World');
});

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Retrieve a list of employees.
 *     description: Retrieve a list of employees from the Server.
 *     responses:
 *       200:
 *         description: A list of employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Name:
 *                         type: integer
 *                         description: The product Name.
 *                         example: Antonio
 *                       Price:
 *                         type: string
 *                         description: The product's price.
 *                         example: 20.0
 *                       Location:
 *                          type: string
 *                          description: The product's location
 *                          example: Refrigerated foods
 */

 app.get('/api/employee', (request, response) => {
    var data = fs.readFileSync('employee.json');
    var myObject = JSON.parse(data);

    response.send(myObject);
})

app.get('/api/ticket', (request, response) => {
    var data = fs.readFileSync('ticket.json');
    var myObject = JSON.parse(data);

    response.send(myObject);
})