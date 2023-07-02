const express=require("express")
const { CreateAdminAccount, AdminLogin, createpizza, allpizzas, detailpizzadmin, deletepizza, editpizza, customizedpizza, cusdelete } = require("../controller/adminController")
const router=express.Router()
const multer=require('multer')
const PizzaModel=require("./../model/pizzaSchema")
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  })
  const upload=multer({
    storage:storage
  })
  

router.post("/signup",CreateAdminAccount)
router.post("/login",AdminLogin)
router.post("/createpizza",upload.single('file'),(req,res)=>{
    PizzaModel.create({
        name:req.body.name,
        description:req.body.description,
        image:req.file.filename,
        size:req.body.size,
        quantity:req.body.quantity,
        price:req.body.price,
        tags:req.body.tags,
        toppings:req.body.toppings,
        discount:req.body.discount,
        typeofpizza:req.body.typeofpizza,
        base:req.body.base,
        sauce:req.body.sauce,
    }).then((result)=>res.json({message:"pizza saved"})).catch((err)=>console.log(err))
})
router.get("/detailpizzaadmin/:id",detailpizzadmin)
router.delete("/detailpizzaadmin/:id",deletepizza)
router.get("/allpizzas",allpizzas)
router.put('/editpizzaadmin/:id',upload.single('file'),(req, res) => {
    const data={
      name:req.body.name,
          description:req.body.description,
          image:req.file.filename,
          size:req.body.size,
          quantity:req.body.quantity,
          price:req.body.price,
          tags:req.body.tags,
          toppings:req.body.toppings,
          discount:req.body.discount,
          typeofpizza:req.body.typeofpizza,
          base:req.body.base,
          sauce:req.body.sauce,
    }
    console.log(data)
    // console.log(req.body)
  PizzaModel.findByIdAndUpdate({_id:req.params.id},data,{
    new: true,
    upsert: true,
    rawResult: true // Return the raw result from the MongoDB driver
  }).then((result)=>res.json({message:" pizza updated successfully"})).catch((err)=>console.log(err))
  
  })

router.get("/customizedpizzaadmin",customizedpizza)
router.post("/clearpizzacus/:id",cusdelete)
module.exports=router