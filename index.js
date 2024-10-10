const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const productRoute = require('./routes/product.route.js');
const uri = "mongodb+srv://demo_app:yDETlOOwKfkcHYS2@backenddb.luke7.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/products", productRoute);

app.get('/', function (req, res) {
  res.send('Hello World 123!');
});


// update a product
app.put('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({message: "Product not found"});
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// delete a product
app.delete('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({message: "Product not found"});
    }

    res.status(200).json({message: "Product deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(() => {
    console.log('Connection failed!');
  });

