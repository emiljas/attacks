var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');
var users = require('./routes/users');

var mysql = require("mysql");

var app = express();

var fs = require("fs");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);




var currentUserId = 1;

var test = express.Router();
test.get('/', function(req, res, next) {
  var input = req.query.input;
  console.log(input);

  var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'attacks',
    user     : 'root',
    password : '1234567',
    multipleStatements: true //this is bad!
  });
  connection.connect();

  var sqlQuery = "select * from note where userId = " + currentUserId + " and (title like '%" + input + "%' or content like '%" + input + "%');";
  connection.query(sqlQuery, function(err, rows, fields) {
    console.log(err);
    var ret = {
      notes: rows ? rows : [],
      sqlQuery: sqlQuery
    };
    res.json(ret);
  });

  connection.end();
});
app.use('/test', test);




var addNote = express.Router();
addNote.post("/", function(req, res, next) {
  var query = "insert into note(title, content, colorRGB, userId) values(" +
    "'" + req.body.title + "', " +
    "'" + req.body.content + "', " +
    "'FF9', " +
    currentUserId +
  ")";
  executingSql(query)
  .then(function() {
    res.json({});
  });
});
app.use("/addNote", addNote);

var resetDb = express.Router();
resetDb.get("/", function(req, res, next) {
  fs.readFile(path.join(__dirname, "database.sql"), "utf8", function(err, query) {
    executingSql(query).then(function() {
      res.json({});
    });
  });
});
app.use("/resetDb", resetDb);

function executingSql(query) {
  return new Promise(function(resolve, reject) {
    var connection = mysql.createConnection({
      host     : 'localhost',
      database : 'attacks',
      user     : 'root',
      password : '1234567',
      multipleStatements: true //this is bad!
    });
    connection.connect();

    connection.query(query, function(err, rows, fields) {
      if(err) {
        console.log(err);
        reject(err);
      }
      else
        resolve(rows);
    });

    connection.end();
  });
}




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
