var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var _dbConnect = function(connection, create) {
  return new Promise((resolve, reject) => {
    if(!!create) {
      request = new Request(
        `
        SELECT TOP (10) ip.id, prod.nome
        FROM ItemPedido as ip
          inner join Produto as prod
          on ip.idproduto = prod.id
          inner join Pedido as p
          on ip.idpedido = p.id
        WHERE EXISTS (
          SELECT *
          FROM ItemPedido as ip
          WHERE ip.idpedido = p.id AND ip.idproduto = '1'
        )
        AND ip.idproduto != '1'  
        ORDER BY ip.id
        OPTION (RECOMPILE)
        `,
        function(err, rowCount) {
          if (err) {
            return reject(err);
          } else {
            return resolve({linhas: rowCount});
          }
        });
      }

        connection.execSql(request);
  })
}

var rotas = function(app, connection) {
  app.get('/ssms-criar', (req, res) => {
    _dbConnect(connection, true)
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        res.send(err);
      })
  })
}

module.exports = function(app, connection) {
  setRotas: rotas(app, connection)
}
