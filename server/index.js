const http = require('http');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  "access-control-max-age": 10

};

const port = 3001;

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

const handleRequest = function(req, res) {
  console.log(`Endpoint: ${req.url} Method: ${req.method}`);
  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
  }

  // TODO: GET ONE -  DONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method === "GET") {
    res.writeHead(200, {...headers, Location: `http://localhost:${port}/quote`});
    var quote = quotes[getRandomInt(0, quotes.length)];
    res.end(quote);

  }
  // TODO: POST/CREATE - DONE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method === "POST") {
    var body = '';
    res.writeHead(201, {...headers, Location: `http://localhost:${port}/quote`});
    req.on('data', (chunk) => {
      body += (chunk);
    })
    req.on('end', () => {
      quotes.push(JSON.parse(body));
    })
    res.end();
  }

  else if (req.method === "OPTIONS") {
    console.log('redirecting');
    res.writeHead(202, {...headers, Location: `http://localhost:${port}/quote`})
    res.end();
  }
  //CATCH ALL ROUTE
  else {
    res.writeHead(404, {...headers, Location: `http://localhost:${port}/quote`});
    res.end('Page not found');

  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
