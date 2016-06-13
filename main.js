var fs = require('fs');
var http = require('http');
var https = require('https');
var url = require("url");
var path = require("path");
var paths = [];

const exec = require('child_process').exec;
exec('phantomjs index.js http://google.com/', function(error, stdout, stderr) {
    var wpSource;

    if (error) {
        console.error(error);
        return;
    }
    console.log('start to write ');

    if (stdout) {
        wpSource = JSON.parse(stdout);
    }

    // fs.writeFileSync('jj.json', stdout);
    // fs.writeFileSync('indexNev.html', "<!DOCTYPE html>\n<html>\n" + wpSource.content + "\n</html>");
    //
    // fs.write('indexss.html', "<!DOCTYPE html>\n<html>\n" + gg[0].toString() + "\n</html>", function () {
    //
    // });
    //
    // for (i = 1; i < wpSource.length; i++) {
    //     for (itm in wpSource[i]) {
    //         var fName  = path.basename(url.parse(itm).pathname);
    //
    //         fs.readFile(itm);
    //     }
    // }

    // paths = [wpSource.csss, wpSource.imgs, wpSource.jsss];
    //
    // var getSource = (lnk) => {
    //     if (lnk) {
    //         var lnkSep = lnk.split('/');
    //         var protocol = lnkSep[0], ext;
    //         var fileName = path.basename(lnk);
    //
    //         if (fileName.search(/\?/)) {
    //             fileName = fileName.split('?')[0];
    //         }
    //
    //         if (path.extname(fileName) == '') {
    //             ext = path.extname(fileName);
    //         } else {
    //             ext = 'none';
    //         }
    //
    //         if (protocol == 'http:') {
    //
    //         } else if (protocol == 'https:') {
    //
    //         } else {
    //
    //         }
    //     } else {
    //         return 'Link is undefined';
    //     }
    // }

    var httpGet = (filePath, fileName, ext, outdir) => {
        var method = http;
        if (filePath.substring(0,6) == 'https') {
            method = https;
        }

        if (!fs.existsSync(outdir)) {
            fs.mkdirSync(outdir, (err, folder) => {
                if (err) {
                    console.error(`Folder with name ${outdir} already exists`);
                }
            });
        }

        method.get(filePath, (res) => {
            var writer = fs.createWriteStream(`${outdir}/${fileName + ext}`, {
                flags: 'w+',
                fd: null,
                mode: 0o666,
                autoClose: true
            });

            res.on('data', function (chunk) {
                writer.write(chunk);
            });
            res.on('end', function () {
                console.log(`Done - ${fileName + ext}`);
            });
            res.on('error', function () {
                console.error(`Error - ${fileName + ext}`);
            });
        });
    };


    // console.log(wpSource.jss[0].split('/'));

    console.log('DONE!');
console.log(stderr);
});

