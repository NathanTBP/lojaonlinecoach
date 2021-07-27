'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarios = new Schema({
    //o id vem sozinho

    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
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
    photo: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        trim: true,
    },
    type_user: { // 1 e normal, 2 e prof 3 e adm
        type: Number,
        required: true,
    },
    live_classes: [{date: Date, teacher: String}],
    acquired_classes: [{
        difficulty_name: String,
        class_id: String,
    }],

});

module.exports = mongoose.model('Usuarios',usuarios);