const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling requests for get method!'
    })
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: 'Handling requests for post method!',
        createdProduct: product
    })
});

router.get('/:productId', (req, res, next) =>{
    const productId = req.params.productId;
    if (productId === 'special') {
        res.status(200).json({
            message: 'Its the special ID',
            product: productId
        });
    } else {
        res.status(200).json({
            message: 'Its a ID'
        })
    }
});

router.patch('/:productId', (req, res, next) =>{
    const productId = req.params.productId;
    if (productId === 'special') {
        res.status(200).json({
            message: 'Its the special ID',
            product: productId
        });
    } else {
        res.status(200).json({
            message: 'Its a ID'
        })
    }
});

router.delete('/:productId', (req, res, next) =>{
    res.status(200).json ({
        message: 'deleted product'
    })
});

module.exports = router;