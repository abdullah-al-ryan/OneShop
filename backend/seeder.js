// it will be used to seed the database with some sample products.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

// This function will import all the data from the arrays above into the database.

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    // We are getting the admin user from the createdUsers array.
    const adminUser = createdUsers[0]._id;

    // We are adding the adminUser to each product object in the products array.
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Inserting the sampleProducts array into the products database.
    await Product.insertMany(sampleProducts);

    // green.inverse is used to make the text green by importing the colors package.
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
