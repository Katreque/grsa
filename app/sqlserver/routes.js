var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var _dbConnect = function(connection, create) {
  return new Promise((resolve, reject) => {
    if(!!create) {
      request = new Request(
        'INSERT INTO Nome (Nome) VALUES (@Nome);',
        function(err, rowCount, rows) {
          if (err) {
            return reject(err);
          } else {
            return resolve();
          }
        });
      }
        request.addParameter('Nome', TYPES.NVarChar, 'Renan Verissimo');
        connection.execSql(request);
  })
}

var rotas = function(app, connection) {
  app.get('/ssms-criar', (req, res) => {
    _dbConnect(connection, true)
      .then(() => {
        res.send('Funfou!')
      })
      .catch((err) => {
        res.send(err);
      })
  })
}

module.exports = function(app, connection, Request) {
  setRotas: rotas(app, connection, Request)
}
