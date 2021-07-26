require('dotenv').config();
const express = require("express");
const socketIo = require("socket.io");
var bodyParser = require("body-parser");
var path = require("path")
var uuid = require('uuid-random');
const { uniqueNamesGenerator, adjectives, colors, animals, names } = require('unique-names-generator');

const port = process.env.PORT || 4001;
const index = require('./routes/index');

const app = express();

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', 'localhost:', port);
});

app.use(index);
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST']
  }
});

var chatRoomData = [];
var connectedClients = {};

io.on("connection", socket => {
  console.log("a user connected", socket);
  socket.emit("FromAPI", new Date());
  socket.on("disconnect", () => {
    console.log("a user disconected");
  })
})

