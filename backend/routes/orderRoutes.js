const express=require("express")
const router=express.Router()
const multer=require('multer')
const path=require('path')
const orderModel=require("./../model/orders")
const { getmyorders, changests, getusercarts, deleteorder, admindeleteorder, allclear } = require("../controller/orderController")




router.post("/createorder/:username", async (req, res) => {
    try {
      const existingOrder = await orderModel.findOne({
        username: req.params.username,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        size: req.body.size,
        quantity: req.body.quantity,
        price: req.body.price,
        tags: req.body.tags,
        toppings: req.body.toppings,
        discount: req.body.discount,
        typeofpizza: req.body.typeofpizza,
        base: req.body.base,
        sauce: req.body.sauce,
      });
  
      if (existingOrder) {
        return res.json({ message: "error" });
      }
  
      else{
        const newOrder = await orderModel.create({
            username: req.params.username,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            size: req.body.size,
            quantity: req.body.quantity,
            price: req.body.price,
            tags: req.body.tags,
            toppings: req.body.toppings,
            discount: req.body.discount,
            typeofpizza: req.body.typeofpizza,
            base: req.body.base,
            sauce: req.body.sauce,
          });
      
          res.json({ message: "Order saved" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while saving the order" });
    }
  });
  

router.get("/myorders",getmyorders)
router.post("/statuschange/:sts/:id/:username",changests);
router.get("/userorders/:username",getusercarts)
router.get("/clearall/:username",allclear)
router.post("/clearorder/:id/:username",deleteorder)
router.post("/clearorder/:id/",admindeleteorder)

module.exports=router