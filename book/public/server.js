const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const jwt=require("jsonwebtoken");
const cookieparser=require("cookie-parser");
const { ObjectId, Decimal128, Double}=require("mongodb");

const jwtkey="secret";

const app=express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/Store");

const Userschema={
    Firstname:String,
    Lastname:String,
    Gender:String,
    Email:String,
    Phonenumber:Number,
    Address:String,
    Password:String,
    Status:Boolean,
    Favourites:[{
        Bookname:String,
        Bookid:ObjectId
    }]
}

const Adminschema={
    Firstname:String,
    Lastname:String,
    Gender:String,
    Email:String,
    Phonenumber:Number,
    Address:String,
    Password:String
}

const Bookschema={
    Title:String,
    Author:String,
    Publisher:String,
    Price:Number,
    Stock:Number,
    Discount:Number,
    Genre:[String],
    Image:String,
    Description:String
}

const Reviewschema={
    Bookid:ObjectId,
    Userid:ObjectId,
    Username:String,
    Rating:Decimal128,
    Description:String
}

const Cartschema={
    Userid:ObjectId,
    Bookid:ObjectId,
    Price:Number
}

const Ordersschema={
    Userid:ObjectId,
    Amount:Number,
    Date:String
}

const Itemschema={
    Bookid:ObjectId,
    Orderid:ObjectId,
    Userid:ObjectId,
    Price:Number
}

const Paymentschema={
    Orderid:ObjectId,
    Userid:ObjectId,
    Amount:Number,
    Date:String
}

const User = new mongoose.model("User",Userschema);
const Admin = new mongoose.model("Admin",Adminschema);
const Book = new mongoose.model("Book",Bookschema);
const Review = new mongoose.model("Review",Reviewschema);
const Cart = new mongoose.model("Cart",Cartschema);
const Order = new mongoose.model("Order",Ordersschema);
const Item = new mongoose.model("Item",Itemschema);
const Payment = new mongoose.model("Payment",Paymentschema);

function UserToken(req,res,next)
{
    const token = req.headers.token;

    if(token===undefined)
    {
        return res.json({Auth:""});
    }

    jwt.verify(token,jwtkey,function(err,user){

        if(err){
            console.log(err);
            return res.json({Auth:""});
        }
        req.user=user;

        if(req.user.role==="User")
        {
            if(!req.user.status)
            return res.json({Auth:"User Blocked"});
            return next();
        }
        return res.json({Auth:"UnAuthorised Access"});
    })
}


// USER INTERFACE

app.get("/store",UserToken,async function(req,res){

    try{
        const data = await Book.find({});
        return res.json({Data:data,User:req.user});
    }
    catch(err){
        console.log(err);
    }

})

app.get("/desc/:id", async function(req,res){
    try{
        const bok = req.params.id;

        const dets = await Book.findOne({_id:bok});
        const gen = dets.Genre;
        const oth = await Book.find({Genre:{$in : gen},_id:{$ne:dets._id}});

        //console.log(oth);
        return res.json({Book:dets,others:oth});
    }
    catch(err){
        console.log(err);
    }
})

app.post("/store",async function(req,res){
    try{
        const query = req.body;

        let filter = {};

        if(query.Author)
        filter.Author = query.Author;
        if(query.Genre)
        filter.Genre = {$in : query.Genre};

        const data = await Book.find(filter);
        //console.log(filter);
        //console.log(data);
        return res.json(data);
    }
    catch(err){
        console.log(err);
    }
})

app.post("/ULogin",async function(req,res){
    try{

        //console.log(req);

        const em = req.body.Email;
        const pass = req.body.Password;

        const data = await User.findOne({Email:em});

        if(data && data.Password==pass)
        {
            //console.log("Access Granted");

            const token = jwt.sign({userid:data._id,username:data.Firstname,role:"User",status:data.Status},jwtkey,{expiresIn:"1h"});
            return res.json({token:token});
        }
        else
        {
            console.log("No User Found / Password Didn't Match");
        }

    }
    catch(err){    
        console.log("Error Login Credentials");
    }
})

app.post("/URegister",async function(req,res){

    try{

        const newUser = new User({
            Firstname:req.body.Firstname,
            Lastname:req.body.Lastname,
            Gender:req.body.Gender,
            Email:req.body.Email,
            Phonenumber:req.body.Phonenumber,
            Address:req.body.Address,
            Password:req.body.Password,
            Status:true,
        })

        let val = await newUser.save();
        return res.json();
    }
    catch(err){
        console.log("Error Registering User");
    }

})



// ADMIN INTERFACE

app.post("/add",async function(req,res){
    const title = req.body.Title;
    const author = req.body.Author;
    const genre = req.body.Genre;
    const publisher = req.body.Publisher;
    const price = req.body.Price;
    const stock = req.body.Stock;
    const Description = req.body.Description;
    const Image = req.body.Image;

    try
    {
        const newbook = new Book({
            Title:title,
            Author:author,
            Genre:genre,
            Publisher:publisher,
            Price:price,
            Stock:stock,
            Discount:0,
            Description:Description,
            Image:Image
        });
    
        let val=await newbook.save();
        return res.json();
    }
    catch(err){
        console.log(err);
    }
})

app.listen(4000,function(){
    console.log("Server Listening at Port 4000");
})