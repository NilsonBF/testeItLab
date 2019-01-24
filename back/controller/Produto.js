Produto = require("../model/Produto");

exports.index = (req, res) => {
  Produto.get((err, produto) => {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        message: "Usuários encontrados.",
        data: produto
      });
    }
  });
};

exports.new = (req, res) => {
  let produto = new Produto();
  produto.produto = req.body.produto;
  produto.valor = req.body.valor;
  produto.tipo = req.body.tipo;
  produto.importado = req.body.importado;
  produto.tags = req.body.tags;
  produto.data = req.body.data;

  produto.save(err => {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        message: "Usuário criado com sucesso.",
        data: produto
      });
    }
  });
};

exports.view = (req, res) => {
  Produto.findById(req.params.prod_id, (err, produto) => {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        message: "Usuário encontrado com sucesso.",
        data: produto
      });
    }
  });
};

exports.delete = (req, res) => {
  Produto.remove(
    {
      _id: req.params.prod_id
    },
    (err, produto) => {
      if (err) {
        res.json({
          status: "error",
          message: err
        });
      } else {
        res.json({
          status: "success",
          message: "Usuário removido com sucesso.",
          data: produto
        });
      }
    }
  );
};

exports.update = (req, res) => {
  Produto.findById(req.params.prod_id, (err, produto) => {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      produto.produto = req.body.produto ? req.body.produto : produto.produto;
      produto.valor = req.body.valor ? req.body.valor : produto.valor;
      produto.tipo = req.body.tipo ? req.body.tipo : produto.tipo;
      produto.importado = req.body.importado ? req.body.importado : produto.importado;
      produto.tags = req.body.tags ? req.body.tags : produto.tags;
      produto.data = req.body.data ? req.body.data : produto.data;
      produto.save(error => {
        if (error) {
          res.json({
            status: "error",
            message: error
          });
        } else {
          res.json({
            status: "success",
            message: "Usuário atualizado",
            data: produto
          });
        }
      });
    }
  });
};