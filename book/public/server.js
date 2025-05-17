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
    Rating:Number,
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
    Status:Boolean,
    Date:String
}
 
const Itemschema={
    Bookid:ObjectId,  
    Title:String,
    Author:String,
    Publisher:String,
    Price:Number,
    Stock:Number,
    Discount:Number,
    Genre:[String],
    Image:String,
    Description:String,
    Orderid:ObjectId,
    Userid:ObjectId,
    FinalPrice:Number
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
    
    // sample change
    const token = req.headers.token;

    jwt.verify(token,jwtkey,function(err,user){

        if(err){
            console.log(err);
            return res.json({Auth:"",status:909});
        }
        req.user=user;

        if(req.user.role==="User")
        {
            if(!req.user.status)
            return res.json({Auth:"User Blocked",status:501});
            return next();
        }
        return res.json({Auth:"UnAuthorised Access",status:502});
    })
}


// USER INTERFACE

app.get("/profile",UserToken,async function(req,res){

    try{

        const userid = req.user.userid;

        const data = await User.findOne({_id:userid});

        return res.json({Data:data});

    }
    catch(err){
        console.log("Error Getting User Info");
        console.log(err);
    }
})

app.get("/Urev",UserToken,async function(req,res){

    try{

        const userid = req.user.userid;

        const val = await Review.aggregate([
            {
                $lookup:{
                    from:"books",
                    localField:"Bookid",
                    foreignField:"_id",
                    as:"news"
                }
            },
            {
                $unwind:"$news"
            },
            {
                $match:{
                    Userid:new ObjectId(userid)
                }
            }
        ]);

        //console.log(val);

        return res.json({Data:val});
    }
    catch(err){
        console.log("Error getting User reviews");
        console.log(err);
    }

})

app.get("/orders",UserToken,async function(req,res){

    try{

        const userid = req.user.userid;

        const data = await Order.aggregate([
            {
                $lookup:{
                    from:"items",
                    localField:"_id",
                    foreignField:"Orderid",
                    as:"news"
                }
            },
            {
                $match:{Userid:new ObjectId(userid)}
            },
            {
                $unwind:"$news"
            },
            {
                $group:{

                    _id:{
                        Orderid:"$_id",
                        Bookid:"$news.Bookid"
                    },
                    Dt:{$first:"$Date"},
                    Amt:{$first:"$Amount"},
                    Sat:{$first:"$Status"},
                    count:{$sum:1},
                    subtotal:{$sum:"$news.FinalPrice"},
                    dets:{$first:"$news"}
                }
            },
            {
                $group:{
                    _id:"$_id.Orderid",
                    Date:{$first:"$Dt"},
                    Amount:{$first:"$Amt"},
                    Status:{$first:"$Sat"},
                    ct:{$sum:"$count"},
                    tol:{$sum:"$subtotal"},
                    news:{$push:{Book:"$dets",ct:{$sum:"$count"}}}
                },
            },
            {
                $sort:{"Date":-1}
            }
        ]);

        //console.log(data[0].news);
        //console.log("*");

        return res.json({Data:data})
    }
    catch(err){
        console.log("Error Fetching Order data");
        console.log(err);
    }
})

app.get("/rev",async function(req,res){

    try{
        const bookid = req.query.Data._id;

        if(bookid)
        {
            const data = await Review.find({Bookid:bookid});

            return res.json({data:data});
        }
        return res.json({message:"Null"});
    }
    catch(err){
        console.log("Error getting Reviews");
        console.log(err);
    }
})

app.get("/cart",UserToken,async function(req,res){

    try{

        const user = req.user.userid;

        const data = await Cart.aggregate([
            {
                $lookup:{
                    from:"books",
                    localField:"Bookid",
                    foreignField:"_id",
                    as:"news"
                }
            },
            {
                $unwind:"$news"
            },
            {
                $match:{Userid:new ObjectId(user)}
            },
            {
                $group:{

                    _id:"$Bookid",
                    news:{$first:"$news"},
                    count:{$sum:1},
                    Total:{$sum:"$Price"},
                    Discount:{$sum:"$news.Discount"}
                }
            },
            {
                $sort:{"news.Title":1}
            }
        ]);
        //console.log(data);

        return res.json({data:data});
    }
    catch(err){
        console.log("Error Getting Cart List");
        console.log(err);
    }

})

app.get("/Favs",UserToken,async function(req,res){

    try {

        const user = req.user.userid;

        const Data=[];

        const userdata = await User.findOne({_id:user});
        const vals = userdata.Favourites;

        for(const val of vals)
        {
            const info = await Book.findOne({_id:val.Bookid});
            if(info)
            Data.push(info);
            else
            {
                const nice = await User.updateOne({_id:user},{$pull:{Favourites:{Bookid:val.Bookid}}});
            }
        }
        return res.json({data:Data});
    }
    catch(err){
        console.log(err);
        console.log("Error Fetching Fvaourites List");
    }

})

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
        if(query.Publisher)
        filter.Publisher = query.Publisher;
        if(query.Price)
        {
            const min = query.Price[0];
            const max = query.Price[1];
            filter.Price = {$gte : min, $lte : max};
        }

        const data = await Book.find(filter);
        //console.log(filter);
        //console.log(data);
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

            const token = jwt.sign({userid:data._id,username:data.Firstname,role:"User",status:data.Status},jwtkey,{expiresIn:3600});
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

        const token = jwt.sign({userid:val._id,username:val.Firstname,role:"User",status:val.Status},jwtkey,{expiresIn:3600});
        return res.json({token:token});
    }
    catch(err){
        console.log("Error Registering User");
        console.log(err);
    }

})

app.post("/favs",UserToken,async function(req,res){

    try{
        const user = req.user.userid;
        const proid = req.body._id;

        const chk = await User.findOne({_id:user,'Favourites.Bookid':proid});
        const pro = await Book.findOne({_id:proid});

        if(!chk)
        val = await User.updateOne({_id:user},{$push:{Favourites:{Bookname:pro.Title,Bookid:pro._id}}});

        return res.json({message:"Success"});
    }
    catch(err){
        console.log("Error Adding to Favourites List");
        console.log(err);
    }
})

app.post("/cart",UserToken,async function(req,res){

    try{

        const user = req.user.userid;
        const qty = req.body.Quantity;
        const Bookid = req.body.Book._id;
        const pri = req.body.Book.Price;

        if(Bookid)
        {
            let chk = await Cart.find({Userid:user,Bookid:Bookid}).countDocuments();
            let lim = await Book.findOne({_id:Bookid});
            let nice = Number(lim.Stock);
            let last = Number(qty)+Number(chk);

            if(last>nice)
            return res.json({message:"Limit Exceeded"});

            for(let i=0;i<qty;i++)
            {
                const newCart = new Cart({
                    Bookid : Bookid,
                    Userid : user,
                    Price : pri
                });
    
                const val = await newCart.save();
            }
            return res.json({message:"success"})
        }
        return res.json({message:"Null ochindhi Bro"});
    }
    catch(err){
        console.log("Error Adding to Cart");
        console.log(err);
    }

})

app.post("/rev",UserToken,async function(req,res){

    try{

        const user = req.user.userid;
        const username = req.user.username;
        const Bookid = req.body.Bookid._id;
        const Rating = req.body.Rating;
        const des = req.body.Description;

        if(Bookid)
        {
            const chk = await Review.findOne({Userid:user,Bookid:Bookid});

            if(chk)
            del = await Review.deleteOne({_id:chk._id});

            const orders=true;

            if(orders)
            {
                const newrev = new Review({
                    Bookid:Bookid,
                    Userid:user,
                    Username:username,
                    Rating:Rating,
                    Description:des
                });

                const done = await newrev.save();

                return res.json({message:"success"});
            }
            return res.json({message:"Buy the Book First"});
        }
        return res.json({message:"Null"});
    }
    catch(err){
        console.log("Error Adding Review");
        console.log(err);
    }
})

app.post("/order",UserToken,async function(req,res){

    try{

        const userid = req.user.userid;
        const em = req.body.Email;
        const data = req.body.Data;

        if(em)
        {
            const chk = await User.findOne({Email:em});

            if(chk._id==userid)
            {
                const neworder = new Order({
                    Userid:userid,
                    Amount:data.total-data.disct,
                    Status:false,
                    Date:(new Date().toLocaleString())
                });

                const val = await neworder.save();

                const newpayment = new Payment({
                    Orderid:val._id,
                    Userid:userid,
                    Amount:(data.total-data.disct),
                    Date:(new Date().toLocaleString())
                });

                const val2 = await newpayment.save();

                const wait = await Cart.find({Userid:userid}).countDocuments();

                for(let i=0;i<wait;i++)
                {
                    const item = await Cart.findOne({Userid:userid});

                    const book = await Book.findOne({_id:item.Bookid});

                    const stock = book.Stock-1;

                    const newitem = new Item({
                        Bookid:item.Bookid,  
                        Title:book.Title,
                        Author:book.Author,
                        Publisher:book.Publisher,
                        Price:book.Price,
                        Stock:book.Stock,
                        Discount:book.Discount,
                        Genre:book.Genre,
                        Image:book.Image,
                        Description:book.Description,
                        Orderid:val._id,
                        Userid:userid,
                        FinalPrice:book.Price-book.Discount
                    });

                    const ok = await newitem.save();

                    const bookupdate = await Book.updateOne({_id:book._id},{$set:{Stock:stock}});                  

                    const del = await Cart.deleteOne({_id:item._id});
                }

                return res.json({message:"success"});

            }
            return res.json({message:"Invalid User"});
        }
        return res.json({message:"Null"});

    }
    catch(err){
        console.log("Error Creating Order");
        console.log(err);
    }
})

app.put("/cart",UserToken,async function(req,res){

    try{

        const user = req.user.userid;
        const bookid = req.body.Book.news._id;
        const qty = req.body.Quantity;

        const data = await Cart.find({Bookid:bookid,Userid:user}).countDocuments();
        let val = qty - data;

        if(val<0)
        {
            val = val *-1;

            for(let i=0;i<val;i++)
            {
                const some = await Cart.deleteOne({Userid:user,Bookid:bookid});
            }
            return res.json({message:"deleted"});
        }
        else
        {
            for(let i=0;i<val;i++)
            {
                const newCart = new Cart({
                    Bookid:bookid,
                    Userid:user,
                    Price:req.body.Book.news.Price
                });

                const val = await newCart.save();
            }
            return res.json({message:"success"});
        }
    }
    catch(err){
        console.log("Error Deleting Elements");
        console.log(err);
    }

})

app.put("/status",UserToken,async function(req,res){

    try{
        
        const orderid = req.body.status._id;

        const val = await Order.updateOne({_id:orderid},{$set:{Status:true}});

        return res.json({message:"success"});

    }
    catch(err){
        console.log("Error updating status");
        console.log(err);
    }
})

app.put("/profile",UserToken,async function(req,res){

    try{

        const userid = req.user.userid;
        const data = req.body.input;

        const val = await User.updateOne({_id:userid},{$set:data});



        return res.json({message:"success"});

    }
    catch(err){
        console.log("Error Updating User data");
        console.log(err);
    }

})

app.delete("/Favs",UserToken,async function(req,res){

    try{

        const user = req.user.userid;
        const proid = req.body.pro;
        let val;

        //console.log(proid);

        if(proid)
        val = await User.updateOne({_id:user},{$pull:{Favourites:{Bookid:proid}}});

        return res.json({message:"success",data:val});

    }
    catch(err){
        console.log("Error deleting the Book");
        console.log(err);
    }

})

app.delete("/cart",UserToken,async function(req,res){

    try{

        const user = req.user.userid;
        const data = req.body.del;

        if(data)
        {
            //console.log(data);
            const ct = await Cart.find({Bookid:data.news._id,Userid:user}).countDocuments();

            for(let i=0;i<ct;i++)
            {
                const val = await Cart.deleteOne({Bookid:data.news._id,Userid:user});
            }
            //console.log("done");
            return res.json({message:"success"});
        }
        return res.json({message:"Null"});
    }
    catch(err){
        console.log("Error Deleting Cart list");
        console.log(err);
    }
})

app.delete("/Urev",UserToken,async function(req,res){

    try{

        const userid = req.user.userid;
        const revid = req.body.del._id;

        const val  = await Review.deleteOne({_id:revid});

        return res.json({message:"success"});
    }
    catch(err){
        console.log("Error Deleting Review");
        console.log(err);
    }

})


// ADMIN INTERFACE

function AdminToken(req,res,next)
{
    const token = req.headers.token;

    jwt.verify(token,jwtkey,function(err,user){

        if(err){
            console.log(err);
            return res.json({Auth:"",status:909});
        }
        req.user=user;

        if(req.user.role==="Admin")
        return next();
        return res.json({Auth:"UnAuthorised Access",status:502});
    })

}

app.get("/AProfile",AdminToken,async function(req,res){

    try {

        const admid = req.user.userid;

        const data = await Admin.findOne({_id:admid});

        if(data)
        return res.json({message:"success",user:req.user});

        return res.json({message:"Admin Not Found"});
    }
    catch(err){
        console.log(err);
        console.log("Error Getting Admin Profile");
    }
})


app.get("/payment",AdminToken,async function(req,res){

    try{

        const data = await Order.aggregate([
            {
                $lookup:{
                    from:"payments", // Foreign Table
                    localField:"_id", //Attribute of Local Table // this and below should be same
                    foreignField:"Orderid", // Attribute of Foreign Table
                    as:"news"
                }
            },
            {
                $unwind:"$news"
            },
            {
                $sort:{Date:-1}
            }
        ]);

        //console.log(data);
        return res.json({Data:data});

    }
    catch(err){
        console.log("Error Fetching Payments");
        console.log(err);
    }
})

app.get("/users",AdminToken,async function(req,res){

    try{

        const data = await User.find({});
        return res.json({data:data});

    }
    catch(err){
        console.log("Error getting users");
        console.log(err);
    }

})

app.post("/ALogin",async function(req,res){

    const em = req.body.Email;
    const pass = req.body.Password;

    try{

        const adm = await Admin.findOne({Email:em});

        if(adm && adm.Password==pass)
        {
            const token = jwt.sign({userid:adm._id,username:adm.Firstname,role:"Admin"},jwtkey,{expiresIn:3600});
            return res.json({token:token});
        }
        console.log("Admin not present / password doesn't match");
        return res.json({message:"Admin Does not Exist"});
    }
    catch(err){
        console.log(err);
        console.log("Error Logging User");
    }
})

app.post("/ARegister",async function(req,res){

    try{

        const newadmin = new Admin({
            Firstname:req.body.Firstname,
            Lastname:req.body.Lastname,
            Gender:req.body.Gender,
            Email:req.body.Email,
            Phonenumber:req.body.Phonenumber,
            Address:req.body.Address,
            Password:req.body.Password
        });

        const val = await newadmin.save();

        const token = jwt.sign({userid:val._id,username:val.Firstname,role:"Admin"},jwtkey,{expiresIn:3600});
        return res.json({message:val,token:token});
    }
    catch(err){
        console.log(err);
        console.log("Error Registering Admin");
    }
})

app.post("/add",AdminToken,async function(req,res){
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

app.put("/book",AdminToken,async function(req,res){

    try{

        const data = req.body.input;

        if(data)
        {
            const val = await Book.updateOne({_id:data._id},{$set:data});

            return res.json({message:"success"});
        }
        return res.json({message:"Null"});
    }
    catch(err){
        console.log("Error Updating Data");
        console.log(err);
    }

})

app.put("/Ustatus",AdminToken,async function(req,res){

    try{
        
        const user = req.body.del;

        if(user)
        {
            const st = await User.findOne({_id:user});
            const value = !(st.Status);
            const val = await User.updateOne({_id:user},{$set:{Status:value}});

            return res.json({message:"success"});
        }
        return res.json({message:"Null"});
    }
    catch(err){
        console.log("Error Blocking");
        console.log(err);
    }
})

app.delete("/book",AdminToken,async function(req,res){

    try{

        const book = req.body.del;

        if(book)
        {
            const val1 = await Book.deleteOne({_id:book._id});
            const vals = await Cart.find({Bookid:book._id}).countDocuments();

            for(let i=0;i<vals;i++)
            {
                const valnxt = await Cart.deleteOne({Bookid:book._id});
            }

            const val2 = await Review.find({Bookid:book._id}).countDocuments();

            for(let i=0;i<val2;i++)
            {
                const valref = await Review.deleteOne({Bookid:book._id});
            }
            return res.json({message:"success"});

        }
        return res.json({message:"Null"});
    }
    catch(err){
        console.log("Error Deleting Book");
        console.log(err);
    }
})

app.listen(4000,function(){
    console.log("Server Listening at Port 4000");
})
