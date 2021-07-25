'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarios = new Schema({
    //o id vem sozinho

    primeironome: {
        type: String,
        required: true,
        trim: true,
    },
    ultimonome: {
        type: String,
        required: true,
        trim: true,
    },
    celular: { // 1 e lol e 2 e tft
        type: Number,
    },
    email: { // Ja implica no preco e na dificuldade
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
    tipo: { // 1 e normal, 2 e prof 3 e adm
        type: Number,
        required: true,
    },
    aulasrestantes: [{tipo: Number, quantidade: Number}],
    aulasadquiridas: [{nome: String}],
});

module.exports = mongoose.model('Usuarios',usuarios);