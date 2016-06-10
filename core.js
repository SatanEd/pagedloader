const http = require('https');
const fs = require('fs');

http.get('https://fonts.googleapis.com/css?family=Roboto:400,700,500&subset=latin-ext,latin', (res) => {
    var writer = fs.createWriteStream('pic.css', {
        flags: 'w+',
        fd: null,
        mode: 0o666,
        autoClose: true
    });
        res.on('data', function (chunk) {
            writer.write(chunk);
    });
    res.on('end', function () {
        console.log("end");
    });
});