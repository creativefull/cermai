# CermaiJS
Framework Nodejs With Mongodb
## What it cermaiJS ?
**cermaiJS** is nodejs framework using mongodb connection
## How to use it ?
First clone this framework.
open and edit file **config.json** on directory config
### Example configuration for application
```
	app = {
		host : 'localhost',
		port : 9000
	}
```
#### Example configuration for connection to mongodb
```
	connection = {
		host : 'localhost',
		port : 27017,
		db	: 'cermai',
		user : '',
		pwd : ''
	}
```
### Example Connection with replica mongodb
before you using this connection you must create replica in mongodb shell
```
 connection = {
  host : 'localhost',
  port : 27017,
  db : 'cermai',
  user : '',
  pwd : '',
  replica : 'cermai',
  members : [
   { host : 'localhost', port : 27018},
   { host : 'localhost', port : 27019}
  ]
 }
```
## Access Handler
open and edit file **index.js** on directory routes
*example i want to add page  **/example***
```
  cermai.get('/example', function(req,res,next) {
    res.send('Hello World');
  });
```
## Add New Handler
add new file on directory router
*example i add new file **welcome.js** and using basic code*
```
function Welcome(db) {
  this.index = function(req,res,next) {
    res.send('Hello World Using Other Handler');
  })
}
module.exports = Welcome;
```
## Call Handler
open and edit file **index.js** on directory routes add new code
*example*
```
var WelcomeHandler = require('welcome');
var Welcome = WelcomeHandler(db);

cermai.get('/welcome', Welcome.index);
```
## Render Template
first create file with extention **jade** on directory views
```
  res.render('file');
```
## Run CermaiJS
open terminal and type
```
node app.js
```
if you are using nodemon you can run using **nodemon**

# CermaiJS Helper
## Helper Login
if you want to add login local like passport-local you can use this code 
```
req.cermai.login(collection, data, req, callback);
```

example code
```
var ModelUser = db.collections('users');
var username = req.body.user;
var password = req.body.pwd;

req.cermai.login(ModelUser, {username : username, password : password}, req, function(err, result) {
 if (result == true) {
  ........ DO something when login success .......
 }
 else {
  ........ DO something when login failed .......
 }
});
```
## Check Auth
add middleware on you handler, example code
```
cermai.get('/main', cermai.isAuth, Welcome.index);
```
before you add middleware on handler , setting login page on file **config.js**
default login page on **CermaiJS** is (/login)
```
this.page = {
 login : '/login'
}
```
## Helper Logout
```
req.cermai.logout(req, res, urlToRedirect);
```
example
```
req.cermai.logout(req,res, '/login');
```
## Helper Handle Ajax Request Page
if you use template using ajax with example link (http://localhost:8000/main/#/dashboard) then when you want access (http://localhost:8000/dashboard) all css and javascript not loaded on that page , how to handle it ?
```
req.cermai.handleAjax(req,res);
```
add this code for every your router ajax
