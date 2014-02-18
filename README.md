# noSeed

This is a starter MEAN template (MongoDB + ExpressJs + AngularJs + NodeJs) for quickly prototyping web applications.

<br />

## Getting started
1. Clone this repo into a directory on your computer by typing `git clone` followed by this project's url into a terminal. <br />
2. Install the dependencies by running `npm install` in the project's root directory. <br />
3. Go into the `/config` folder and specify the routes to your development and production databases in the `/config/mongo*` and `/config/redis*` files. <br />
4. Start the server by typing `node app.js` into a terminal while in the project's root directory.

<br />

* When you start the server, if you add the option `--environment=production` then your models will connect to your production database. If you leave it out or specify `--environment=development`, they will connect to the development databases you specify in the mongo and redis configuration files.

<br />

* When you start the server, if you add the option `--useSSL=true`, then the server will load the certificates found in the `config/ssl/**` folders and force all traffic to https.

<br /><br />

## What's included
###Server-side Libraries
- express: node server-side framework (https://github.com/visionmedia/express) <br />
- optimist: light-weight option parsing (https://github.com/substack/node-optimist) <br />
- q: library for composing and working with asynchronous promises (https://github.com/kriskowal/q) <br />
- redis: node redis-client (https://github.com/mranney/node_redis) <br />
- redis-url: client for connecting to external redis databases (https://github.com/mranney/node_redis) <br />
- connect-redis: session store for redis (https://github.com/visionmedia/connect-redis) <br />
- mongoose: object-modeling library for MongoDB (https://github.com/LearnBoost/mongoose) <br />
- underscore: javascript utility belt (https://github.com/jashkenas/underscore) <br />
- bcrypt: encryption library (https://github.com/ncb000gt/node.bcrypt.js/) <br />
- passport: authentication library (https://github.com/jaredhanson/passport) <br />
- passport-local: authentication strategy for passport (https://github.com/jaredhanson/passport-local) <br />

<br />

### Client-side Libraries
- angularjs: Javascript MVC (http://angularjs.org/) <br />
- ui-router: routing for angular (https://github.com/angular-ui/ui-router) <br />
- twitter boostrap: responsive design framework (http://getbootstrap.com/) <br />

<br />

## Notes
Developed by <a href='http://twitter.com/ishmaelsalive'>ishmaelthedestroyer</a>. <br />
Special thanks to all the vendors who've created all the third party libraries this seed relies on. <br />

Feedback, suggestions? Tweet me <a href='http://twitter.com/ishmaelsalive'>@IshmaelsAlive</a>. <br />

<br />

## License
Licensed under the MIT license. tl;dr You can do whatever you want with it.