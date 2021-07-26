'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const video = new Schema({
    //o id vem sozinho

    nome: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    jogo: { // 1 e lol e 2 e tft
        type: Number,
        required: true,
    },
    tipo: { // Ja implica no preco e na dificuldade
        type: Number,
        required: true,
    },
    descricao: {
        type: String,
        required: false,
    },
    qntvendida: {
        type: Number,
        default: 0
    },
    nomeprof: {
        type: String,
        required: true,
        trim: true,
    },
    nickprof: {
        type: String,
        required: true,
        trim: true,
    },
    link:{
        type: String,
        trim: true,
    },
    thumb:{
        type: String,
        trim:true
    }
});

const aovivo = new Schema({
    //o id vem sozinho

    nomeprof: {
        type: String,
        required: true,
        trim: true,
    },
    nickprof: {
        type: String,
        required: true,
        trim: true,
    },
    horario: {
        type: Date,
        required: true,
    }

});

module.exports = mongoose.model('Video',video);
module.exports = mongoose.model('Aovivo',aovivo);