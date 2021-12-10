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
 * /administrator:
 *   get:
 *     summary: Retrieve all information of a specific administrator.
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
 *                       _id:
 *                         type: ObjectId
 *                         description: Employee's id.
 *                         example: 61b282626909cbff33c194af
 *                       passwordHash:
 *                         type: string
 *                         description: Employee's password encrypted with SHA1 hash.
 *                         example: "5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8"
 *                       email:
 *                          type: string
 *                          description: Employee's email.
 *                          example: "luigi@gmail.com"
 *                       userType:
 *                          type: string
 *                          description: Employee's type is 1.
 *                          example: 1
 *                       name:
 *                          type: string
 *                          description: Employee's name.
 *                          example: "Luigi"
 *                       surname:
 *                          type: string
 *                          description: The product's location.
 *                          example: "Bonetto"
 *                       dateOfBirth:
 *                          type: Date
 *                          description: Employee's date of birth
 *                          example: 1998-10-08T23:00:00.000+00:00
 *                       imeiList:
 *                         type: array
 *                         items:
 *                           type: string
 *                           properties:
 *                             0:
 *                               type: string
 *                               description: Employee's device's imei.
 *                               example: "453555137237678"
 * 
 */

 app.get('/api/employee', (request, response) => {
    var data = fs.readFileSync('employee.json');
    var myObject = JSON.parse(data);

    response.send(myObject);
})

/**
 * @swagger
 * /administrator:
 *   post:
 *     summary: Add an administrator.
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
 *                       _id:
 *                         type: ObjectId
 *                         description: Employee's id.
 *                         example: 61b282626909cbff33c194af
 *                       passwordHash:
 *                         type: string
 *                         description: Employee's password encrypted with SHA1 hash.
 *                         example: "5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8"
 *                       email:
 *                          type: string
 *                          description: Employee's email.
 *                          example: "luigi@gmail.com"
 *                       userType:
 *                          type: string
 *                          description: Employee's type is 1.
 *                          example: 1
 *                       name:
 *                          type: string
 *                          description: Employee's name.
 *                          example: "Luigi"
 *                       surname:
 *                          type: string
 *                          description: The product's location.
 *                          example: "Bonetto"
 *                       dateOfBirth:
 *                          type: Date
 *                          description: Employee's date of birth
 *                          example: 1998-10-08T23:00:00.000+00:00
 *                       imeiList:
 *                         type: array
 *                         items:
 *                           type: string
 *                           properties:
 *                             0:
 *                               type: string
 *                               description: Employee's device's imei.
 *                               example: "453555137237678"
 * 
 */



 app.post('/administrator', (request, response) => {

    database.collection("Administrator").count({}, function (error, numOfAdministrator) {
        if (error) {
            console.log(error);
        }

        database.collection("Administrator").insertOne({
            id: numOfAdministrator + 1,
            passwordHash: request.body['passwordHash'],
            email: request.body['email'],
            userType: request.body['userType'],
            name: request.body['name'],
            surname: request.body['surname'],
            dateOfBirth: request.body['dateOfBirth'],
            location: request.body['location'],
            deviceImei: [{imei1: request.body['imei1']}],
            employeesList: [{imei1: request.body['employee1']}]

        //arr1: [0,2],
        //arr2: [{name:'a', namme:'b'}]
         });

    response.json(request.body);
    })
})

/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Retrieve a list of ticket.
 *     description: Retrieve a list of employees from the Server.
 *     responses:
 *       200:
 *         description: A list of ticket.
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
 app.get('/ticket', (request, response) => {
    var data = fs.readFileSync('ticket.json');
    var myObject = JSON.parse(data);

    response.send(myObject);
})