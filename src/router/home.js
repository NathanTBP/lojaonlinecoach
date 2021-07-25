const express = require("express");
const router = express.Router();

router.get("/", (requisicao,resposta,proxima) => {

    resposta.status(200).send({
        mensagem: "Parabens, voce se conectou ao servidor"
    });
});

module.exports = router;