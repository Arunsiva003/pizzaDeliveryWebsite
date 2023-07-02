const userModel=require("./../model/userModel")
const multer=require('multer')
const bcrypt=require('bcryptjs')
const PizzaModel=require("./../model/pizzaSchema")
const CustomizedPizza=require("../model/custompizza")
exports.CreateAdminAccount=async(req,res,next)=>{
    let extistinguser;
    try{
        extistinguser=await userModel.findOne({email:req.body.email})
    }
    catch(err){console.log(err)}
    if (extistinguser){
        res.status(400).json({message:"user already exits"})
    }
    else{
        const hasedpassword=bcrypt.hashSync(req.body.password)
        const user=new userModel({
            name:req.body.name,
            email:req.body.email, 
            password:hasedpassword,
            phoneNumber:req.body.phoneNumber,
            
            isadmin:req.body.isadmin
        })
        try{
            const newuser=await user.save();
        }
        catch(err){console.log(err)}
        return res.status(200).json({message:user})
        }
        next()
    }

exports.AdminLogin = async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        let extistinguser;
        try {
          extistinguser = await userModel.findOne({ email: req.body.email });
          console.log(extistinguser)
        } catch (err) {
          console.log(err);
        }
      
        if (!extistinguser) {
          return res.json({
            message: "User not found, please sign up",
          });
        }
        if(extistinguser.isadmin==="true"){

            const isPasswordCorrect = bcrypt.compareSync(password, extistinguser.password);
          if (!isPasswordCorrect) {
            return res.json({
              message: "Invalid email or password",
            });
          }
        
          return res.status(200).json({
            message: "Login success",
            user: extistinguser,
          });
        }
        else{
          res.json({message:"You are not allowed here ❌"})
        }
      };
  
exports.allpizzas=(req,res)=>{
  PizzaModel.find().then((pizzas)=>res.json(pizzas)).catch((err)=>console.log(err))
}

exports.detailpizzadmin=(req,res)=>{
  console.log(req.params.id)
  PizzaModel.findById({_id:req.params.id}).then((result)=>res.json(result)).catch((err)=>console.log(err))
}


exports.deletepizza=(req, res) => {
    const pizzaId = req.params.id;
    PizzaModel.findByIdAndDelete(pizzaId).then((result)=>res.json({message:"deleted successfully"})).catch((err)=>console.log(err))
}

exports.customizedpizza=(req,res)=>{
  CustomizedPizza.find().then((result)=>res.json({message:result})).catch((err)=>console.log(err))
}
exports.cusdelete = (req, res) => {
  const { id } = req.params;
  console.log(id);
  CustomizedPizza.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "pizza not found" });
      }
      res.json({ message: "pizza cleared successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    });
};