var mysql = require('mysql');

dbConnection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'quoteCollection'
});

function getQuote(callback) {
  var queryString = 'SELECT quote FROM quotes ORDER BY RAND() LIMIT 1';
  dbConnection.query(queryString, (err, quote) => {
    if (err) {
      callback(err);
    } else {
      callback(null, quote);
    }
  })
}

function addQuote(params, callback) {
  var queryString = 'INSERT INTO quotes(quote) values (?)';
  dbConnection.query(queryString, params, (err, quote) => {
    if (err) {
      callback(err);
    } else {
      callback(null, quote);
    }
  })
}

dbConnection.connect(
  (error) => {
    if (error) {
      console.log(error)
    } else {
      console.info('connected to the database!')
    }
  }
);

module.exports = {
  dbConnection,
  getQuote,
  addQuote
}
