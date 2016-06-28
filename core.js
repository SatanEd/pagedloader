const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require("url");
const path = require("path");
const exec = require('child_process').exec;
var paths = [], resKeys;
var projectDir;

module.exports = getPage;

function getPage (pgLink) {
    var address = pgLink;
    var projectName = address.split('/')[2];
    projectDir = projectName + '/';

    if (!fs.existsSync(projectName)) {
        fs.mkdirSync(projectName, function (err, folder) {
            if (err) {
                console.error(`Can't create folder with name "${projectName}"`);
            } else if (folder) {
                projectDir = folder + '/';
            }
        });
    }

    exec(`phantomjs index.js ${address}`, function(error, stdout, stderr) {
        var wpSource;

        if (error) {
            console.error(error);
            return;
        }
        console.log('start to write ');

        if (stdout) {
            wpSource = JSON.parse(stdout, true);
        }

        fs.writeFileSync(projectDir + 'index.html', "<!DOCTYPE html>\n<html>\n" + wpSource.content + "\n</html>");

        for (i = 1; i < wpSource.length; i++) {
            for (itm in wpSource[i]) {
                var fName  = path.basename(url.parse(itm).pathname);

                fs.readFile(itm);
            }
        }

        resKeys = Object.keys(wpSource);

        for (i = 1; i < resKeys.length; i++) {
            for (itms in wpSource[resKeys[i]]) {
                if (wpSource[resKeys[i]][itms].substring(0,4) != 'http') {
                    wpSource[resKeys[i]][itms] = address + wpSource[resKeys[i]][itms];
                }
                httpGet(wpSource[resKeys[i]][itms]);
            }
        }

        console.log('DONE!');
    });
}

function httpGet(filePath) {
    var outdirs = ['img', 'css', 'js'];
    var method = http, outdir = 'img', ext;
    var fileName = path.basename(filePath);

    if (fileName.search(/\?/)) {
        fileName = fileName.split('?')[0];
    }

    if (path.extname(fileName)) {
        ext = path.extname(fileName);
    } else {
        ext = 'none';
    }

    if (outdirs.indexOf(ext.substring(1)) >= 0) {
        outdir = outdirs[outdirs.indexOf(ext.substring(1))]
    }

    if (filePath.substring(0,6) == 'https:') {
        method = https;
    }

    if (!fs.existsSync(projectDir + outdir)) {
        fs.mkdirSync(projectDir + outdir, (err, folder) => {
            if (err) {
                console.error(`Folder with name ${projectDir + outdir} already exists`);
            }
        });
    } else {
        console.error(`Folder with name ${outdir} already exists`);
    }

    method.get(filePath, (res) => {
        var writer = fs.createWriteStream(`${projectDir + outdir}/${fileName}`, {
            flags: 'w',
            fd: null,
            mode: 0o777,
            autoClose: true
        });

    res.on('data', function (chunk) {
        writer.write(chunk);
    });
    res.on('end', function () {
        console.log(`Done - ${fileName}`);
    });
    res.on('error', function () {
        console.error(`Error - ${fileName}`);
    });
});
};