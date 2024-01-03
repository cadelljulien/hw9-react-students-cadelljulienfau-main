//studentserver.js
const MongoClient = require('mongodb').MongoClient; 
//var url
var config = require('./config'); //config.js file in root
const client = require('./MongoDataBase')
const database = client.db('studentdb')
const collection = database.collection('students')
//const dbConn =mogodb.MongoClient.connect(uri)
const uri = "mongodb+srv://"+config.db.user+":"+config.db.pass+"@cluster0.6ms9msn.mongodb.net/?retryWrites=true&w=majority"
let dbConnection
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('uri')
    .then((client) => {
      dbConnection = client.db()
      return cb()
  })
    .catch((err) => {
      console.log(err)
      return cb(err)
    })
  },
  getDb: () => dbConnection
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs');
const glob = require("glob")
const http = require("http");
const path = require('path');
var cors = require('cors');
app.use(cors());
//app use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'));
//app use cases for cor local host to bypassing webbing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// //setting EJS
// app.set('views', path.join(__dirname,'views'));
// app.set("view engine","ejs");
// //Render template pages
// app.get('/', (req, res) => { //sets up a route for URL and renders a corresponding EJS template file
//   res.render('index', { name: 'Student Sever', layout: 'views/navbar'})
// })
// app.get('/index', (req, res) => { //sets up a route for URL and renders a corresponding EJS template file
//   res.render('index', { name: 'Home page', layout: 'views/navbar'}) //contains data to be used by the EJS template
// })
// app.get('/addStudent', (req, res) => { //sets up a route for URL and renders a corresponding EJS template file
//   res.render('addStudent', {title: 'Add Student', layout: 'views/navbar'}) //contains data to be used by the EJS template
// })
// app.get('/deleteStudent', (req, res) => { //sets up a route for URL and renders a corresponding EJS template file
//   res.render('deleteStudent', {title: 'Delete Student', layout: 'views/navbar'}) //contains data to be used by the EJS template
// })
// app.get('/displayStudent', (req, res) => { //sets up a route for URL and renders a corresponding EJS template file
//   res.render('displayStudent', {title: 'Display Student', layout: 'views/navbar'}) //contains data to be used by the EJS template
// }) 
// app.get('/listStudents', (req, res) => { //sets up a route for URL and renders a corresponding EJS template file
//   res.render('listStudents', {title: 'List Students', layout: 'views/navbar'}) //contains data to be used by the EJS template
// })
// app.get('/updateStudent', (req, res) => { //sets up a route for URL and renders a corresponding EJS template file
//   res.render('updateStudent', {title: 'Update Students', layout: 'views/navbar'}) //contains data to be used by the EJS template
// })
// app.get('/searchStudent', (req, res) => { //sets up a route for URL and renders a corresponding EJS template file
//   res.render('searchStudent', {title: 'F/L Student', layout: 'views/navbar'}) //contains data to be used by the EJS template
// })

/*
@description: Add's students
@method: /student
@type: post
@param: record_id
@param: first_name
@param: last_name
@param: gpa
@param: enrolled
*/
app.post('/students', async function(req, res) { //async for await
  var record_id = new Date().getTime();

  var obj = {};
  obj.record_id = record_id; //record id
  obj.first_name = req.body.first_name; //first name
  obj.last_name = req.body.last_name; // last name
  obj.gpa = req.body.gpa; //gpa
  obj.enrolled = req.body.enrolled; //enrolled
  var student = {
    "_id":obj.record_id,
    "record_id":obj.record_id,
    "first_name":obj.first_name,
    "last_name":obj.last_name,
    "enrolled":obj.enrolled
  };
  console.log("Data has been saved") //logs
  console.dir(student)
  const filter = { last_name: obj.last_name };
  const update = { $setOnInsert: obj };
  const options = { upsert: true };

  res.status(200).send();
  try{
    const result = await collection.updateOne(filter, update, options);
    console.log("Student added to database successfully");
      res.status(200).send();
  }
  catch(err){
    console.log(err);
  }
}); //end post method
/*
@description: Returns a student by id 
@method: /student
@type: get
@param: record_id
*/
app.get('/students/:record_id', async function(req, res) {
  var record_id = req.params.record_id;
// takes in the record
  const filter = { record_id: Number(record_id) };
  try {//checks database
    const result = await collection.findOne(filter);
    if (!result) {
      var rsp_obj = {};
      rsp_obj.record_id = record_id; //based on event gives out event message
      rsp_obj.message = 'error - resource not found';
      return res.status(404).send(rsp_obj);
    } else {
      return res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('error - unable to fetch resource');
  }
});


/*
@description: Returns a students
@method: /students
@type: get
*/
app.get('/students', async function(req, res) { //returns student object
  try {
    const result = await collection.find({}).toArray();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('error - internal server error');
  }
});// ends



/*
@description: Returns a student with last and first name
@method: /student
@type: get
@param: first_name
@param: last_name
*/
app.get('/students/:first_name/:last_name', async function(req, res) {
  var first_name = req.params.first_name; //first name
  var last_name = req.params.last_name; //last name
//pasres though it, the naming in database
  const filter = { first_name: first_name, last_name: last_name };
  try {
    const result = await collection.findOne(filter);
    if (result == null) {
      var rsp_obj = {};
      rsp_obj.first_name = first_name;
      rsp_obj.last_name = last_name;
      rsp_obj.message = 'error - resource not found';
      return res.status(404).send(rsp_obj);
    } else {
      return res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('error - internal server error');
  }
}); //ends

/*
@description: Test
@method: N/A
@type: N/A
*/
function queryDB(query) {
  // This is a dummy function that simply returns a promise that resolves with some dummy data after 1 second
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Query executed!");
      resolve([
        { id: 1, name: "John Doe", age: 30 },
        { id: 2, name: "Jane Doe", age: 25 },
        { id: 3, name: "Bob Smith", age: 40 },
      ]);
    }, 1000);
  });
}
/*
@description: Test
@method: N/A
@type: N/A
*/
function connectToDB() {
  // This is a dummy function that simply returns a promise that resolves after 1 second
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Connected to database!");
      resolve();
    }, 1000);
  });
}

/*
@description: Returns students
@method: /student
@type: get
*/
app.get('/students', async function(req, res) {
  try {
    const result = await collection.find({}).toArray();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('error');
  }
});

/*
@description: Updates a student by id 
@method: /student
@type: put 
@param: record_id
@param: first_name
@param: last_name
@param: gpa
@param: enrolled
*/
app.put('/students/:record_id', async function(req, res) {
  var record_id = parseFloat(req.params.record_id);
  var obj = {};
  obj.record_id = record_id; // record id
  obj.first_name = req.body.first_name; //first name
  obj.last_name = req.body.last_name; //last name
  obj.gpa = req.body.gpa; //gpa
  obj.enrolled = req.body.enrolled;
  const filter = { record_id: record_id };
  const update = { $set: obj };
  const options = { upsert: true };
  try {
    const result = await collection.updateOne(filter, update, options);
    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      res.status(404).send('error - resource not found');
    } else {
      res.status(200).send('successfully updated');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('error - unable to update resource');
  }
});

/*
@description: Deletes a student by id
@method: /student
@type: delete
@param: record_id
*/
app.delete('/students/:record_id', async function(req, res) {
  var record_id = req.params.record_id;
//takes in param for record
  const filter = { record_id: Number(record_id) };
  const result = await collection.deleteOne(filter);
//checks then deletes if it's there
  if(result.deletedCount === 1){
    var rsp_obj = {
      record_id: record_id,
      message: 'record has been deleted'
    };//returns success
    return res.status(200).send(rsp_obj);
  } else {
    var rsp_obj = {//when failed
      record_id: record_id,
      message: 'error - not found'
    };
    return res.status(404).send(rsp_obj);
  }
});


const requestListener = function (req, res) {
    fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
};


server = app.listen(5678); //start the server
console.log('Server is running...');
console.log(`Sever is running at http://localhost:${server.address().port}`);