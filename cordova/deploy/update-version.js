var fs = require("fs");
var file = fs.readFileSync("../config.xml", "utf8");

var res = /(widget .* version\="\d+\.\d+).(\d+)"/i.exec(file);
var oldString = res[0];
var newString = res[1] + "." + (parseInt(res[2]) + 1) + '"';
file = file.replace(oldString, newString);

fs.writeFileSync("../config.xml", file);