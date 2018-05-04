/*const http = require('http');
const api = require('./api');

// Module variables
var serverInstance;
var apiInstance;
var server = http.createServer(api.handleRequest);

/** @function start
  * Starts the server
  * @param {integer} port - the port to listen on
  * @param {string} datafile - the path to the database file
  * @param {function} callback - an optional callback invoked when the server starts
  */
/*function start(port, datafile, callback) {
  apiInstance = api.load(datafile);
  serverInstance = server.listen(port, function(){
    console.log("Listening on port " + port);
    if(typeof callback === "function") callback();
  });
}

/** @function stop
  * Stops the server from listening
  */
/*function stop() {
  if(serverInstance) {
    serverInstance.close();
  }
}

/** @module server
  * A server for implementing an API.
  */
/* module.exports = {
  start: start,
  stop: stop
} */

const express = require('express')
const bodyParser = require('body-parser')
const api = require('./api')

const app = express()

app.use(bodyParser.json({ extended: true }))

var apiInstance
var expressInstance

function start(port, datafile, callback) {
  apiInstance = api.load(datafile)
  expressInstance = app.listen(port, function() {
    console.log(`Listening on port ${port}`)
    if (typeof callback === "function") callback()
  })
}

function stop() {
  if (expressInstance) {
    expressInstance.close()
  }
}

app.get('/courses', function(req, res) {
  api.getAllCourses()
  .then(courses => {
    res.send(JSON.stringify(courses))
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/courses/:id', function(req, res) {
  api.getCourseByID(req.params.id)
  .then(course => {
    res.send(JSON.stringify(course))
  })
  .catch(error => {
    console.log(error)
  })
})

app.post('/courses', function(req, res) {
  api.createCourse(req.body)
  .then(courses => {
    res.send(JSON.stringify(courses))
  })
  .catch(error => {
    console.log(error)
    res.statusCode = 422;
    res.end("Poorly formatted course entry");
  })
})

app.put('/courses/:id', function(req, res) {
  api.updateCourse(req.params.id, req.body)
  .then(courses => {
    res.send(JSON.stringify(courses))
  })
})

app.delete('/courses/:id', function(req, res) {
  api.deleteCourse(req.params.id)
  .then(courses => {
    res.send(JSON.stringify(courses))
  })
  .catch(error => {
    console.log(error)
  })
})

module.exports = {
  start,
  stop
}
