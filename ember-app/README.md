# Ember.js App

This is an Ember app.  
Follow the instructions bellow for the installation.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `cd` into this directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Configure

These steps needs to be configured in order to make the app actually work.

* in `config/environment.js` go into the `contentSecurityPolicy` object and in `'connect-src'` add the other domains with which your app needs to communicate. For instance, in my case I added my production API url (an Heroku app) and also my local development API URL which was http://localhost:5000/api/
So, mine is looking like this: 
```
...
'connect-src': "'self' http://localhost:5000/api/ http://my-heroku-api.herokuapp.com/api/"
...
```
* in `app/models`, you need to provide your API's urls so each model is actually able to retrieve data. For instance the `light.js` file which defines the `Light` model performs a `getJSON` which should point to **your own Heroku app url**. Do the same for the other models.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Deploy with Heroku it's super simple and free ;)  
[http://www.ember-cli.com/user-guide/#deployments](http://www.ember-cli.com/user-guide/#deployments)

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

