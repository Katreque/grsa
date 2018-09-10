const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Neo4j requires
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("katreque", "123456"));

//SQL Server requires
const Connection = require('tedious').Connection;
var config = {
  userName: 'Katreque',
  password: '123456',
  server: 'localhost',
  options: {
      database: 'vendas',
      encrypt: true
  }
}
const connection = new Connection(config);
connection.on('connect', function(err) {
  if (!!err) {
    console.log(err);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./app/neo4j/routes.js')(app, driver);
require('./app/sqlserver/routes.js')(app, connection);

app.listen(1337, () => {
  console.log('ON!');
})
