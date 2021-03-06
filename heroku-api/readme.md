## Heroku App - Our API

This is the API app that I deployed to Heroku. It is connected to a PostgreSQL database which I activated also on Heroku. 

First you'll problably need to configure your local development database url, do this in the `server.js` file at line 15.

I provided some commands which I found useful to create/modify tables, rows, etc. Especially the last one if Heroku warns you that your quota is almost exceeded and that they will revoke your rights on the database ;)


## Installation

* `cd` into this directory
* run `npm install`
* run `node server.js`

## Heroku Useful Commands

First install Heroku's CLI which you should find here: [Heroku Toolbelt](https://toolbelt.heroku.com/).

Then after `cd` into your app directory...

#### Add a PostgreSQL database
```
heroku addons:add heroku-postgresql
```

#### Get application logs
```
heroku logs --tail
```

#### Connect to database
```
heroku pg:psql
```


## PSQL Useful Commands

Type those commandes after having logged into the database with the `psql` command.

#### Create database

```
CREATE DATABASE yourdatabase;
```

#### Create table
```
CREATE TABLE measures (
  id serial PRIMARY KEY,
  moisture real,
  temperature real,
  light real,
  time timestamp with time zone default current_timestamp
);
```

#### POST measure
```
INSERT INTO measures (moisture, temperature, light) values (50, 23.5, 600);
```

#### GET measures
```
SELECT * FROM measures;
```

#### PUT/update measure
```
UPDATE measures SET moisture=49 WHERE id=1;
```

#### DELETE measure
```
DELETE FROM measures WHERE id=1;
```

#### Renaming a column
```
ALTER TABLE measures RENAME COLUMN value TO anything;
```

#### Changing column data type
```
ALTER TABLE measures ALTER COLUMN temperature TYPE real;
```

#### Deleting old entries before a certain date
```
DELETE FROM measures WHERE time < ‘2015-09-19 23:30:00’;
```
