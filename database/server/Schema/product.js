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
    info:{price:Number}
});

const video = new Schema({

    id: {
        type: Number,
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    difficulty: [
    { // 1 e lol e 2 e tft
        name: String,
        videoaulas: [{
            id: Number,
            title: String,
            thumbnail: String,
            professor: String,
            description: String,
            link: String
        }]
    }]
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
    },
    tipo: { // Ja implica no preco e na dificuldade
        type: Number,
        required: true,
    },
    jogo: { // 1 e lol e 2 e tft
        type: Number,
        required: true,
    },

});

module.exports = mongoose.model('Video',video);
module.exports = mongoose.model('Aovivo',aovivo);
module.exports = mongoose.model('Products',products);