const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const { ObjectId, Decimal128}=require("mongodb");

const app=express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/Store");

const Bookschema={
    Title:String,
    Author:String,
    Publisher:String,
    Price:Number,
    Stock:Number,
    Genre:[String],
    Image:String,
    Description:String
}

const Book = new mongoose.model("Book",Bookschema);


app.get("/store",async function(req,res){

    try{
        
        const data = await Book.find({});
        return res.json(data);
    }
    catch(err){
        console.log(err);
    }

})

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