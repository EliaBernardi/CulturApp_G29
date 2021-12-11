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

var _idAmministratore = ObjectId("61b4ce6ff73468e5cf498102");

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
            passwordHash: request.body['passwordHash'],
            email: request.body['email'],
            userType: request.body['userType'],
            name: request.body['name'],
            surname: request.body['surname'],
            dateOfBirth: request.body['dateOfBirth'],
            location: request.body['location'],
            deviceImei: [{imei1: request.body['imei1']}],
            employeesList: [{_id: ObjectId(), passwordHash: request.body['email']}]

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

/* inutile?????
 app.get('/administrator/:_id', (request, response) => {

    database.collection("Administrator").find({"_id": parseInt(request.params.id)}).toArray((error, result) => {
           if (error) {
               console.log(error);
           }
   
           response.send(result);
       })
    
   })
*/ 

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
app.get('/administrator/:id', (request, response) => {
         
    database.collection("Administrator").find({"employeesList": {_id : ObjectId(request.params.id)}}).toArray((error, result) =>
        {
            if (error || result.count == 0) console.log(error);
            let ris = result[0].employeesList.find(x =>  x._id = ObjectId(request.params.id));
            response.send(ris);
       });
    response.json("RICEZIONE employee success");
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
        "employeesList" : {_id: ObjectId(),"passwordHash":"provaDaJS"}}}
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
        

    response.json("Updated Successfully");
})

/*
app.put('/administrator', (request, response) => {
         
    database.collection("Administrator").updateOne(
        //Filter Criteria
        {
            "_id": "61b3f7691461bae021dd6baf"
        },
        //Update
        {
            $set:
            {
                employeesList:[{name: "ciao"}]
            }

        }
    );

    response.json("Updated Successfully");
})
*/
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


 app.get('/ticket', (request, response) => {
    var data = fs.readFileSync('ticket.json');
    var myObject = JSON.parse(data);

    response.send(myObject);
})
