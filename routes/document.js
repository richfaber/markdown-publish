'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var showdown = require('showdown');
var shClassMap = {
    h1: 'h1 header',
    h2: 'h2 header',
    ul: 'ul list',
    li: 'li item',
    a: 'a anchor'
};
const shTagBinding = Object.keys(shClassMap)
    .map(key => ({
        type: 'output',
        regex: new RegExp(`<${key}(.*)>`, 'g'),
        replace: `<${key} class="${shClassMap[key]}" $1>`
    }));
var mdConverter = new showdown.Converter({
    noHeaderId: true,
    strikethrough: true,
    tables: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
    extensions: [...shTagBinding]
});

/* GET Document page. */
router.get("/:directory*?/:file", function (req, res, next) {

    var file = (req.params.directory) ? `${req.params.directory}/${req.params.file}` : req.params.file;
    fs.readFile(path.resolve(`./document/${file}.md`), 'utf8', function(error, data) {

        if(error) {
            console.error(error);
        } else {
            return res.render( 'document/index.njk', { markdown: mdConverter.makeHtml(data) } );
        }

        res.end();

    });

});

module.exports = router;
