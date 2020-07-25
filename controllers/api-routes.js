// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information for the weight log
// ===============================================================================

var weight = require("../model/weight");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  var allUsers = [];

  app.get("/api/weight", function(req, res) {
    weight.selectAll(function(data){
      res.json(data);
    });
  });

  app.get("/api/weight/:username", function(req, res) {
  weight.selectLog("username",req.params.username, function(data){
     res.json(data);
  });
});

  app.post("/api/weight", function(req, res){
    weight.insertOne(["username", "logged_at", "weight", "height", "age"], [req.body.username, req.body.logged_at, req.body.weight, req.body.height, req.body.age], function(){
      // res.json(data);
      var newUser = req.body;
      console.log(newUser);
      allUsers.push(newUser);
      res.json(allUsers);
    })
  })

  app.put("/api/weight/:id", function(req,res){
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    weight.updateOne({
      weight: req.body.weight
              }, condition, function() {
                res.json();
      // res.redirect("/api/weight");
    });
  });

  app.delete("/api/weight/:id", function(req,res){
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    weight.deleteOne(condition, function(){
      res.json();
      // res.redirect("/weightlog.html");
    });
  });
  

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------
  
  // add record to db using weight model to create records
  // send redirect response to direct to /weight_log
  // res.redirect()
  
  }