var zip = new require('node-zip')();
var fs = require("fs");

var files = [];

fs.readFile('index.js', (err, data) => {
    if (data) {
        files.push(data);
    }
});

fs.readFile('main.js', (err, data) => {
    if (data) {
        files.push(data);
    }

    zip.file('indexs.js', files[0]);
    zip.file('indexz.js', files[2]);
    var data = zip.generate({base64:false,compression:'DEFLATE'});
    fs.writeFileSync('one.zip', data, 'binary');
});
