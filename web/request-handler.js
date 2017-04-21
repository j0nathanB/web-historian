var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var url = require('url');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  var method = req.method;
  console.log('handing ' + method + ' request');

  if (method === 'GET' && req.url === '/') {

    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        res.writeHead(200, httpHelper.headers);
        res.end(data);
      }
    });
    
  } else if (method === 'POST') {
    var incomingMessage = '';
    req.on('data', function (data) {
      incomingMessage += data;
    });

    req.on('end', function() {
      var url = incomingMessage.slice(incomingMessage.indexOf('=') + 1);
      fs.appendFile(archive.paths.list, url + '\n', {flags: 'a'}, function(err) {
        if (err) {
          console.log(err);
        }
      });

      fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          res.writeHead(302, httpHelper.headers);
          res.end(data);
        }
      });
    });
    

  } else if (method === 'GET' && req.url !== '/') {
    var url = req.url.slice(1);
    console.log('get req!');

    archive.isUrlArchived(url, function(result) {
      if (result) {
        console.log('url is archived!');
        fs.readFile(archive.paths.archivedSites + req.url, 'utf8', (err, data) => {
          if (err) {
            console.log(err);
          }
          if (data) {
            res.writeHead(200, httpHelper.headers);
            res.end(data);
          }
        });



      } else {
        console.log('url not in archive');


        fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf8', (err, data) => {
          if (err) {
            console.log(err);
          }
          if (data) {
            res.writeHead(404, httpHelper.headers);
            res.end(data);
          }
        });
      }
    });

  }

};






  //get request's query
  //get request's method(all POST?)

  //check if url we're searching for is in the archive
    //isUrlArchived(req.url, ???)
    //isUrlInList



  // use archive helper to trawl archive
    // if page not in archive 
      //-> add url to list for retrieval
      //use serveAssets to serve up loading.html page
    // if page in archive 
      //-> serve up to client
      // use serveAssets to send requested page data