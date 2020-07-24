// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information for the weight log
// ===============================================================================

var weight = require("../model/weight");
var newUser = require("../model/new_user");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api", function(req, res) {
    res.json(weight);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------

  app.post("/api/weight", function(req, res) {

  })

  app.post("/weightlog", function(req, res) {
  res.send ("Hello World!")
  // add record to db using weight model to create records
  // send redirect response to direct to /weight_log
  res.redirect()
  })

  

}