const express=require("express")
const app=express()
const multer=require('multer')
const path=require('path')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser = require('body-parser');

const UserRoutes=require("./routes/userRoutes")
const adminRoutes=require("./routes/adminRoutes")
const homeRoutes=require("./routes/homePizzas.js")
const authRoutes=require("./routes/auth.js")
const orderRoutes=require("./routes/orderRoutes.js")
// app.use(cookieparser())
app.use(bodyParser.json());
app.use(cors({credentials:true,origin:"*"}))
app.use(express.json())
app.use(express.static("public"))

app.use("/user",UserRoutes)
app.use("/auth", authRoutes)
app.use("/admin",adminRoutes)
app.use("/home",homeRoutes)
app.use("/orders",orderRoutes)
//to run server check u r in backend folder ->pizzaApp\backend> then type "npm start"
const MONGO_URL = "mongodb+srv://asamarun2003:pizza1234@cluster0.iz4axej.mongodb.net/?retryWrites=true&w=majority";
// mongodb+srv://<username>:<password>@cluster0.iz4axej.mongodb.net/?retryWrites=true&w=majority


const PORT = 5000;
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Mongodb connected port:${PORT}`))

}).catch((err) => {
    console.log(`${err} didnot connect`)
})

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/images')
//     },
//     filename:(req,file,cb)=>{
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// })
// const upload=multer({
//     storage:storage
// })

app.listen(3001,()=>{
    console.log(`server listening on ${3001}`)
})