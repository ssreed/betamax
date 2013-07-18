
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , socket = require('socket.io')
  , redis = require('redis');

var app = express();
var db = redis.createClient();
var af_port = process.env.VMC_APP_PORT || 1337;
var local_port = process.env.PORT || 3000;

// all environments
app.set('port', local_port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about', routes.about);
app.get('/idea', routes.idea);
app.post('/save', routes.saveIdea);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io  = socket.listen(server);
var clients = [];
// this is a storage area for active clients, 
// on connection clients are pushed here 
// and on disconect they should be removed. (I didn't do this part)

io.sockets.on('connection', function(client){
    //pushing clinet to our clients[]
    clients.push(client);
    console.log('Client connected...');

    client.on('messages', function(data) {
        console.log('...incoming...');
        console.log("msg received " + data);

        //This is the reason for storing clietns, so we can emit to all active rather than the only one.
        for (var i = clients.length - 1; i >= 0; i--) {
          clients[i].emit('messages', data)
          console.log(clients[i].id + " has connected");

        };
        console.log(clients.length);
        // Save to redis here
    });

    client.on('disconnect', function(){
        console.log('Client ' + clients.pop().id + ' has disconnected.');
        console.log("There are now " + clients.length + " ");
    });
});