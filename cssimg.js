// .match(/(?:url\()(.*?)(?:\))/igm)

const fs = require('fs');
var stringy = "";

var readable = fs.createReadStream('css/style.css', {
    flags: 'r',
    encoding: null,
    fd: null,
    mode: 0o666,
    autoClose: true
});

readable.on('open', function () {
    readable.on('data', (data) => {
        console.log(data.toString().match(/(?:url\()(.*?)(?:\))/igm));
    });
});