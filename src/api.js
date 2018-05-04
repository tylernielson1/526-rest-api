/*const fs = require('fs');

// Module variables
var data = {};
var datafile = "";

/** @function handleRequest
  * This function maps incoming requests to
  * API calls.
  * TODO set up mapping.
  * @param {http.clientRequest} req - the incoming request
  * @param {http.serverResponse} res - the response to serve

function handleRequest(req, res) {
  if(req.method === 'POST' && req.url === '/courses') {
    return createCourse(req, res);
  } else {
    res.statusCode = 400;
    res.end("Not implemented");
  }
}

function createCourse(req, res) {
  var jsonString = "";

  req.on('data', function(chunk) {
    jsonString += chunk;
  });

  req.on('error', function(err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Server Error");
  });

  req.on('end', function(){
    try {
      var course = JSON.parse(jsonString);
      var tokens = course.name.split(" ");
      if(tokens.length < 2) {
        res.statusCode = 422;
        res.end("Poorly formatted course entry");
        return;
      }
      var id = tokens[0] + tokens[1];
      data["courses"][id] = course;
      save();
      res.statusCode = 200;
      res.end(id);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error: " + err);
    }
  });

}

/** @function load
  * Loads the persistent data file
  * @param {string} filename - the file to load
function load(filename) {
  datafile = filename;
  data = JSON.parse(fs.readFileSync(filename, {encoding: "utf-8"}));
}

/** @function save
  * Saves the data to the persistent file
function save() {
  
}

/** @module API
  * A module implementing a REST API
module.exports = {
  load: load,
  handleRequest: handleRequest
} */

const fs = require('fs')

var data = {}
var datafile = ""

function load(filename) {
  datafile = filename
  data = JSON.parse(fs.readFileSync(filename, {encoding: "utf-8"}))
}

function save() {
  fs.writeFileSync(datafile, JSON.stringify(data))
}

function getAllCourses() {
  return new Promise(function(resolve, reject) {
    if (data) {
      var courses = data
      var responseJSON = []
      for(var id in courses.courses) {
        responseJSON.push(courses.courses[id])
      }
      resolve(responseJSON)
    }
    reject(new Error("Courses not loaded"))
  })
}

function getCourseByID(courseID) {
  return new Promise(function(resolve, reject) {
    if (data) {
      var courses = data
      for(var id in courses) {
        if (courses.courses.hasOwnProperty(courseID)) {
          var responseJSON = courses.courses[courseID]
          resolve(responseJSON)
        }
      }
      reject(new Error("Course with course id does not exist"))
    }
    reject(new Error("Courses not loaded"))
  })
}

function createCourse(parameters) {
  return new Promise(function(resolve, reject) {
    var course = parameters
    var value = course["name"]
    var tokens = value.split(" ")
    if(tokens.length < 2) {
      reject(new Error("Poorly formatted course entry"))
    }
    var id = tokens[0] + tokens[1]
    data["courses"][id] = course
    save()
    resolve(data)
  })
}

function updateCourse(courseID, updates) {
  return new Promise(function(resolve, reject) {
    for(var id in data.courses) {
      if(data.courses.hasOwnProperty(courseID)) {
        data.courses[courseID].name = updates["name"]
        save()
        resolve(data)
      }
    }
  })
}

function deleteCourse(courseID) {
  return new Promise(function(resolve, reject) {
    delete data["courses"][courseID]
    save()
    resolve(data)
  })
}

module.exports = {
  load,
  getAllCourses,
  getCourseByID,
  createCourse,
  updateCourse,
  deleteCourse
}
