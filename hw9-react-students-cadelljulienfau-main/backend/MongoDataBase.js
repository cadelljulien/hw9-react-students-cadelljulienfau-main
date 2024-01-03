const MongoClient = require('mongodb').MongoClient; 
//var url
var config = require('./config'); //config.js file in root
//const dbConn =mogodb.MongoClient.connect(uri)
const uri = "mongodb+srv://"+config.db.user+":"+config.db.pass+"@cluster0.6ms9msn.mongodb.net/?retryWrites=true&w=majority"
//const client to hold and section for routing on database 
const client = new MongoClient(uri, {useNewUrlParser: true});
client.connect((err) => {
    if(err)
    console.log(err)
    else 
    console.log("Connected")
})
module.exports = client;
