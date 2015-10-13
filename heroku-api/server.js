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
// provide your own local development database here if needed (probably needed)
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/your-db-name';
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('DATABASE_URL', process.env.DATABASE_URL);

// POST endpoint - to insert a new measure in the measures table
router.post('/measures', function(req, res) {
  var results = [];
  var data = {
    moisture    : req.body.measure.moisture,
    temperature : req.body.measure.temperature,
    light       : req.body.measure.light
  };

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query("INSERT INTO measures (moisture, temperature, light) values ($1, $2, $3) RETURNING *", [data.moisture, data.temperature, data.light]);
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      client.end();
      return res.status(201).json({ 'measures': results }).end();
    });
    if (err) { console.log(err); }
  });
});

// GET endpoint - to retrieve a collection of measures
router.get('/measures', function(req, res) {
  pg.connect(connectionString, function(err, client) {
    var query = client.query('SELECT * FROM measures ORDER BY id ASC');
    var results = [];
    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      client.end();
      return res.json({ 'measures': results });
    });
    if (err) { console.log(err); }
  });
});


app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
