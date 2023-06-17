import express from 'express';
const router = express.Router();

import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

router.get(
  '/',
  asyncHandler(async (req, res) => {
    // We are getting all the products from the database by the find{} empty object method.
    const products = await Product.find({});
    throw new Error('This is an error');
    res.json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    } else {
      // if there is no product, we will return a 404 status code and a message.
      res.status(404);
      throw new Error('Resource not found');
    }
  })
);

export default router;
