var fs = require('fs');
var page = require('webpage').create();

var linkToPage = 'http://personalxblog.com/beautyzone/';

page.open(linkToPage, function () {
    page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js', function () {
        var gg = page.evaluate(function () {
            var body = $('body');
            var imgSrc = [];
            var jsSrc = [];
            var cssHref = [];

            $.each($('img'), function (i, it) {
                if ($(it).attr('src')) {
                    imgSrc.push($(it).attr('src').toString());
                }
            });

            $.each($('script'), function (i, it) {
                if ($(it).attr('src')) {
                    jsSrc.push($(it).attr('src').toString());
                }
            });

            $.each($('link'), function (i, it) {
                if ($(it).attr('href')) {
                    cssHref.push($(it).attr('href').toString());
                }
            });

            $('body a').attr('href', '');
            body.append('<script src="js/cookie.js"></script>');
            body.append('<script src="js/referal.js"></script>');
            body.append("<script>" +
                "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)}" +
                ",i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];" +
                "a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');" +
                "ga('create', 'UA-45631401-20', 'auto');ga('send', 'pageview');" +
                "</script>");

            return [$('html').html().toString(), imgSrc, jsSrc, cssHref];
        });
        // console.log(gg);
        fs.write('index.html', "<!DOCTYPE html>\n<html>\n" + gg[0].toString() + "\n</html>",function () {

        });
        phantom.exit();
    });
});

page.onConsoleMessage = function(msg) {
    console.log('Page title is ' + msg);
};