var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var redisClient = require('redis').createClient();

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(logger('combined'));

// GET /comments - fetches all the comments
app.get('/comments', function(req, res) {
  redisClient.lrange('comments', 0, -1, function(err, comments) {
    res.json(comments.reverse().map(function(comment) { return JSON.parse(comment); }));
  });
});

// POST /comments - adds a new comment
app.post('/comments', function(req, res) {
  redisClient.lpush('comments', JSON.stringify(req.body));
  redisClient.lrange('comments', 0, -1, function(err, comments) {
    res.json(comments.reverse().map(function(comment) { return JSON.parse(comment); }));
  });
});

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000/');
});
