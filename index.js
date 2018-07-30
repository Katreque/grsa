const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Neo4j requires
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("katreque", "123456"));

require('./app/neo4j/routes.js')(app, driver);
require('./app/postgres/routes.js')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(1337, () => {
  console.log('ON!');
})
