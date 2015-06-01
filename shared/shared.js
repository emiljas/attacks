var mysql = require("mysql");

module.exports = {

  getUser: function() {
    return {
      id: 1,
      token: "H;GJ-K345K@+JHLGHF$435436FD&F"
    };
  },

  executingSql: function(query) {
    return new Promise(function(resolve, reject) {
      var connection = mysql.createConnection({
        host     : 'localhost',
        database : 'attacks',
        user     : 'root',
        password : '1234567',
        multipleStatements: true
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

};
