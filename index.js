const express = require("express");
const app = express();
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const parser = require("body-parser");
const bluebird = require("bluebird");

const Games = require("./routes/data.js")

app.engine("handlebars", handlebars());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.static("styles"));
app.use(parser.json());
app.use(parser.urlencoded({
  extended: false
}));


app.get("/", function(req, res) {
  Games.find()
    .then(games => res.render("home", {
      games: games
    }))
    .catch(err => res.send("there was an error"))
});



app.get("/edit", function(req, res) {
  if(req.query.id){
    console.log("run");
    Games.findById(req.query.id)
    .then(function(games){
      res.render("edit",{
        games: games
      })
    })
  } else {
    console.log("hi");
    res.render("edit")
  }
})


app.post("/upsert", function(req, res){
  console.log("go");
  if(req.body._id){
    console.log("inside if")
    Games.findByIdAndUpdate(req.body._id, req.body,{upsert: true})
    .then( function(){res.redirect("/")})
  } else {
    console.log("inside else")
    new Games (
      req.body
    ).save()
    .then( function(){res.redirect("/")})
  }
})


app.post("/delete", function(req, res) {
  console.log("inside delete")
  console.log(req.body.id)
  if (req.body.id) {
    console.log("inside delete if")
    console.log(req.body.id)
    Games.findByIdAndRemove(req.body.id,function(err, doc){
console.log(err);
if (err) { return sendError(res,err) }})

  res.redirect("/")
}})


mongoose
  .connect('mongodb://localhost:27017/collections', {
    useMongoClient: true
  })
  .then(() => app.listen(3000, () => console.log('ready to roll!!')));
