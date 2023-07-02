const mongoose = require('mongoose');

const OrdersSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"User name is required"]
    },
    name:{
        type:String,
        required:[true,"pizza should have name"],
    },
    image:{
        type:String
    },
    description:{
        type:String,
        required:[true,"pizza should have discription"],   
    },
    quantity:{
        type:Number,
        min:1,
        max:10,
        default:1
    },
    tags:{
        type:String
    },
    price:{
        type:Number,
        required:[true,"pizza should have price"],
    },
    size:{
        type:String,
        default:"small",
    },
    toppings:{
        type:String,
        required:true,
    },
    discount:{
        type:String,
        default:"10%",
    },
    typeofpizza:{
        type:String,
        enum: ['veg', 'non-veg',"cheese"],
    },
    base:{
        type: String,
        enum: ['thin crust', 'thick crust', 'deep dish', 'whole wheat', 'gluten-free'],
        required: true
    },
    sauce: {
        type: String,
        enum: ['marinara', 'barbecue', 'alfredo', 'pesto', 'ranch'],
        required: true
    },
    status:{
        type:String,
        default:"available"
    },
})


const OrdersModel = mongoose.model('orders', OrdersSchema);
module.exports=OrdersModel