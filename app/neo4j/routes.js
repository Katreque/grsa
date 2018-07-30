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

    session
      .run('MATCH (a:Pessoa) WHERE a.nome = "Katreque" return a')
      .subscribe({
        onNext: function(record) {
          _arrayResultadoQuery.push(record.get('a'));
        },
        onCompleted: function() {
          res.send(_arrayResultadoQuery)
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
