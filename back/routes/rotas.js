const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API está funcionando."
  });
});

const ProdutoController = require("../controller/Produto");

router
  .route("/v1/prod")
  .get(ProdutoController.index)
  .post(ProdutoController.new);

router
  .route("/v1/prod/:prod_id")
  .get(ProdutoController.view)
  .put(ProdutoController.update)
  .patch(ProdutoController.update)
  .delete(ProdutoController.delete);


module.exports = router;
