const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const usuario = require("../Schema/user");
const Usuario = mongoose.model("Usuarios");

router.get("/", (requisicao,resposta,proxima) => {

    Usuario.find({})
    .then(usuarios=>{
        resposta.status(200).send({message: 'Usuarios Encontrados:',usuarios});
    })
    .catch(e=>{
        resposta.status(404).send({message: 'Não existem Videos', data:e})
    });

});

router.post("/", (requisicao,resposta,proxima) => {

    let usuario = new Usuario();

    usuario.primeironome=requisicao.body.primeironome;
    usuario.ultimonome=requisicao.body.ultimonome;
    usuario.celular=requisicao.body.celular;
    usuario.email=requisicao.body.email;
    usuario.senha=requisicao.body.senha;
    usuario.tipo=requisicao.body.tipo;
    usuario.aulasrestantes=requisicao.body.aulasrestantes;
    usuario.aulasadquiridas=requisicao.body.aulasadquiridas;
    
    usuario.save()
    .then(x=>{
        resposta.status(201).send({message: 'Usuario cadastrado com sucesso!'});
    })
    .catch(e=>{
        resposta.status(400).send({message: 'O usuario não é válido!', data:e})
    });

});

router.put("/:id", (requisicao,resposta,proxima) => {


});

router.delete("/:id", (requisicao,resposta,proxima) => {



});

module.exports = router;