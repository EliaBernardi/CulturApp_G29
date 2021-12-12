var Express = require("express");
var bodyParser = require("body-parser");
var ObjectId = require("mongodb").ObjectId

var app = Express();
app.use(Express.json());
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

var _idAmministratore = ObjectId("61b54eaa4768e41b2a63247b");

app.get('/', (request, response) => {
    response.json('Hello World');
});


/**
 * @swagger
 * /administrator:
 *   get:
 *     summary: Return all information of a specific administrator.
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
 app.get('/administrator', (request, response) => {

    database.collection("Administrator").find({"_id": _idAmministratore}).toArray((error, result) => {
           if (error) {
               console.log(error);
           }
   
           response.send(result);
       })
    
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
            name: request.body['name'],
            surname: request.body['surname'],
            passwordHash: request.body['passwordHash'],
            email: request.body['email'],
            userType: 0,
            dateOfBirth: request.body['dateOfBirth'],
            employeesList: [],
            location: {
                locationId: ObjectId("61b54a4252b010dff740db83"),
                locationName: "Museo Castello del Buonconsiglio",
                locationOpeningHours: 'the museum is open from tuesday to sunday, from 9:30am to 17:00pm every day',
                locationTicketPrice: parseInt("5"),
                locationDescription: "Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige"
            }

        //arr1: [0,2],
        //arr2: [{name:'a', namme:'b'}]
         });
        
         console.log(request.body);
    response.json("success");
    })
})


/**
 * @swagger
 * /administrator:
 *   post:
 *     summary: Retrive an Employee from the administrator.
 *     description: Retrive an Employee from the administrator.
 *     responses:
 *       200:
 *         description: An Employee.
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

//prende un determinato employee dall'amministratore predefinito
app.get('/employee/:id', (request, response) => {
         
    database.collection("Administrator").find({"employeesList": {_id : ObjectId(request.params.id)}}).toArray((error, result) =>
        {
            if (error || result.count == 0) console.log(error);
            let ris = result[0].employeesList.find(x =>  x._id = ObjectId(request.params.id));
            response.send(ris);
       });
    response.json("RICEZIONE employee success");
})

//prende la lista di employee dall'amministratore predefinito
app.get('/employee', (request, response) => {

    database.collection("Administrator").find({"_id": _idAmministratore}).toArray((error, result) => {
           if (error) {
               console.log(error);
           }
           let ris = result[0].employeesList;
           response.send(ris);
       })
    
   })

//cancella un determinato employee dall'amministratore predefinito
app.delete('/employee/:id', (request, response) => {

    database.collection("Administrator").updateOne( 
        { "_id" : _idAmministratore} , 
        { "$pull" : { "employeesList" : { "_id" :  ObjectId(request.params.id) } } } , 
        { "multi" : true }  
    );
    response.json("CANCELLAZIONE employee success");
})

//aggiunge un employee all'amministratore predefinito
app.put('/employee', (request, response) => {

    database.collection("Administrator").updateOne({_id: _idAmministratore}, {$push: {
        "employeesList" : {_id: ObjectId(),
                            name: request.body['name'],
                            surname: request.body['surname'],
                            passwordHash: request.body['passwordHash'],
                            email: request.body['email'],
                            dateOfBirth: request.body['dateOfBirth'],
                            userType: 1
                        }}}
    );
    response.json("AGGIUNTA employee success");
})

//modifica un determinato employee dall'amministratore predefinito
app.put('/employee/:id', (request, response) => {
    database.collection("Administrator").updateOne(
        //Filter Criteria
        {
            "_id": _idAmministratore
        },
        //Update
        {
            $set:
            {
                passwordHash : "PRovaaaa"
            }
        },
        {
            arrayFilters: [{'employeesList._id':ObjectId(request.params.id)}]
        }
    );
        

    response.json("AGGIORNAMENTO employee Successfully");
})


/**
 * @swagger
 * /administrator:
 *   delete:
 *     summary: Remove an administrator.
 *     description: Remove an administrator from the Server.
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


app.delete('/administrator/:id', (request, response) => {

    database.collection("Administrator").deleteOne({
        _id: ObjectId(request.params.id)
    });

    response.json(request.params.id);
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

//ritorna un determinato ticket dato l'id
 app.get('/ticket/:id', (request, response) => {
    
    database.collection("Ticket").find({"_id": ObjectId(request.params.id)}).toArray((error, result) =>
        {
            if (error) {
                console.log(error);
            }

            response.send(result);
       });
})

//crea un ticket all'interno della collection
app.post('/ticket', (request, response) => {

    database.collection("Ticket").count({}, function (error) {
        if (error) {
            console.log(error);
        }

        database.collection("Ticket").insertOne({
            customerName: request.body['name'],
            customerSurname: request.body['surname'],
            customerEmail: request.body['email'],
            ticketDate: request.body['date'],
            refunded: false,
            validated: false,
            location: {
                locationId: ObjectId("61b54a4252b010dff740db83"),
                locationName: "Museo Castello del Buonconsiglio",
                locationOpeningHours: 'the museum is open from tuesday to sunday, from 9:30am to 17:00pm every day',
                locationTicketPrice: parseInt("5"),
                locationDescription: "Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige"
            }
         });
        
         response.json("AGGIUNTA ticket");
    })
})

//valida il ticket all'interno della collection
app.put('/ticket/:id', (request, response) => {
    database.collection("Ticket").updateOne(
        {
            "_id": ObjectId(request.params.id)
        },
        {
            $set:
            {
                validated : true
            }
        }
    );
        

    response.json("BIGLIETTO validato");
})