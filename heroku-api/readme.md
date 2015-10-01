This is the Margareth API.  
[http://margareth-api.herokuapp.com](margareth-api.herokuapp.com)

## Heroku Useful Commands

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

#### Create database

```
CREATE DATABASE moistures;
```

#### Create table
```
CREATE TABLE temperatures (
  id serial PRIMARY KEY,
  value int,
  time timestamp with time zone default current_timestamp
);
```

#### POST moisture
```
INSERT INTO moistures (percent) 
values (50);
```

#### GET moistures
```
SELECT * FROM moistures;
```

#### PUT moisture
```
UPDATE moistures SET value=49 WHERE id=1;
```

#### DELETE moisture
```
DELETE FROM moistures WHERE id=1;
```

#### Renaming a column
```
ALTER TABLE moistures RENAME COLUMN percent TO value;
```

#### Changing column data type
```
ALTER TABLE temperatures ALTER COLUMN value TYPE real;
```

#### Deleting old entries before a certain date
```
DELETE FROM moistures WHERE time < ‘2015-09-19 23:30:00’;
```
