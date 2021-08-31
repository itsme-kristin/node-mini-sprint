const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser'); //do I need this????
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  "access-control-max-age": 10

};

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.json());
app.use((req, res, next) => {
  res.set(headers);
  next();
}); //middleware to set headers

// TODO: Fill with strings of your favorite quotes :) DONE
const quotes = [
  'If you\'re always trying to be normal you will never know how amazing you can be.',
  'If you don\'t like something, change it. If you can\'t change it, change your attitude.',
  'You may kill me with your hatefulness, but still, like air, I\'ll rise.',
  'When someone shows you who they are, believe them the first time.',
  'We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty.'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


app.get('/', function (req, res) {
  console.info('redirecting');
  res.redirect(`http://localhost:${port}/quote`);
})

app.get('/quote/' || '/quote', function (req, res) {
  function getOne(err) {
    if (err) {
      res.sendStatus(404);
    } else {
      var quote = quotes[getRandomInt(0, quotes.length)];
      res.status(200).json(quote);
    }
  }
  getOne(null);
})


app.post('/quote/' || '/quote', function (req, res) {
  function addOne(err, newQuote) {
    if (err) {
      res.sendStatus(404);
    } else {
      quotes.push(newQuote.quote);
      res.status(201).send(newQuote.quote);
    }
  }
  addOne(null, req.body);
})

app.listen(port);

console.info('Server is running in the terminal!');
console.info(`Listening on http://localhost:${port}`);
