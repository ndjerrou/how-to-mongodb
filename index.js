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

    async function getProducts() {
      // modifier cette function : elle doit renvoyer uniquement les produits qui contiennent Xiaomi dans le nom

      return await Product.find();
    }

    const Product = mongoose.model('product', productsSchema);

    const product = createProduct('Xiaomi 19', 10);
    const product1 = createProduct('Trotinette', 20);
    const product2 = createProduct('Post-it XXL', 2);

    // save(product, product1, product2);

    const products = getProducts().then((products) => console.log(products));
  } catch (err) {
    console.error(err.message);
  }
}

toConnect();

//

// Créeation de plusiezurs produits (3)

// Le schema doit respecter :

// name: doit avoir entre 3 et 10 caractères grand max
// prix : ne doit pas dépasser pas 100
// date: l'heure de création du document
