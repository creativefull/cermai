var server=require("./system/server"),cermai=new server;cermai.connect(function(a,b){a&&console.log(a),cermai.initHelper(cermai.app),cermai.initSession(cermai.app),cermai.initCermai(cermai.app,b),cermai.run()});