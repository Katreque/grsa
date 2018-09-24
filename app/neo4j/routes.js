var rotas = function(app, driver) {

  app.get('/neo-criar', (req, res) => {
    const session = driver.session();

    session
      .run('CREATE (a:Pessoa { nome: {nome} })', {nome: "Katreque"})
        .then((result) => {
          session.close();
          res.send('Nó criado!');
        })
        .catch((err) => {
          res.send(err);
        })
  })

  app.get('/neo-listar', (req, res) => {
    const session = driver.session();
    let _arrayResultadoQuery = [];
    let _countRetornoSelect = 0;

    session
      .run(`
      MATCH (ip:itemPedido {idProduto: 1})-[:FAZ_PARTE]->(p:Pedido)<-[:FAZ_PARTE]-(prodRelacionado)-[:E]->(prod:Produto)
      WHERE NOT ip.id = prodRelacionado.id
      RETURN prodRelacionado.id as Recomendado, prod.id as NomeProduto
      LIMIT 10
      `)
      .subscribe({
        onNext: function(record) {
          _countRetornoSelect++;
        },
        onCompleted: function() {
          res.json({linhas: _countRetornoSelect})
          session.close();
        },
        onError: function(err) {
          res.send(err);
        }
      });
  })
}

module.exports = function(app, driver) {
  setRotas: rotas(app, driver)
}
