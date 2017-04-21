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
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) { console.log('uh oh: ' + err); }
    callback( data.split('\n') );
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(sites) {
    callback( sites.includes(url) );
  });

};

exports.addUrlToList = function(url, callback) {
  fs.appendFile( exports.paths.list, url + '\n', {flags: 'a'}, function(err) {
    if (err) {
      console.log(err);
    }
  });

  callback();
};

exports.isUrlArchived = function(url, callback) {
  var url = url.slice(url.indexOf('/') + 1);

  fs.readdir( exports.paths.archivedSites, 'utf8', (err, files) => {
    if (err) {
      console.log('error');
    } else if (files) {
      callback( files.includes(url) );
    }
  });
};

exports.downloadUrls = function(urls) {
  var writePath = exports.paths.archivedSites;
  
  urls.forEach( (url) => {
    console.log('URL: ' + url);
    exports.isUrlArchived(url, function(item) {
      if (item !== true) {
        fs.writeFile(writePath + '/' + url, url, (err) => {
          if (err) { 
            console.log(err); 
          } else { 
            console.log('file written to: ' + writePath + '/' + url); 
          }

        });
      }
    });


  });
};



// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};