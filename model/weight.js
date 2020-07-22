var orm = require("../config/orm.js");

var weight_log = {
    selectAll: function(cb) {
        orm.selectAll("weight_log", function(res) {
          cb(res);
        });
    },
    insertOne: function(col,vals,cb){
        orm.insertOne("weight_log", col, vals, function(res){
          cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) {
      orm.updateOne("weight_log", objColVals, condition, function(res) {
        cb(res);
      });  
    },
    deleteOne: function(condition, cb){
      orm.deleteOne("weight_log", condition, function(res){
        cb(res);
      });
    }
};

module.exports = weight_log;