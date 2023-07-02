const express=require("express")
const router=express.Router()
const path=require('path')
const {allpizzas, comments, displaycomments}=require("./../controller/homepizzacontroller")
const PizzaModel=require("./../model/pizzaSchema")
router.get("/allpizzas",allpizzas)
router.post("/pizza/:id/:username",comments)
router.get("/pizza/:pizzaId",displaycomments)
module.exports=router