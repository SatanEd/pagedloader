// .match(/(?:url\()(.*?)(?:\))/igm)

const fs = require('fs');

var cssDir = 'ro.bunion-fix.com' + "/css";
var ffs = [];
//
// for (itm in x = readDirRec(cssDir)) {
//     if (fs.lstatSync(x[itm]).isFile()) {
//         ffs = ffs.concat(getCssImgs(x[itm]));
//     }
// }

console.log(getCssImgs('ro.bunion-fix.com/css/style.css'));

function getCssImgs(filePath) {
    var stringy;
    var readable = fs.createReadStream(filePath, {
        flags: 'r',
        encoding: null,
        fd: null,
        mode: 0o666,
        autoClose: true
    });

    readable.on('open', function () {
        readable.on('data', (data) => {
            stringy = data.toString().match(/(?:url\()(.*?)(?:\))/igm);
    });
        readable.on('end', () => {
            for (itm in stringy) {
                stringy[itm] = stringy[itm].replace(/"?/ig, '');
                stringy[itm] = stringy[itm].replace(/'?/ig, '');
                stringy[itm] = stringy[itm].replace(/\s?/ig, '');
                stringy[itm] = stringy[itm].replace('url(', '');
                stringy[itm] = stringy[itm].replace(')', '');
                stringy[itm] = stringy[itm].replace('../', '');
            }
        console.log(stringy);
        // return stringy;
        });
    });
}

function readDirRec(dir) {
    var fd = [];

    if (fs.lstatSync(dir).isDirectory()) {
        var newList = fs.readdirSync(dir, {encoding: 'utf8'});

        for (i in newList) {
            if (fs.lstatSync(dir + '/' + newList[i]).isDirectory()) {
                fd = fd.concat(readDirRec(dir + '/' + newList[i]));
            } else {
                fd.push(dir + '/' + newList[i]);
            }
        }
    }
    return fd;
}
