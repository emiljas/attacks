var express = require('express');
var shared = require("../shared/shared.js");

var notes = express.Router();

notes.get('/filter', function(req, res, next) {
  var input = req.query.input;

  if(shared.getUser().token !== req.cookies.auth)
    res.status(401).send('invalid token');
  else {
    var sqlQuery = "select * from note where userId = " + shared.getUser().id + " and (title like '%" + input + "%' or content like '%" + input + "%');";
    shared.executingSql(sqlQuery)
    .then(function(rows) {
      var ret = {
        notes: rows ? rows : [],
        sqlQuery: sqlQuery
      };
      res.json(ret);
    })
    .catch(console.log.bind(console));
  }
});

notes.post("/add", function(req, res, next) {
  if(shared.getUser().token !== req.cookies.auth)
    res.send(401, 'invalid token');
  else {
    var query = "insert into note(title, content, colorRGB, userId) values(" +
      "'" + (req.body.title || "") + "', " +
      "'" + (req.body.content || "") + "', " +
      "'FF9', " +
      shared.getUser().id +
    ")";
    shared.executingSql(query)
    .then(function() {
      res.json({});
    })
    .catch(console.log.bind(console));
  }
});

module.exports = notes;
