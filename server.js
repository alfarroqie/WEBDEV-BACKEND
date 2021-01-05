const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = (req, callback) => {
  callback(null, {
    origin : req.header('Origin'),
    credentials : true
  })
  //origin: "http://localhost:8083"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// sync
const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to News Travel App" });
});


app.use('/app/imageUpload', express.static(path.join(__dirname, 'app', 'imageUpload')));


// require routes for API
require("./app/routes/weathers.routes")(app);
require("./app/routes/news.routes")(app);
require("./app/routes/categorys.routes")(app);
require("./app/routes/users.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});