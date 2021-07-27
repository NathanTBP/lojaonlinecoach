'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const products = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: false,
    },
    info:{price:Number,quantity:Number}
});

const video = new Schema({

    title: { // Nome da videoaula, também é unico e pode ser usado como chave
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    name_game:{ // Nome do jogo, podendo ser LOL ou TFT
        type: String,
        trim: true,
        required: true
    },

    difficulty:{ // Pode ser basico intermediario ou avançado
        type: String,
        trim: true,
        required: true,
    },

    thumbnail: { // Url para a imagem da thumbnail
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Black_flag.svg"
    },

    professor:{ // Nome do professor responsavel pela aula
        type: String,
        trim: true,
        required: true,
    },

    description:{ // Descrição do conteúdo da aula
        type: String,
        trim: true,
        default: "Esse video ainda nao possui descricao"
    },

    link:{ // Link para o video do drive que contem a aula
        type: String,
        trim: true,
        required: true,
    },

    quantity:{ // Informa quantas ja foram vendidas
        type: Number,
        default: "0"
    }

});

const aovivo = new Schema({

    condition: { // Booleano da confirmação da aula: falso é pendente e true e confirmada
        type: Boolean,
        default: false,
    },

    professor: { // Nickname do professor
        type: String,
        required: true,
        trim: true,
    },

    prof_email: { // Email do professor
        type: String,
    },

    prof_celular: { // Telefone do professor
        type: Number,
    },

    aluno: { // Email do aluno
        type: String,
        required: true,
    },

    quantity:{ // Informa quantas ja foram vendidas
        type: Number,
        default: "0"
    }

});

module.exports = mongoose.model('Video',video);
module.exports = mongoose.model('Aovivo',aovivo);
module.exports = mongoose.model('Products',products);