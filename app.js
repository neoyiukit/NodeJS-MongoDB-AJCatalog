var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/air_jordan");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup
var AJSchema = new mongoose.Schema({
    Name: String,
    image: String,
    desc: String
});

var MyAJ = mongoose.model("MyAJ", AJSchema);

app.get("/", function(req,res){
   res.render("landing");
});

app.get("/AJFootLocker", function(req,res){
    MyAJ.find({}, function(err, AllAJ){
        if(err){
            console.log(err);
        }else {
        res.render("AJFootLocker", {AllAJs:AllAJ});      
        }
    });
});

app.post("/AJFootLocker", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.desc;
  var newAJ = {Name: name, image: image, desc: desc}
    //create a new AJ record and save to the database
    MyAJ.create(newAJ, function(err, newlyCreate){
       if(err){
          console.log(err); 
       } else {
         res.redirect("/AJFootLocker");    
       }
    });
  //default is going the get request
});

app.get("/AJFootLocker/new", function(req, res){
    res.render("new");
});

app.get("/AJFootLocker/:id", function(req, res){
    MyAJ.findById(req.params.id, function(err, foundAJ){
        if(err){
            console.log(err)
        } else {
            res.render("show", {MyAJ: foundAJ});
        }
    });
});

// connecting to the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!")
});
