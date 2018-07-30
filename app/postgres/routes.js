var rotas = function(app) {
  app.get('/pg-admin', (req, res) => {
    console.log('PG');
  })
}

module.exports = function(app) {
  setRotas: rotas(app)
}
