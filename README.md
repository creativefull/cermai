# cermaiJS
Framework Nodejs With Mongodb
## What it cermaiJS ?
** cermaiJS ** is nodejs framework using mongodb connection
## How to use it ?
First clone this framework (https://github.com/creativefull/cermaiJS)
the open and edit file ** config.js ** on directory config
### Example configuration for application
```
	this.app = {
		host : 'localhost',
		port : 9000
	}
```
#### Example configuration for connection to mongodb
```
	this.connection = {
		host : 'localhost',
		port : 27017,
		db	: 'cermai',
		user : '',
		pwd : ''
	}
```
## Access Handler
open and edit file ** index.js ** on directory routes
>example i want to add page  ** /example **
```
  cermai.get('/example', function(req,res,next) {
    res.send('Hello Word');
  });
```
## Add New Handler
add new file on directory router
>example i add new file **welcome.js** and using basic code
```
function Welcome(db) {
  this.index = function(req,res,next) {
    res.send('Hello Word Using Other Handler');
  })
}
module.exports = Welcome;
```
## Call Handler
open and edit file ** index.js ** on directory routes add new code
>example
```
var WelcomeHandler = require('welcome');
var Welcome = WelcomeHandler(db);

cermai.get('/welcome', Welcome.index);
```
## Render Template
first create file with extention ** jade ** on directory views
```
  res.render('file');
```
## Run CermaiJS
open terminal and type
```
node app.js
```
if you are using nodemon you can run using ** nodemon **
