const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/productModel');

router.get('/', (req, res, next) => {
    Product
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    console.log('test');
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling requests for post method!',
                createdProduct: result
            })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:productId', (req, res, next) =>{
    const productId = req.params.productId;
    Product.findById(productId)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc)
        }
        else {
            res.status(400).json({
                message : "No product/entry found under the ID!"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:productId', (req, res, next) =>{
    const productId = req.params.productId;
    Product.deleteOne({_id: productId})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(500).json({
            error: err
        });
    });
    // res.status(200).json ({
    //     message: 'deleted product'
    // })
});

router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product
        .update({_id: productId}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

module.exports = router;