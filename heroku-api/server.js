var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set('port', (process.env.PORT || 5000));

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/margareth';
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('DATABASE_URL', process.env.DATABASE_URL);


router.get('/moistures', function(req, res) {
  pg.connect(connectionString, function(err, client) {
    var query = client.query('SELECT * FROM moistures ORDER BY id ASC');
    var results = [];
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      client.end();
      return res.json({ 'moistures': results });
    });
    if (err) { console.log(err); }
  });
});
router.post('/moistures', function(req, res) {
  var results = [],
    body = req.body.moisture,
    data = { value: body.value };

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query("INSERT INTO moistures (value) values ($1) RETURNING *", [data.value]);
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      client.end();
      return res.status(201).json({ 'moistures': results }).end();
    });
    if (err) { console.log(err); }
  });
});


router.get('/temperatures', function(req, res) {
  pg.connect(connectionString, function(err, client) {
    var query = client.query('SELECT * FROM temperatures ORDER BY id ASC');
    var results = [];
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      client.end();
      return res.json({ 'temperatures': results });
    });
    if (err) { console.log(err); }
  });
});
router.post('/temperatures', function(req, res) {
  var results = [],
    body = req.body.temperature,
    data = { value: body.value };

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query("INSERT INTO temperatures (value) values ($1) RETURNING *", [data.value]);
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      client.end();
      return res.status(201).json({ 'temperatures': results }).end();
    });
    if (err) { console.log(err); }
  });
});

router.get('/lights', function(req, res) {
  pg.connect(connectionString, function(err, client) {
    var query = client.query('SELECT * FROM lights ORDER BY id ASC');
    var results = [];
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      client.end();
      return res.json({ 'lights': results });
    });
    if (err) { console.log(err); }
  });
});
router.post('/lights', function(req, res) {
  var results = [],
    body = req.body.light,
    data = { value: body.value };

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query("INSERT INTO lights (value) values ($1) RETURNING *", [data.value]);
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      client.end();
      return res.status(201).json({ 'lights': results }).end();
    });
    if (err) { console.log(err); }
  });
});


app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
