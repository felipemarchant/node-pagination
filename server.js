const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let mainRoutes = require('./routes/main')

const app = express();

mongoose.connect('mongodb://localhost:27017/article', { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(mainRoutes);

app.listen(8080, ()=>{
  console.log('Rodando na Porta => ' + 8080);
});
