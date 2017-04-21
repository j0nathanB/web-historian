var archive = require('../helpers/archive-helpers');
// var httpHelper = require('./http-helpers.js');
var fs = require('fs');
var path = require('path');
var scraper = require('website-scraper');


exports.getWebsites = function (data) {
  scraper( ({urls: ['google.com'], directory: archive.paths.archivedSites}), 
    (error, result) => { error ? console.log('ERROR: ', error) : console.log('RESULT: ', result); });
};

// get list of URLs
// archive.readListOfUrls( exports.getWebsites );
  // for each URL
    // visit page
    // download file
    // save file to archive 
// download URLs
// ???
// profit!

