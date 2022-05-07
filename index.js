const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
    "mongodb+srv://admin-beata:mleczyk123@cluster0.yu0at.mongodb.net/catsGame",
    {
      useNewUrlParser: true,
    }
  );

  app.use(express.json());
  app.use(cors());

const cardSchema={
    title: String,
    type: String,
    req: Array,
    playerNum: Number,
    colors: Array,
    VP: Number,
    colors: String,
    straggler: Boolean,
    description: String,



}
const Card = mongoose.model("Card", cardSchema);
const Straggler = mongoose.model("Straggler", cardSchema);

    app.get("/getCardsfromDatabase:number", function(req,res){

        const numberOfPLayers = req.params.number;
     

           Card.find({$or:[{playerNum: {$lte: numberOfPLayers}}, {playerNum: {"$exists" : false }}]}, function(err, result) {
            result.sort(function(a,b){
                return 0.5 - Math.random()
            })
             // usunięcie 2 kart 
            res.send(JSON.stringify(result));
        } )
    })

    app.get("/getStragglersfromDatabase", function(req,res){

      
         Straggler.find({type: "type__straggler"}, function(err, result) {
          result.sort(function(a,b){
              return 0.5 - Math.random()
          })
           // usunięcie 2 kart 
          res.send(JSON.stringify(result));
      } )
  })
        
   



  let port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("Successfully started on port. " + port);
});