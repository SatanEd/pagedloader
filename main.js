var fs = require('fs');

const exec = require('child_process').exec;
exec('phantomjs index.js', function(error, stdout, stderr) {
    if (error) {
        console.error(error);
        return;
    }
    console.log('start to write');

    fs.writeFileSync('log.txt', stdout, 'utf-8');
    console.log('DONE!');
    console.log(stdout);
console.log(stderr);
});

