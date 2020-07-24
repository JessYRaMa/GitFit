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

  app.get("/api/weight_log", function(req, res) {
    weight.selectLog("username", function(data){
      res.json(data);
      // res.send(data);
      // res.redirect("/weightlog.html");
    });
  });

  app.post("/weightlog.html", function(req, res){
    weight.insertOne(["username", "weight", "height", "age"], [req.body.username, req.body.weight, req.body.height, req.body.age], function(){
      res.redirect("weightlog.html")
    })
  })

  app.put("/:id", function(req,res){
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    weight.updateOne({
      weight: req.body.weight
              }, condition, function() {
      res.redirect("/weightlog.html");
    });
  });

  app.delete("/:id", function(req,res){
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    weight.deleteOne(condition, function(){
      res.redirect("/weightlog.html");
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