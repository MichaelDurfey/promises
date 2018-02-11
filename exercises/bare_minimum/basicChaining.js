/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var db = Promise.promisifyAll(require('../../lib/db'));
Promise.promisifyAll(fs);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return fs.readFileAsync(readFilePath).then(function(data) {
    let user = data.toString().split('\n')[0];
    return new Promise(function(resolve, reject) {
      request.get(`https://api.github.com/users/${user}`, function(err, res) {
        if (err) {
          reject(err);
        }
        resolve(res.body);
      });
    });
  }).then(function(item) {
    return fs.writeFileSync(writeFilePath, item);
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
