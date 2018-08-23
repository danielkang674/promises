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
const { pluckFirstLineFromFileAsync } = require('./promiseConstructor');
const { getGitHubProfileAsync } = require('./promisification');

var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(data => (getGitHubProfileAsync(data)))
    .then((data) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(data), (err, data) => {
          if (err) { return reject(err); }
          return resolve(data);
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
