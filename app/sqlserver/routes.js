var _dbConnect = function(connection, Request, create) {
  new Promise(resolve, reject) {
    connection.on('connect', function(err) {
      if (!!err) {
        console.log(err);
      } else {
        console.log('Sql Server ON!');

        if(!!create) {
          request = new Request(
            'INSERT INTO Pessoa (Nome) VALUES (@Nome);',
            function(err, rowCount, rows) {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });

            request.addParameter('Nome', TYPES.NVarChar, "Katreque");
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
        app.send('Linha adicionada!');
      })
      .catch((err) => {
        app.send(err);
      })
  })

  app.get('/ssms-listar', (req, res) => {
    _dbConnect(connection, Request, false)
      .then(() => {
        return;
      })
      .catch(() => {
        return;
      })
  })
}

module.exports = function(app, connection, Request) {
  setRotas: rotas(app, connection, Request)
}
