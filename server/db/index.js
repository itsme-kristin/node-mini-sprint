var mysql = require('mysql');

dbConnection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'quoteCollection'
});

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
// }

// function getTotal(callback) {
//   var queryString = 'SELECT COUNT(*) FROM quotes';
//   dbConnection.query(queryString, (err, number) => {
//     if (err) {
//       callback(err);
//     } else {
//       console.log('in total:', number);
//       callback(null, number);
//     }
//   })
// }

function getQuote(callback) {
  // var quoteId = await getRandomInt(1, getTotal(function(err, number) {
  //   return number;
  // }))
  // console.log('after quoteId:', quoteId['COUNT(*)']);
  var queryString = 'SELECT quote FROM quotes ORDER BY RAND() LIMIT 1';
  dbConnection.query(queryString, (err, quote) => {
    if (err) {
      callback(err);
    } else {
      callback(null, quote);
    }
  // callback(quote);
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
