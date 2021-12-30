const express = require('express');
const bodyParser = require('body-parser');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');
const port = process.env.PORT || 3001;


const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);

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

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});

// Websocket support - Add
io.on('connection', socket => {

  socket.on('addComment', (msg)=>{
    comment.createComment(msg).then(() => {
      // Need to emit all comments. Client side will filter out redundant ones.
      comment.getComments().then(allComments => {
        io.emit('commentAdded', allComments);
      });
    });
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});