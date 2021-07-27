const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const usuario = require("../Schema/user");
const Usuario = mongoose.model("Usuarios");

router.get("/", (requisicao,resposta,proxima) => {

    Usuario.find({})
    .then(usuarios=>{
        resposta.status(200).send(usuarios);
    })
    .catch(e=>{
        resposta.status(404).send({message: 'Não existem Videos', data:e})
    });

});

router.post("/", (requisicao,resposta,proxima) => {

    let usuario = new Usuario();

    usuario.first_name=requisicao.body.first_name;
    usuario.last_name=requisicao.body.last_name;
    usuario.nickname=requisicao.body.nickname;
    usuario.celular=requisicao.body.celular;
    usuario.email=requisicao.body.email;
    usuario.password=requisicao.body.password;
    usuario.type_user=requisicao.body.type_user;
    usuario.live_classes=requisicao.body.live_classes;
    usuario.acquired_classes=requisicao.body.acquired_classes;
    
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