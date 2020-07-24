var orm = require("../config/orm.js");

var new_user = {
    selectLog: function(cb) {
        orm.selectLog("new_user", function(res) {
          cb(res);
        });
    },
    insertOne: function(col,vals,cb){
        orm.insertOne("new_user", col, vals, function(res){
          cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) {
      orm.updateOne("new_user", objColVals, condition, function(res) {
        cb(res);
      });  
    },
    deleteOne: function(condition, cb){
      orm.deleteOne("new_user", condition, function(res){
        cb(res);
      });
    }
  };
  
  module.exports = new_user;