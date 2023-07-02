
const userController=require("./../controller/usersController")
const { detailpizzauser} = require("../controller/adminController")
const CustomizedPizza = require('../model/custompizza');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
     
  auth: {
    user: 'useremail9944@gmail.com',
    pass: 'zaahcuyndcoysujz'
  }
});
const express = require('express');
const router = express.Router();

// Assuming you have a pizza model or a MongoDB collection called "Pizza"
const Pizza = require('../model/pizzaSchema');

// Single Pizza Route

router.get('/orders', async (req, res) => {
  try {
    const searchText = req.query.search;
    const regex = new RegExp(searchText, 'i');
    const searchQuery = {
      $or: [
        { username: regex },
        { name: regex },
        { description: regex },
        { tags: regex },
        { toppings: regex },
      ],
    };

    const searchResults = await OrdersModel.find(searchQuery);
    res.json(searchResults);
  } catch (error) {
    console.error('Error searching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/detailpizzauser/:id', async (req, res) => {
    const { id } = req.params;

    try {
      // Find the pizza by ID
      const pizza = await Pizza.findById(id);
    
      if (!pizza) {
        return res.status(404).json({ error: 'Pizza not found' });
      }
    
      res.json(pizza);
    } catch (error) {
      console.error("error");
      res.status(500).send('Server Error');
    }
});

router.post('/custompizza', async (req, res) => {
  try {
    const { base, sauce, cheese, veggies,user } = req.body;

    const customizedPizza = new CustomizedPizza({
      base,
      sauce,
      cheese,
      veggies,
      user,
    });

    const savedPizza = await customizedPizza.save();
    var mailOptions = {
      from: 'useremail9944@gmail.com',
      to: "testme2206@gmail.com",
      subject: `Hey admin, you have recieved one order :)`,
      text: `Hey admin you have got one order from customized pizza`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 

    res.status(201).json(savedPizza);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the pizza.' });
  }
});

module.exports = router;
