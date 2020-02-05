'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose
  .connect(
    'mongodb+srv://jbanosyrivas:TxXLpmG9E9aDVLDYvkw@nodecourse-ohxbc.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch(error => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use((req, res) => {
  res.status(200).json({ serverStatus: 'OK' });
});

module.exports = app;
