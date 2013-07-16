
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , socket = require('socket.io');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
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

io.sockets.on('connection', function(client){
    console.log('Client connected...');
    //client.emit('messages', {hello: 'world'});
    client.on('messages', function(data) {
        console.log('...incoming...');
        console.log("msg received " + data);
    });
});