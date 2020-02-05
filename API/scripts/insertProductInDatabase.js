'use strict';
function main() {
  const mongoose = require('mongoose');
  const Product = require('./../src/models/product');
  const readline = require('readline-sync');
  const productName = readline.question('Enter name of the new product: ');
  const productDescription = readline.question('Enter description: ');
  const productPrice = readline.questionInt('Enter price: ');
  let productInStock = readline.keyInYN('This product is in stock?: ');
  if (productInStock) {
    productInStock = true;
  } else {
    productInStock = false;
  }

  const product = new Product({
    name: productName,
    description: productDescription,
    price: productPrice,
    inStock: productInStock
  });

  console.log('User to create: \n********\n' + product + '\n********\n');
  if (!readline.keyInYN('Continue?: ')) {
    process.exit(1);
  }
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

  product
    .save()
    .then(() => {
      console.log(product);
      console.log('Product successfully created and stored in database!');
      process.exit(0);
    })
    .catch(error => {
      console.log(JSON.parse({ error: error }));
      process.exit(1);
    });
}

main();
