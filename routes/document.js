'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var showdown = require('showdown');
var classMap = {
    h1: 'ui large header',
    h2: 'ui medium header',
    ul: 'ui list',
    li: 'ui item',
    a: ''
};
const bindings = Object.keys(classMap)
    .map(key => ({
        type: 'output',
        regex: new RegExp(`<${key}(.*)>`, 'g'),
        replace: `<${key} class="${classMap[key]}" $1>`
    }));
var mdConverter = new showdown.Converter({
    noHeaderId: true,
    strikethrough: true,
    tables: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
    extensions: [...bindings]
});

/* GET home page. */
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
