
var express = require('express'); // Do Not Edit
var app = express();              // Do Not Edit
var bcrypt = require('bcrypt');
// ----

//*Basic sercuirty meeasures in helmet

const helmet = require('helmet');
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0'}));
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
const ninetyDaysInMilliseconds = 90*24*60*60*1000;
app.use(helmet.hsts({maxAge: ninetyDaysInMilliseconds}))
app.use(helmet.dnsPrefetchControl())
app.use(helmet.noCache());

// ---- DO NOT EDIT BELOW THIS LINE ---------------------------------------

module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
