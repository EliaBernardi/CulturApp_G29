var Express = require("express");
var bodyParser = require("body-parser");
var CryptoJS = require("crypto-js");
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

var _idAmministratore = ObjectId("61b62d85d4fcaf1dc5751355");
var SHA256 = require("crypto-js/sha256");

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
               response.status(404)
               response.send("Administrator not found")
               return
           }
           
           response.send(result)
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
            response.status(404)
            response.send("Administrator was not created")
            return
        }

        database.collection("Administrator").insertOne({
            name: request.body['name'],
            surname: request.body['surname'],
            passwordHash: SHA256(request.body['passwordHash']).toString(),
            email: request.body['email'],
            dateOfBirth: request.body['dateOfBirth'],
            userType: 0,
            employeesList: [],
            location: {
                locationId: ObjectId("61b54a4252b010dff740db83"),
                locationName: "Museo Castello del Buonconsiglio",
                locationOpeningHours: 'the museum is open from tuesday to sunday, from 9:30am to 17:00pm every day',
                locationTicketPrice: parseInt("5"),
                locationDescription: "Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige"
            }
         });
        
        response.json("Administrator created");
    })
})


/**
 * @swagger
 * /administrator:
 *   post:
 *     summary: Retrieve an Employee from the administrator.
 *     description: Retrieve an Employee from the administrator.
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
         
    database.collection("Administrator").find({"_id": _idAmministratore}).toArray((error, result) =>
        {
            if (error || result.count == 0) {
                response.status(404)
                response.send("Employee not found")
                return
            }
            let ris = result[0].employeesList.find(x =>  x._id = ObjectId(request.params.id));
            response.send(ris);
       });
})


//prende la lista di employee dall'amministratore predefinito
app.get('/employee', (request, response) => {

    database.collection("Administrator").find({"_id": _idAmministratore}).toArray((error, result) => {
           if (error) {
                response.status(404)
                response.send("Employees not found")
                return
           }
           let ris = result[0].employeesList;
           response.send(ris);
       })
    
})

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: employee's id
 *     responses:
 *       200:
 *         description: employee was deleted
 *       404:
 *         description: employee was not found
*/

//cancella un determinato employee dall'amministratore predefinito
app.delete('/employee/:id', (request, response) => {

    database.collection("Administrator").updateOne( 
        { "_id" : _idAmministratore} , 
        { "$pull" : { "employeesList" : { "_id" :  ObjectId(request.params.id) } } } , 
        { "multi" : true } 
    );
    response.send("Employee deleted");
})


//aggiunge un employee all'amministratore predefinito
app.put('/employee', (request, response) => {

    database.collection("Administrator").updateOne({_id: _idAmministratore}, {$push: {
        "employeesList" : {_id: ObjectId(),
                            name: request.body['name'],
                            surname: request.body['surname'],
                            passwordHash: SHA256(request.body['passwordHash']).toString(),
                            email: request.body['email'],
                            dateOfBirth: request.body['dateOfBirth'],
                            userType: 1
                        }}}
    );
    response.send("Employee created");
})


//modifica un determinato employee dall'amministratore predefinito
app.put('/employee/:id', (request, response) => {
    database.collection("Administrator").updateOne(
        {_id : _idAmministratore , "employeesList._id" : ObjectId(request.params.id) } , 
                {$set : {...(request.body.name && {"employeesList.$.name": request.body['name']}),
                        ...(request.body.surname && {"employeesList.$.surname": request.body['surname']}),
                        ...(request.body.passwordHash && {"employeesList.$.passwordHash": request.body['passwordHash']}),
                        ...(request.body.email && {"employeesList.$.email": request.body['email']}),
                        ...(request.body.dateOfBirth && {"employeesList.$.dateOfBirth": request.body['dateOfBirth']}),
                } 
                } ,
                false , 
                true);
    
        
    response.send("Employee modified");
})



/**
 * @swagger
 * /administrator/{id}:
 *   delete:
 *     summary: Delete an administrator.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: administrator's id
 *     responses:
 *       200:
 *         description: administrator was deleted
 *       404:
 *         description: administrator was not found
*/

//cancella un determinato amministratore
app.delete('/administrator/:id', (request, response) => {

    database.collection("Administrator").deleteOne({
        _id: ObjectId(request.params.id)
    });

    response.send("Administrator deleted");
})
/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Retrieve a ticket with a specifi id.
 *     description: Retrieve a ticket with a specifi id.
 *     responses:
 *       200:
 *         description: A list of ticket.
 *       404:
 *         description: Ticket not found
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
                response.status(404)
               response.send("Ticket not found")
               return
            }

            response.send(result);
       });
})


/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: Create a ticket.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                  type: ObjectId
 *                  description: The object's id
 *                  example: 61b54afada072e0945a55b02
 *               customerName:
 *                  type: string
 *                  description: The customer name.
 *                  example: Mario
 *               customerSurname:
 *                  type: string
 *                  description: The customer surname.
 *                  example: Rossi
 *               customerEmail:
 *                  type: string
 *                  description: The customer's email.
 *                  example: "Mario.Rossi@gmail.com"
 *               ticketDate:
 *                  type: string
 *                  description: THE ticket's date
 *                  example: 21/12/2021
 *               refunded:
 *                  type: boolean
 *                  description: Says if the ticket has been refunded 
 *                  example: false
 *               validated:
 *                  type: boolean
 *                  description: Says if the ticket has been validated
 *                  example: false
 *               location:
 *                 type: object
 *                 properties:
 *                     locationId:
 *                       type: ObjectId
 *                       description: Location's id.
 *                       example: 61b54a4252b010dff740db83
 *                     locationName:
 *                       type: string
 *                       description:
 *                       example: Museo Castello del Buonconsiglio.
 *                     locationOpeningHours:
 *                       type: string
 *                       description: The hours where the location of interest is open.
 *                       example: The museum is open from tuesday to sunday, from 9:30am to 17:00pm every day
 *                     locationTicketPrice:
 *                       type: int
 *                       description: Ticket's price.
 *                       example: 5
 *                     locationDescription:
 *                       type: string
 *                       description: A short description of the location of interest.
 *                       example: Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige
 *              
 *     responses:
 *       200:
 *         description: ticket created
*/

//crea un ticket all'interno della collection
app.post('/ticket', (request, response) => {

    database.collection("Ticket").count({}, function (error) {
        if (error) {
            response.status(404)
            response.send("Ticket not created")
            return
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
                locationOpeningHours: 'The museum is open from tuesday to sunday, from 9:30am to 17:00pm every day',
                locationTicketPrice: parseInt("5"),
                locationDescription: "Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige"
            }
         }); 
         response.json("Ticket created");
    })
})


/**
 * @swagger
 * /ticket/{id}:
 *   put:
 *     summary: Validate a ticket.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: ticket's id
 *     responses:
 *       200:
 *         description: Set "validated" field to TRUE
 *       404:
 *         description: Ticket not found.
*/

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
        
    response.send("Ticket validated");
})


/**
 * @swagger
 * /pointOfInterest/:
 *   get:
 *     summary: Retrieve the information of the point of interest.
 *     description: Retrieve the information of the point of interest.
 *     responses:
 *       200:
 *         description: the information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 locationId:
 *                   type: ObjectId
 *                   description: Location's id.
 *                   example: 61b54a4252b010dff740db83
 *                 locationName:
 *                   type: string
 *                   description:
 *                   example: Museo Castello del Buonconsiglio.
 *                 locationOpeningHours:
 *                   type: string
 *                   description: The hours where the location of interest is open.
 *                   example: The museum is open from tuesday to sunday, from 9:30am to 17:00pm every day
 *                 locationTicketPrice:
 *                   type: int
 *                   description: Ticket's price.
 *                   example: 5
 *                 locationDescription:
 *                   type: string
 *                   description: A short description of the location of interest.
 *                   example: Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige
 */

//ritorna le informazioni del punto di interesse
app.get('/pointOfInterest', (request, response) => {

    database.collection("Administrator").find({"_id": _idAmministratore}).toArray((error, result) => {
           if (error) {
                response.status(404)
                response.send("Location of interest not found")
                return
           }
           
           let ris = result[0].location;
           response.send(ris);
       })    
})