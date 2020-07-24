var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static('views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./controllers/api-routes")(app);
require("./controllers/html-routes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: http://localhost:" + PORT);
  });