var config = {};

config.app ={};
config.server ={};
config.db ={};

//server vars
config.server.port = 5678;

//MongoDB cred 
config.db.host = 'cluster0.6ms9msn.mongodb.net';
config.db.port = 80;
config.db.user = 'cjulien2019';
config.db.pass = 'dCjx5KqtKvd3EDtI';
config.db.name = 'studentdb';
config.db.collection = 'students';

module.exports = config;