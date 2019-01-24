const mongoose = require("mongoose");

const ProdutoSchema = mongoose.Schema({
  produto: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  importado: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  }
});

const Produto = module.exports = mongoose.model('produto', ProdutoSchema)

module.exports.get = function (callback, limit) {
  Produto.find(callback).limit(limit);
}

