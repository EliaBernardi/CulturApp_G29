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
 *     summary: Return all information of the administrator (used for debugging).
 *     description: Retrieve all information of the administrator from the Server.
 *     responses:
 *       200:
 *         description: Return all information of the administrator.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       _id:
 *                         type: ObjectId
 *                         description: Administrator's id.
 *                         example: 61b282626909cbff33c194af
 *                       name:
 *                          type: string
 *                          description: Administrator's name.
 *                          example: "Luigi"
 *                       surname:
 *                          type: string
 *                          description: Administrator's surname.
 *                          example: "Bonetto"
 *                       passwordHash:
 *                         type: string
 *                         description: Administrator's password encrypted with SHA256 hash.
 *                         example: "5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8"
 *                       email:
 *                          type: string
 *                          description: Administrator's email.
 *                          example: "luigi.bonetto@gmail.com"
 *                       dateOfBirth:
 *                          type: string
 *                          description: Administrator's date of birth
 *                          example: 07/09/1980
 *                       userType:
 *                          type: string
 *                          description: Administrator's type is 0.
 *                          example: 0
 *                       employeesList:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: ObjectId
 *                                 description: Employee's id.
 *                                 example: "61b62e50edc707e00f53cc23"
 *                               nome:
 *                                 type: string
 *                                 description: Employee's name.
 *                                 example: "Claudio"
 *                               surname:
 *                                 type: string
 *                                 description: Employee's surname.
 *                                 example: "Franza"
 *                               passwordHash:
 *                                 type: string
 *                                 description: Employee's password encrypted with SHA256 hash.
 *                                 example: "1f489582f7ea4c208b70219a2bb6a322227a7516630530a10ed7f2710cfbe447"
 *                               email:
 *                                 type: string
 *                                 description: Employee's email.
 *                                 example: "claudio.franza@gmail.com"
 *                               dateOfBirth:
 *                                 type: string
 *                                 description: Employee's dateOfBirth.
 *                                 example: "01/01/1997"
 *                               userType:
 *                                 type: string
 *                                 description: Employee's type is 1.
 *                                 example: "1"
 *                       location:
 *                           type: object
 *                           properties:
 *                             locationId:
 *                               type: ObjectId
 *                               description: Location's id.
 *                               example: 61b54a4252b010dff740db83
 *                             locationName:
 *                               type: string
 *                               description:
 *                               example: Museo Castello del Buonconsiglio.
 *                             locationOpeningHours:
 *                               type: string
 *                               description: The hours where the location of interest is open.
 *                               example: The museum is open from tuesday to sunday, from 9:30am to 17:00pm every day
 *                             locationTicketPrice:
 *                               type: int
 *                               description: Ticket's price.
 *                               example: 5
 *                             locationDescription:
 *                               type: string
 *                               description: A short description of the location of interest.
 *                               example: Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige
 */

//prende l'amministratore predefinito
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
 *     summary: Add an administrator (used for debugging).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                       _id:
 *                         type: ObjectId
 *                         description: Administrator's id.
 *                         example: 61b282626909cbff33c194af
 *                       name:
 *                          type: string
 *                          description: Administrator's name.
 *                          example: "Luigi"
 *                       surname:
 *                          type: string
 *                          description: Administrator's surname.
 *                          example: "Bonetto"
 *                       passwordHash:
 *                         type: string
 *                         description: Administrator's password encrypted with SHA256 hash.
 *                         example: "5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8"
 *                       email:
 *                          type: string
 *                          description: Administrator's email.
 *                          example: "luigi.bonetto@gmail.com"
 *                       dateOfBirth:
 *                          type: string
 *                          description: Administrator's date of birth
 *                          example: 07/09/1980
 *                       userType:
 *                          type: string
 *                          description: Administrator's type is 0.
 *                          example: 0
 *                       employeesList:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                       location:
 *                           type: object
 *                           properties:
 *                             locationId:
 *                               type: ObjectId
 *                               description: Location's id.
 *                               example: 61b54a4252b010dff740db83
 *                             locationName:
 *                               type: string
 *                               description:
 *                               example: Museo Castello del Buonconsiglio.
 *                             locationOpeningHours:
 *                               type: string
 *                               description: The hours where the location of interest is open.
 *                               example: The museum is open from tuesday to sunday, from 9:30am to 17:00pm every day
 *                             locationTicketPrice:
 *                               type: int
 *                               description: Ticket's price.
 *                               example: 5
 *                             locationDescription:
 *                               type: string
 *                               description: A short description of the location of interest.
 *                               example: Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige
 *     responses:
 *       200:
 *         description: Add an administrator.
*/

//crea una amministratore
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
 * /employee/{id}:
 *   get:
 *     summary: Retrieve an employee with a specific id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Retrieve an employee with a specific id.
 *     responses:
 *       200:
 *         description: Employee found.
 *       404:
 *         description: Employee not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       _id:
 *                         type: ObjectId
 *                         description: Employee's id.
 *                         example: "61b62e50edc707e00f53cc23"
 *                       nome:
 *                         type: string
 *                         description: Employee's name.
 *                         example: "Claudio"
 *                       surname:
 *                         type: string
 *                         description: Employee's surname.
 *                         example: "Franza"
 *                       passwordHash:
 *                         type: string
 *                         description: Employee's password encrypted with SHA256 hash.
 *                         example: "1f489582f7ea4c208b70219a2bb6a322227a7516630530a10ed7f2710cfbe447"
 *                       email:
 *                         type: string
 *                         description: Employee's email.
 *                         example: "claudio.franza@gmail.com"
 *                       dateOfBirth:
 *                         type: string
 *                         description: Employee's dateOfBirth.
 *                         example: "01/01/1997"
 *                       userType:
 *                          type: string
 *                          description: Employee's type is 1.
 *                          example: "1"
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


/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Retrieve all the employees of the administrator.
 *     description: Retrieve all the employees the an administrator.
 *     responses:
 *       200:
 *         description: Retrieve all the employees of an administrator.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                       _id:
 *                         type: ObjectId
 *                         description: Employee's id.
 *                         example: "61b62e50edc707e00f53cc23"
 *                       nome:
 *                         type: string
 *                         description: Employee's name.
 *                         example: "Claudio"
 *                       surname:
 *                         type: string
 *                         description: Employee's surname.
 *                         example: "Franza"
 *                       passwordHash:
 *                         type: string
 *                         description: Employee's password encrypted with SHA256 hash.
 *                         example: "1f489582f7ea4c208b70219a2bb6a322227a7516630530a10ed7f2710cfbe447"
 *                       email:
 *                         type: string
 *                         description: Employee's email.
 *                         example: "claudio.franza@gmail.com"
 *                       dateOfBirth:
 *                         type: string
 *                         description: Employee's dateOfBirth.
 *                         example: "01/01/1997"
 *                       userType:
 *                          type: string
 *                          description: Employee's type is 1.
 *                          example: "1"
 */

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
 *     summary: Delete an employee with a specific id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: employee's id
 *     responses:
 *       200:
 *         description: Employee deleted
 *       404:
 *         description: Employee not found
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


/**
 * @swagger
 * /api/prodotti:
 *   post:
 *     summary: Create a product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                  type: integer
 *                  description: The product Name.
 *                  example: Antonio
 *               Price:
 *                  type: string
 *                  description: The product's price.
 *                  example: 20.0
 *               Location:
 *                  type: string
 *                  description: The product's location
 *                  example: Refrigerated foods
 *     responses:
 *       201:
 *         description: successful executed
*/

/**
 * @swagger
 * /employee/:
 *   put:
 *     summary: Update the administor's employee list by adding a new employee.
 *     requestBody:
 *       required: true
 *     parameters:
 *       - in: query
 *         name: name
 *         example: "Claudio"
 *         schema:
 *             type: string
 *         description: employee's name.
 *       - in: query
 *         name: surname
 *         example: "Franza"
 *         schema:
 *             type: string
 *         description: employee's surname.
 *       - in: query
 *         name: passwordHash
 *         example: "1f489582f7ea4c208b70219a2bb6a322227a7516630530a10ed7f2710cfbe447"
 *         schema:
 *             type: string
 *         description: employee's password encrypted with SHA256 hash.
 *       - in: query
 *         name: email
 *         example: "claudio.franza@gmail.com"
 *         schema:
 *             type: string
 *         description: employee's email.
 *       - in: query
 *         name: dateOfBirth
 *         example: "01/01/1997"
 *         schema:
 *             type: string
 *         description: employee's date of birth.                    
 *     responses:
 *       200:
 *         description: Employee was added
*/


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


/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Update an employee with a specific id.
 *     requestBody:
 *       required: true
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: employee's id.
 *       - in: query
 *         name: name
 *         example: "Claudio"
 *         schema:
 *             type: string
 *         description: employee's name.
 *       - in: query
 *         name: surname
 *         example: "Franza"
 *         schema:
 *             type: string
 *         description: employee's surname.
 *       - in: query
 *         name: passwordHash
 *         example: "1f489582f7ea4c208b70219a2bb6a322227a7516630530a10ed7f2710cfbe447"
 *         schema:
 *             type: string
 *         description: employee's password encrypted with SHA256 hash.
 *       - in: query
 *         name: email
 *         example: "claudio.franza@gmail.com"
 *         schema:
 *             type: string
 *         description: employee's email.
 *       - in: query
 *         name: dateOfBirth
 *         example: "01/01/1997"
 *         schema:
 *             type: string
 *         description: employee's date of birth.
 *     
 *     responses:
 *       200:
 *         description: Employee was updated
*/

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
 *     summary: Delete an administrator with a specific id (used for debugging).
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: administrator's id
 *     responses:
 *       200:
 *         description: Administrator deleted
 *       404:
 *         description: Administrator not found
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
 *     summary: Retrieve a ticket with a specific id.
 *     description: Retrieve a ticket with a specific id.
 *     responses:
 *       200:
 *         description: Ticket found
 *       404:
 *         description: Ticket not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       _id:
 *                          type: ObjectId
 *                          description: The ticket's id
 *                          example: 61b54afada072e0945a55b02
 *                       customerName:
 *                          type: string
 *                          description: The customer name.
 *                          example: Mario
 *                       customerSurname:
 *                          type: string
 *                          description: The customer surname.
 *                          example: Rossi
 *                       customerEmail:
 *                          type: string
 *                          description: The customer's email.
 *                          example: "Mario.Rossi@gmail.com"
 *                       ticketDate:
 *                          type: string
 *                          description: THE ticket's date
 *                          example: 21/12/2021
 *                       refunded:
 *                          type: boolean
 *                          description: Says if the ticket has been refunded 
 *                          example: false
 *                       validated:
 *                          type: boolean
 *                          description: Says if the ticket has been validated
 *                          example: false
 *                       location:
 *                         type: object
 *                         properties:
 *                             locationId:
 *                               type: ObjectId
 *                               description: Location's id.
 *                               example: 61b54a4252b010dff740db83
 *                             locationName:
 *                               type: string
 *                               description:
 *                               example: Museo Castello del Buonconsiglio.
 *                             locationOpeningHours:
 *                               type: string
 *                               description: The hours where the location of interest is open.
 *                               example: The museum is open from tuesday to sunday, from 9:30am to 17:00pm every day
 *                             locationTicketPrice:
 *                               type: int
 *                               description: Ticket's price.
 *                               example: 5
 *                             locationDescription:
 *                               type: string
 *                               description: A short description of the location of interest.
 *                               example: Il castello del Buonconsiglio è uno degli edifici più conosciuti di Trento e uno tra i maggiori complessi monumentali del Trentino-Alto Adige
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
 *         description: Ticket created
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
 *     summary: Validate a ticket with a specific id.
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
 *         description: The information.
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

