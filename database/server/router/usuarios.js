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
        resposta.status(404).send({message: 'Não existem Usuarios', data:e})
    });

});

router.get("/:id", (requisicao,resposta,proxima) => {

    const id = requisicao.params.id;

    Usuario.findById(id)
    .then(usuario=>{
        resposta.status(200).send(usuario);
    })
    .catch(e=>{
        resposta.status(404).send({message: 'Não existem usuarios ', data:e})
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

router.patch("/:id", (requisicao,resposta,proxima) => {

    const id = requisicao.params.id;

    Usuario.findByIdAndUpdate(id,{
        $set:{
            first_name: requisicao.body.first_name,
            last_name: requisicao.body.last_name,
            nickname: requisicao.body.nickname,
            celular: requisicao.body.celular,
            email: requisicao.body.email,
            password: requisicao.body.password,
            type_user: requisicao.body.type_user,
            live_classes: requisicao.body.live_classes,
            acquired_classes: requisicao.body.acquired_classes,
        }
    })
    .then(x=>{
        resposta.status(200).send({message: 'Usuario atualizado com sucesso!'});
    })
    .catch(e=>{
        resposta.status(404).send({message: 'Não existem usuarios ', data:e})
    });

});

router.delete("/:id", (requisicao,resposta,proxima) => {

    const id = requisicao.params.id;

    Usuario.findByIdAndRemove(id)
    .then(x=>{
        resposta.status(200).send({message: 'Usuario Removido com sucesso!'});
    })
    .catch(e=>{
        resposta.status(404).send({message: 'Não existem usuarios ', data:e})
    });

});

module.exports = router;