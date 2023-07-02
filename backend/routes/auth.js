const UserLogin = require("../controller/usersController")
const router = require("express").Router()
const User = require("../model/userModel")
const bcrypt = require("bcrypt")


// regsiter
router.post("/register", async (req, res) => {
  try {
    console.log("hello");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      address:req.body.address,
      phoneNumber: req.body.phoneNumber,
    });
    console.log(newUser);
    let oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      console.log(oldUser)
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await newUser.save();
    console.log("Saved");
    console.log("user", user);
    res.status(200).json({ message: "Registered" });
    console.log("registered");

  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  
  const user = await User.findOne({ email });

  if (!user) {

    return res.status(404).json({ message: 'User not found' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  console.log("login succ");
    // Authentication successful
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address:user.address,
      },})
});

module.exports = router