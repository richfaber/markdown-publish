'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const showdown = require('showdown');

let DOCUMENT_ROOT = path.resolve(`./document`);
let shClassMap = {
    h1: 'h1 header',
    h2: 'h2 header',
    ul: 'ul list',
    li: 'li item',
    a: 'a anchor'
};
let shTagBinding = Object.keys(shClassMap)
    .map(key => ({
        type: 'output',
        regex: new RegExp(`<${key}(.*)>`, 'g'),
        replace: `<${key} class="${shClassMap[key]}" $1>`
    }));
let mdConverter = new showdown.Converter({
    noHeaderId: true,
    strikethrough: true,
    tables: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
    extensions: [...shTagBinding]
});

/* GET Document page. */
router.get("/:directory*?/:file", function (req, res, next) {

    var file = decodeURIComponent( __dirname + '/../document/' + req.path );

    fs.readFile( file, 'utf8', function(error, data) {

        if(error) {
            console.error(error);
        } else {
            return res.render( 'document/index.njk', { markdown: mdConverter.makeHtml(data) } );
        }

        res.end();

    });

});


module.exports = router;
