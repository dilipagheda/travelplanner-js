var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const apis = require("./apis")
const BadRequest = require("./bad-request")

const app = express();

app.use(cors());

app.use(express.static(path.resolve("../../dist")));

 app.get("/travel", async function (req, res) {
  const placeName = req.query.placeName
  const date = req.query.date

  try{
    if(!placeName || !date) {
      throw new BadRequest(400,'please provide placeName and travel Date (YYYY-MM-DD)')
    }


    const response = await apis.getData(placeName, date)
    res.status(200).json(response)

  }catch(error) {
    if(error.statusCode) {
      res.status(400).json({error: error.message, code: error.statusCode})
    }else {
      res.status(500).json({error: error.message})
    }
  }

});

app.get("/placeimage", async function(req,res) {
  const placeName = req.query.placeName

  try{
    if(!placeName) {
      throw new BadRequest(400,'please provide a placeName')
    }
  
    const response = await apis.getPixaBayData(placeName)
    res.status(200).json(response)

  }catch(error) {
    if(error.statusCode) {
      res.status(400).json({error: error.message, code: error.statusCode})
    }else {
      res.status(500).json({error: error.message})
    }
  }
});


// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
