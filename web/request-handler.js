var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!

//requre http helper

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list); 
  var method = req.method;
  var search = url.parse(req.url).pathname;


  if (method === 'GET' && search === '/') {
    console.log('hardcoded get option');
    var body = '';
    var stream = fs.createReadStream( archive.paths.siteAssets + '/index.html' );

    stream.on('data', (data) => body += data);

    stream.on('end', () => {
      console.log('stream ended!');
      res.writeHead(200, httpHelper.headers);
      res.end(body);
    });

  


  } else if (method === 'POST') {
    var incomingMessage = '';

    req.on('data', function (data) {
      incomingMessage += data;
    });

    req.on('end', function() {
      console.log('incoming data complete');
      var url = incomingMessage.slice(incomingMessage.indexOf('=') + 1);

      fs.writeFile(archive.paths.list, url + '\n', function(err) {
        if (err) {
          console.log(err);
        }
      });

      res.writeHead(302, httpHelper.headers);
      res.end();

    });



    // console.log('request URL: ' + JSON.stringify(req));
    // fs.writeFile( archive.paths.list, search + '\n', function(err) {
    //  if(err) {
    //    return console.log(err);
    //  }
    // });


    // res.writeHead(302, httpHelper.headers);
    // res.end();

  } else {
    res.writeHead(404, httpHelper.headers);
    res.end();
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