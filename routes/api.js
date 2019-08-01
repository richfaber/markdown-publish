'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const dirTree = require("directory-tree");

const router = express.Router();

let DOCUMENT_ROOT = path.resolve(`./document`);

/* GET Local Tree */
router.get("/document/tree", function (req, res, next) {

    let documentTree = dirTree( DOCUMENT_ROOT, { normalizePath: true });

    res.setHeader('Content-Type', 'application/json');
    res.json( documentTree );

});


module.exports = router;
