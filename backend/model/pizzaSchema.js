const mongoose = require('mongoose');



const pizzaSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"pizza should have name"],
    },
    image:{
        type:String,
    },
    description:{
        type:String,
        required:[true,"pizza should have discription"],   
    },
    quantity:{
        type:Number,
        min:1,
        max:10,
    },
    tags:{
        type:String,
    },
    price:{
        type:Number,
        required:[true,"pizza should have price"],
    },
    size:{
        type:String,
    },
    toppings:{
        type:String,
        required:true,
    },
    discount:{
        type:String,
    },
    typeofpizza:{
        type:String,
        enum: ['veg', 'non-veg',"cheese"],
    },
    base:{
        type: String,
        enum: ['thin crust', 'thick crust', 'deep dish', 'whole wheat', 'gluten-free'],
        required: true,
    },
    sauce: {
        type: String,
        enum: ['marinara', 'barbecue', 'alfredo', 'pesto', 'ranch'],
        required: true,
    },
    status:{
        type:String,
        default:"available"
    },
    comments: []
})


const PizzaModel = mongoose.model('pizzas', pizzaSchema);
module.exports = PizzaModel;