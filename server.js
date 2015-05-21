var express = require("express.io");
var path = require("path");
var app = express();
app.http().io();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.listen(8003, function() {
	console.log("listening on port 8003");
});

//var io = require('socket.io').listen(server);

var users = [];
var messages = [];

// io.sockets.on('connection', function (socket) {
// 	socket.on('sms_submitted', function(data) {
// 		users.push(data.name);
// 		messages.push(data.sms);
// 		socket.emit('sms_response', {users: users, messages: messages});
// 	});
// });

app.io.route('sms_submitted', function(req) {
	console.log(req.data.name);
	console.log(req.data.sms);
	users.push(req.data.name);
	messages.push(req.data.sms);
	app.io.broadcast('new_message', {users: users, messages: messages});
});


app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
		res.render('index', {users: users, messages: messages});
});