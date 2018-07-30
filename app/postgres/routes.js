var rotas = function(app) {
  app.get('/pg-criar', (req, res) => {
    console.log('PG');
  })

  app.get('/pg-listar', (req, res) => {
    console.log('PG');
  })
}

module.exports = function(app) {
  setRotas: rotas(app)
}
