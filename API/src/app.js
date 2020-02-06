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

app.get('/api/products/:id', (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(product => {
      res.status(200).json({ product: product });
    })
    .catch(error => {
      res.status(404).json({ error: error });
    });
});

app.put('/api/products/:id', (req, res, next) => {
  const product = new Product({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(201).json({ message: 'Modified!' });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});

app.post('/api/products/', (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock
  });
  product
    .save()
    .then(() => {
      res.status(201).json({ product: product });
    })
    .catch(error => {
      res.status(400).json({ error: error });
    });
});

app.use('/api/products', (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json({ products: products });
    })
    .catch(error => {
      res.status(400).json({ error: error });
    });
});

app.use((req, res) => {
  res.status(200).json({ serverStatus: 'OK' });
});

module.exports = app;
