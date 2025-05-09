const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ifathahamed01:ifath373@cluster0.ww27jje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Database connected"))
.catch((err) => console.log("Database connection error:", err));

app.get("/",(req,res)=>{
    res.send("Express app is running")
})

//Image storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        if (!file.originalname) {
            return cb(new Error("File has no originalname"), null);
        }
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});
const upload = multer({storage:storage})

//Creating upload endpoint for images
app.use('/images',express.static('uploads'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Mongoose database schema
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type: String,
    },
    image:{
        type: String,
    },
    brand:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    ram:{
        type: String,
        required: true,
    },
    storage:{
        type: String,
        required: true,
    },
    fcam:{
        type: String,
        required: true,
    },
    rcam:{
        type: String,
        required: true,
    },
    display:{
        type: String,
        required: true,
    },
    battery:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default:Date.now,
    },
    available:{
        type: Boolean,
        default:true,
    },
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});      //fetches all product details from Mongodb
    let id;                                     //determining the new product id
    if(products.length>0){
        let last_product_array = products.slice(-1);    //takes the last product
        let last_product = last_product_array[0];       //takes the id of the last product
        id = last_product.id+1;                         //sets the id to the nesxt value
    }
    else{
        id=1;                           //if no existing products the id will be 1
    }
    const product = new Product({       //creates a new instance of the Product model
        id: id,
        name: req.body.name,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        ram: req.body.ram,
        storage: req.body.storage,
        fcam: req.body.fcam,
        rcam: req.body.rcam,
        display: req.body.display,
        battery: req.body.battery,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for deleting product
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

//creating API for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating endpoint for registering the user
app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,error: "existing user found with same email address"});
    }
    let cart = {};
    for (let i=0; i<300; i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//creating endpoint for user login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,error:"Incorrect password"});
        }
    }
    else{
        res.json({success:false,errors:"Incorrect email ID"})
    }
})

const fetchUser = async (req,res,next) =>{
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error){
            res.status(401).send({errors:"please authenticate using a valide token"})
        }
    }
}

//Creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// creating endpoint to remove product from cartdata
app.post('.removefromcart',fetchUser,async (req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//creating endpoint to get cart data
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("Get cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})



app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port "+port)
    }
    else{
        console.log("Error : "+error)
    }
})