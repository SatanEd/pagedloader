var fs = require('fs');

const exec = require('child_process').exec;
exec('phantomjs index.js http://google.com/', function(error, stdout, stderr) {
    if (error) {
        console.error(error);
        return;
    }
    console.log('start to write');

    fs.writeFileSync('jj.json', stdout);
    // fs.writeFileSync('indexNev.html', "<!DOCTYPE html>\n<html>\n" + JSON.parse(stdout).content + "\n</html>");

    console.log('DONE!');
    console.log(stdout);
console.log(stderr);
});

