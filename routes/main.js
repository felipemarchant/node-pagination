const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/products');


router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/add-product', (req, res, next)=>{
  res.render('main/add-products');
});

router.post('/add-product', (req, res, next)=>{
  let product = new Product();
  product.category = req.body.category_name;
  product.name = req.body.product_name;
  product.price = req.body.product_price;
  product.cover = faker.image.image();

  product.save((err)=>{
    if(err) throw err;
    res.redirect('/add-product');
  })
});

router.get('/generate-faker-data', (req, res, next)=>{
  for(var i = 0; i <= 100; i++){
    var product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.cover = faker.image.image();

    product.save((err) => {
      if (err) throw "Error" + err;
    });
    res.redirect('/products/1');
  }
});

router.get('/products/:page', (req, res, next) => {
    var perPage = 9
    var page = req.params.page || 1

Product.find({})
       .skip((perPage * page) - perPage)
       .limit(perPage)
       .exec((err, products) => {
          Product.count().exec((err, count) => {
              if (err) return next(err)
              res.render('main/products', {
                  products: products,
                  current: page,
                  pages: Math.ceil(count / perPage)
              });
          });
    });
});

module.exports = router;
