var _dbConnect = function(connection, Request, create) {
  new Promise(resolve, reject) {
    connection.on('connect', function(err) {
      if (!!err) {
        console.log(err);
      } else {
        console.log('Sql Server ON!');

        if(!!create) {
          request = new Request(
            'INSERT INTO TestSchema.Employees (Name, Location) OUTPUT INSERTED.Id VALUES (@Name, @Location);',
            function(err, rowCount, rows) {
              if (err) {
                reject(err);
              } else {
                console.log(rowCount + ' row(s) inserted');
                resolve(null, 'Nikita', 'United States');
              }
            });

            request.addParameter('Name', TYPES.NVarChar, name);
            request.addParameter('Location', TYPES.NVarChar, location);
            connection.execSql(request);
          } else {

            //Fonte do Listar
          }
        }
      });
  }
}

var rotas = function(app, connection, Request) {
  app.get('/ssms-criar', (req, res) => {
    _dbConnect(connection, Request, true)
      .then(() => {

      })
      .catch(() => {

      })
  })

  app.get('/ssms-listar', (req, res) => {
    _dbConnect(connection, Request, false)
      .then(() => {

      })
      .catch(() => {

      })
  })
}

module.exports = function(app, connection) {
  setRotas: rotas(app, connection)
}
