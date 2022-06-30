const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;

async function toConnect() {
  try {
    //necessaire quand on manage du code asynchrone avec async await
    const conn = await mongoose.connect(url);
    console.log('Connected to my DB on Atlas');
    // Creating a model

    const productsSchema = mongoose.Schema({
      name: {
        type: String,
        minLength: 3,
        maxLength: 10,
        unique: true,
      },
      price: {
        type: Number,
        max: 100,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
    });

    function createProduct(name, price) {
      return new Product({
        name, // name: name
        price, //price: price
      });
    }

    function save(...products) {
      products.forEach(async (p) => await p.save());
    }

    async function getProduct(id) {
      return await Product.findOne({ _id: id });
    }

    async function deleteProduct(id) {
      await Product.deleteOne({ id });
      console.log('Deleted successfully the product');
    }

    const Product = mongoose.model('product', productsSchema);

    ////////////////UPDATE A PRODUCT////////////////

    //by query
    // getProduct('62bc641011f5b3d9dc4a2ac9').then((product) => {
    //   product.price = 12;

    //   product.save().then((result) => console.log(result));
    // });

    // const updatedProduct = await Product.updateOne(
    //   { _id: '62bd500235051658dd9dc638' },
    //   {
    //     name: 'Product 2',
    //   }
    // );

    // console.log(updatedProduct);

    async function updateProduct(id, data) {
      // const updatedProduct = await Product.findByIdAndUpdate(id, data); ==> don't send the updated product

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      console.log(updatedProduct);
    }

    updateProduct('62bc641011f5b3d9dc4a2ac9', {
      name: 'Xiaomi 24',
      numberItems: 10, // impossible , not part of the schema
    });

    ////////////////////////////////////////////////////////////////////

    // save(new Product({ name: 'new P2', price: 50 }));

    // const products = getProducts().then((products) => console.log(products));
  } catch (err) {
    console.error(err.message);
  }
}

toConnect();
