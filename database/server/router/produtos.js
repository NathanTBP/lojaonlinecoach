const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const product = require("../Schema/product");
const Video = mongoose.model("Video");
const Aovivo = mongoose.model("Aovivo");
const Product = mongoose.model("Products");

//1 e video e 2 e ao vivo e 3 sao os valores
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
    else if (tipo==3){
        Products.find({})
        .then(x=>{
            resposta.status(200).send({message: 'Dados Encontrados:',x});
        })
        .catch(e=>{
            resposta.status(404).send({message: 'Não existem Dados', data:e})
        });
        }
    
    else resposta.status(400).send({message: 'O identificador de tipo nao é valido'})

});

router.post("/:tipo", (requisicao,resposta,proxima) => {

    const tipo = requisicao.params.tipo;

    if(tipo==1){    

    let video = new Video();
    
    video.id=requisicao.body.id;
    video.title=requisicao.body.title;
    video.name_game=requisicao.body.name_game;
    video.difficulty=requisicao.body.difficulty;
    video.thumbnail=requisicao.body.thumbnail;
    video.professor=requisicao.body.professor;
    video.description=requisicao.body.description;
    video.link=requisicao.body.link;
    video.quantity=requisicao.body.quantity;

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

    aovivo.condition=requisicao.body.condition;
    aovivo.professor=requisicao.body.professor;
    aovivo.prof_email=requisicao.body.prof_email;
    aovivo.prof_celular=requisicao.body.prof_celular;
    aovivo.aluno=requisicao.body.aluno;
    aovivo.quantity=requisicao.body.quantity;

    aovivo.save()
    .then(x=>{
        resposta.status(201).send({message: 'Aula cadastrada com sucesso!'});
    })
    .catch(e=>{
        resposta.status(400).send({message: 'A aula não é válida!', data:e})
    });

    } else if(tipo==3){

        let produto= new Product();

        produto.id=requisicao.body.id;
        produto.name=requisicao.body.name;
        produto.info=requisicao.body.info;

        produto.save()
        .then(x=>{
            resposta.status(201).send({message: 'Produto Cadastrado com sucesso!'});
        })
        .catch(e=>{
            resposta.status(400).send({message: 'O produto não é válido!', data:e})
    });

    }

    else resposta.status(400).send({message: 'O nameentificador de tipo nao é valido'})

});

router.patch("/:tipo/:id", (requisicao,resposta,proxima) => {


    const tipo = requisicao.params.tipo;
    const id = requisicao.params.id;

    if (tipo==1) {
        Video.findByIdAndUpdate(id,{
            $set:{
                id: requisicao.body.id,
                title: requisicao.body.title,
                name_game: requisicao.body.name_game,
                difficulty: requisicao.body.difficulty,
                thumbnail: requisicao.body.thumbnail,
                professor: requisicao.body.professor,
                description: requisicao.body.description,
                link: requisicao.body.link,
                quantity: requisicao.body.quantity,
            }
        })
            .then(x=>{
            resposta.status(200).send({message: 'Aula atualizada com sucesso!'});
        })
        .catch(e=>{
            resposta.status(404).send({message: 'Não existe o Produto', data:e})
        })
    }
    else if (tipo==2) {
        
        Aovivo.findByIdAndUpdate(id,{
            $set:{
                condition: requisicao.body.condition,
                professor: requisicao.body.professor,
                prof_email: requisicao.body.prof_email,
                prof_celular: requisicao.body.prof_celular,
                aluno: requisicao.body.aluno,
                quantity: requisicao.body.quantity,
            }
        })
            .then(x=>{
            resposta.status(200).send({message: 'Aula ao vivo atualizada com sucesso!'});
        })
        .catch(e=>{
            resposta.status(404).send({message: 'Não existe o Produto', data:e})
        })
    }
    else if (tipo==3){
        Product.findByIdAndUpdate(id,{
            $set:{
                 id :requisicao.body.id,
                 info :requisicao.body.info,
                 name :requisicao.body.name,
            }
        })
            .then(x=>{
            resposta.status(200).send({message: 'Produto atualizado com sucesso!'});
        })
        .catch(e=>{
            resposta.status(404).send({message: 'Não existe o Produto', data:e})
        })
    }
    else resposta.status(400).send({message: 'O identificador de tipo nao é valido'})

});

router.delete("/:nome", (requisicao,resposta,proxima) => {

    const nome = requisicao.params.nome;

    if (tipo==1) {
        Video.findOneAndRemove(nome)
            .then(x=>{
            resposta.status(200).send({message: 'Video removido com sucesso!'});
        })
        .catch(e=>{
            resposta.status(404).send({message: 'Não existe o video', data:e})
        })
    }
    else if (tipo==2) {
        
        Aovivo.findOneAndRemove(nome)
            .then(x=>{
            resposta.status(200).send({message: 'Aula removida com sucesso!'});
        })
        .catch(e=>{
            resposta.status(404).send({message: 'Não existe a aula', data:e})
        })
    }
    else if (tipo==3){
        Product.findByIdAndUpdate(nome)
            .then(x=>{
            resposta.status(200).send({message: 'Produto removido com sucesso!'});
        })
        .catch(e=>{
            resposta.status(404).send({message: 'Não existe o Produto', data:e})
        })
    }
    else resposta.status(400).send({message: 'O identificador de tipo nao é valido'})


});

module.exports = router;