var weight = require("../model/weight");


module.exports = function(app) {
 
  var allUsers = [];

  app.get("/api/weight", function(req, res) {
    weight.selectAll(function(data){
      res.json(data);
    });
  });

  app.post("/api/weight", function(req, res){
    weight.insertOne(["username", "logged_at", "weight", "height", "age"], [req.body.username, req.body.logged_at, req.body.weight, req.body.height, req.body.age], function(){
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
    });
  });

  app.delete("/api/weight/:id", function(req,res){
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    weight.deleteOne(condition, function(){
      res.json();
    });
  }); 
}