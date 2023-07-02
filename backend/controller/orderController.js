const orderModel=require("./../model/orders")
const userModel=require("./../model/userModel")
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
     
  auth: {
    user: 'testme2206@gmail.com',
    pass: 'uluwiknwquogwxbm'
  }
});
exports.getmyorders=async (req,res)=>{
    let myorders;
    try{
        myorders=await orderModel.find()
        res.status(200).send(myorders)
    }
    catch(err)
    {
        res.send(err)
        console.log(err)
    }
}



exports.changests = (req, res) => {
  const { sts, id, username } = req.params;
  orderModel
    .findOneAndUpdate({ _id: id, username: username }, { status: sts, $inc: { quantity: -1 } }, { new: true })
    .then((result) => {
      res.status(200).json({ message: "Status updated successfully" });
      console.log(result); 

      userModel.find({ name: username }).then((user) => {
        console.log(user);

        if (user && user.length > 0) {
          const userData = user[0]; 

          console.log(userData.email); 
          var mailOptions = {
            from: 'testme2206@gmail.com',
            to: userData.email,
            subject: `Hey user, your order status is ${sts}`,
            text: `Dear ${userData.name},\n\nYour order status has been updated to "${sts}". Thank you for your patience and continued support.\n\nBest regards,\nThe Pizza App Team`
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        } else {
          console.log('User not found');
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    });
};





  exports.getusercarts = (req, res) => {
    const { username } = req.params;
    console.log(username);
    orderModel
      .find({ username: username })
      .then((result) => res.status(200).send(result))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
      });
  };
  
  exports.deleteorder = (req, res) => {
    const { id, username } = req.params;
    console.log(id, username);
    orderModel
      .deleteOne({ _id: id, username: username })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order cleared successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
      });
  };
  exports.admindeleteorder = (req, res) => {
    const { id} = req.params;
;
    orderModel
      .deleteOne({ _id: id })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Order not found" });
        }
        res.json({ message: "Order cleared successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
      });
  };
  exports.allclear=(req,res)=>{
    const {username}=req.params
    console.log(username,"asfda")
    orderModel.deleteMany({username:username}).then((resl)=>{res.json({message:"cleared"})}).catch((Err)=>console.log(Err))
  }