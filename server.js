const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
var MongoClient = require("mongodb").MongoClient;
var dbo;
let connectionString =
  "mongodb+srv://LakshmiPrasanna:CHInni@123@cluster0.pfyd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
MongoClient.connect(connectionString, { useNewUrlParser: true })
  .then((db) => {
    console.log("Connected to Database");
    dbo = db.db("todo-app-database");
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/todolist", function (req, res) {
  dbo
    .collection("todo-list")
    .find()
    .toArray()
    .then((todos) => {
      res.status(200).send(todos);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/insert", function (req, res) {
  dbo.collection("todo-list").insertOne(
    {
      text: req.body.text,
    },
    function (err, result) {
      if (err) res.send("Error");
      else res.send("Success");
      console.log(req.body);
    }
  );
});
