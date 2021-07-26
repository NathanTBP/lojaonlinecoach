const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Rotas
const index= require("./router/home");
const produtos= require("./router/produtos")
const usuarios= require("./router/usuarios")
app.use("/",index);
app.use("/produtos",produtos);
app.use("/usuarios",usuarios);

app.use(express.static('public'));

//Bd
const mongoose = require("mongoose");
const Product = require('./Schema/product');
const User = require('./Schema/user');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://NathanTBP:nathan12@lojaonlinecoach.riyos.mongodb.net/test"); 

//Exportando
module.exports=app;