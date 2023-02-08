const express = require('express');
const app = express();
const bparser = require('body-parser');
const session = require('express-session');

const products = require('./products.js');

app.set('view engine', 'ejs');
app.set('views', '.');
app.use('/', express.static(__dirname));
app.use(bparser.urlencoded());
app.use(session({secret: 'wap_w4d2ajax_q3'}));

function getNumOfItems(cart) {
    if(!cart) return 0;

    let count = 0;
    for(let c of cart) {
        count += c.quantity;
    }

    return count;
}

app.get('/product', (req, res) => {
    res.render('product', {
        product: products[Math.round(Math.random()*(products.length-1))],
        numOfItems: getNumOfItems(req.session.cart)
    });
});

app.post('/addToCart', (req, res) => {
    let id = req.body.id;
    
    if(!req.session.cart) req.session.cart = [];

    if(!req.session.cart.find(c => c.id == id)){
        req.session.cart.push({ ...products.find(p => p.id == id), quantity: 1 });
    } else {
        req.session.cart = req.session.cart.map(c => c.id==id?{...c, quantity: ++c.quantity}:c);
    }
    res.json(getNumOfItems(req.session.cart));
    //res.redirect('cart');
});

app.get('/cart', (req, res) => {
    res.render('cart', {products: req.session.cart??[]});
});

app.listen(3000);