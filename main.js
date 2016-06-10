var fs = require('fs');
var http = require('http');
var https = require('https');
var url = require("url");
var path = require("path");

const exec = require('child_process').exec;
exec('phantomjs index.js http://google.com/', function(error, stdout, stderr) {
    var wpSource;

    if (error) {
        console.error(error);
        return;
    }
    console.log('start to write');

    if (stdout) {
        wpSource = JSON.parse(stdout);
    }

    // fs.writeFileSync('jj.json', stdout);
    // fs.writeFileSync('indexNev.html', "<!DOCTYPE html>\n<html>\n" + wpSource.content + "\n</html>");

    // fs.write('indexss.html', "<!DOCTYPE html>\n<html>\n" + gg[0].toString() + "\n</html>", function () {
    //
    // });

    // for (i = 1; i < wpSource.length; i++) {
    //     for (itm in wpSource[i]) {
    //         var fName  = path.basename(url.parse(itm).pathname);
    //
    //         fs.readFile(itm);
    //     }
    // }
    console.log(wpSource.jss[0].split('/'));

    console.log('DONE!');
console.log(stderr);
});

