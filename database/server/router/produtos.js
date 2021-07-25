const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const product = require("../Schema/product");
const Video = mongoose.model("Video");
const Aovivo = mongoose.model("Aovivo");

//1 e video e 2 e ao vivo
router.get("/:tipo", (requisicao,resposta,proxima) => {

    const tipo = requisicao.params.tipo;
    
    if(tipo==1){
    Video.find({})
    .then(x=>{
        resposta.status(200).send({message: 'Videos Encontrados:',x});
    })
    .catch(e=>{
        resposta.status(404).send({message: 'Não existem Videos', data:e})
    });
    }
    else if (tipo==2){
       Aovivo.find({})
    .then(x=>{
        resposta.status(200).send({message: 'Aulas Encontradas:'});
    })
    .catch(e=>{
        resposta.status(404).send({message: 'Não existem Aulas', data:e})
    });
    } 
    
    else resposta.status(400).send({message: 'O identificador de tipo nao é valido'})

});

router.post("/:tipo", (requisicao,resposta,proxima) => {

    const tipo = requisicao.params.tipo;

    if(tipo==1){    

    let video = new Video();
    
    video.nome=requisicao.body.nome;
    video.jogo=requisicao.body.jogo;
    video.tipo=requisicao.body.tipo;
    video.descricao=requisicao.body.descricao;
    video.qntvendida=requisicao.body.qntvendida;
    video.nomeprof=requisicao.body.nomeprof;
    video.nickprof=requisicao.body.nickprof;
    video.link=requisicao.body.link;
    video.thumb=requisicao.body.thumb;

    video.save()
    .then(x=>{
        resposta.status(201).send({message: 'Video cadastrado com sucesso!'});
    })
    .catch(e=>{
        resposta.status(400).send({message: 'O Video não é válido!', data:e})
    });

    }
    else if(tipo==2){

    let aovivo = new Aovivo();

    aovivo.nomeprof=requisicao.body.nomeprof;
    aovivo.nickprof=requisicao.body.nickprof;
    aovivo.horario=requisicao.body.horario;
    aovivo.tipo=requisicao.body.tipo;
    aovivo.jogo=requisicao.body.jogo;

    aovivo.save()
    .then(x=>{
        resposta.status(201).send({message: 'Aula cadastrada com sucesso!'});
    })
    .catch(e=>{
        resposta.status(400).send({message: 'A aula não é válida!', data:e})
    });

    }

    else resposta.status(400).send({message: 'O identificador de tipo nao é valido'})

});

router.patch("/:tipo/:id", (requisicao,resposta,proxima) => {


    const tipo = requisicao.params.tipo;
    const id = requisicao.params.id;

    if (tipo==1) {
        Video.findById(id)    
            .then(x=>{
            
        })
        .catch(e=>{
            resposta.status(404).send({message: 'Não existe o Produto', data:e})
        })
    }
    else if (tipo==2) {}
    else resposta.status(400).send({message: 'O identificador de tipo nao é valido'})

    resposta.status(201).send({
        id: id,
        item: requisicao.body
    });

});

router.delete("/:nome", (requisicao,resposta,proxima) => {

    const nome = requisicao.params.id;

    Delete()
    resposta.status(200).send({
        mensagem: "Arquivo deletado com sucesso"
    });

});

module.exports = router;