const express = require('express');
const bodyParser = require('body-parser');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
const Websocket = require('ws')
const app = express();
const port = process.env.PORT || 3001;

const http = require('http');
const server = http.createServer(app);



const wss = new Websocket.Server({ server });
server.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/api/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    response.send(result);
  });
});

app.get('/api/getComment/:id', function(request, response) {
  
  const  id  =  request.params.id;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/api/getComments', function(request, response) {
  console.log("getting comments");
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.get('/api/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

// app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});

wss.on('connection', function(socket){
  console.log("User Connected, ");
  wss.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  wss.on('getComments', function incoming(message) {
    console.log('received: %s', message);
  });
  wss.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
 });
  // wss.send('hello from the server!');
});