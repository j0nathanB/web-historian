var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var list = '';
  var stream = fs.createReadStream( exports.paths.list );

  stream.on('data', (data) => {
    list += data;
  });
  stream.on('end', () => {
    var sites = list.split('\n');
    callback(sites);
  });
};

exports.isUrlInList = function(url, callback) {
  var result;

  exports.readListOfUrls( (x) => {
    result = x.includes(url);
    console.log('result: ', result);
    callback(result);
  });

};

exports.addUrlToList = function(url, callback) {
  //add url to list
  // callback(res);
};

exports.isUrlArchived = function(url, callback) {
  // if (exports.paths.archivedSites.includes(url)) {
  //  console.log('url: ' + url + ' is archived');
  //  return true;
  
  // } else {
  //  console.log('url: ' + url + ' is not archived');
  //  exports.isUrlInList(url, callback)
  // }
};

exports.downloadUrls = function(urls) {
};



// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};