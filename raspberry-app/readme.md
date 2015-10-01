## Raspberry Node.js App

This little app is connected to the Arduino via the `serialport` node module. What this app does is POSTing on a regular interval the 3 sensors data to an API deployed on Heroku (you'll have to configure your own API for it to work).

## Installation

* in `server.js`, in the `APIOptions`, provide your API url.
* plug the Arduino to the Raspberry via USB cable.
* power the Rapsberry (Arduino will also be powered).
* find you Raspberry's local IP address and log into it with ssh, so for instance: 
```
ssh pi@192.168.1.23
```
* `cd` into this directory
* run `node server.js`

It should start to print the sensors data coming from the Arduino and POST to your API on the interval defined in the `postInterval` variable.
