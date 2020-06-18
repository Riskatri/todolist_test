var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors());
require("./router/router.js")(app);
// const db = require("./config/db.js");
// const Role = db.role;

// //force: true will drop the table if it already exists (comment this part after first run, to disable migration)
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
//   //   //   initial();
// });
//require('./app/route/project.route.js')(app);
// Create a Server
var server = app.listen(7000, "127.0.0.1", function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
