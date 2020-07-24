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

  app.get("/api/weight", function(req, res) {
    weight.selectAll(function(data){
      res.json(data);
      // res.send(data);
      // res.redirect("/weightlog.html");
    });
  });
  app.get("/api/weight?username=:username", function(req, res) {
    weight.selectLog(req.params.username, function(data){
      var chosen = req.params.username;

  console.log(chosen);

  for (var i = 0; i < data.length; i++) {
    if (chosen === data[i].username) {
      return res.json(data[i]);
    }
  }

  return res.json(false);

    });
  });

  app.post("/api/weight", function(req, res){
    weight.insertOne(["username", "weight", "height", "age"], [req.body.username, req.body.weight, req.body.height, req.body.age], function(data){
      res.json(data);
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