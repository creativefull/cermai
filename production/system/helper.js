module.exports=exports=function(a,b,c){var d=require("../config/helper.json"),e=require("fs"),f=(require("path"),d.autoload||!1),g=d.helper||[];1==f?(g=[],e.readdir("../helper/",function(b,d){d.forEach(function(a){"index.js"!=a&&g.push(a.substring(0,parseInt(a.length-3)))}),g.forEach(function(b){var c=require("../helper/"+b);a[b]=new c}),c()})):(g.forEach(function(b){var c=require("./"+b);a[b]=new c}),c())};