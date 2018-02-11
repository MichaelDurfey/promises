/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
// Promise.promisifyAll(fs);

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  return new Promise( function(resolve, reject) {
    fs.readFile( filePath, function(err, success) {
      if (err) {
        reject(err);
      } else {
        resolve(success.toString());
      }
    });
  }).then(function(data) {
    return data.split('\n')[0].toString();
  }).catch(function(err) {
    if (err) { throw err; }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // TODO
  return new Promise( function(resolve, reject) {
    request(url, function(err, success) {
      if (err) {
        reject(err);
      } else {
        resolve(success);
      }
    });
  }).then(function(success) {
    return success.statusCode;
  }).catch(function(err) {
    if (err) {
      throw err;
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
