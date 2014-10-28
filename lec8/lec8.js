var fs = require('fs');
var _ = require('underscore');
var Promise = require('bluebird');
var request = require('request');

// Promisifying fs.readdir
var readdir = function(filename) {
  return new Promise(function(resolve, reject) {
    fs.readdir(filename, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};

// Promisifying fs.stat
var stat = function(filename) {
  return new Promise(function(resolve, reject) {
    fs.stat(filename, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Promisifying fs.readFile
readFile = Promise.promisify(fs.readFile);

var dir = './text';

// Callback hell
fs.readdir(dir, function(err, files) {
  if (err) {
    console.log(err);
    return;
  }
  _.each(files, function(filename) {
    fs.stat(dir + '/' + filename, function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      if (data.size > 15) {
        fs.readFile(dir + '/' + filename, function(err, contents) {
          if (err) {
            console.log(err);
            return;
          }
          console.log('The contents of ' + filename);
          console.log('==============');
          console.log(contents.toString());
          console.log('==============');
        });
      }
    });
  });
});

// Rewriting callbacks to Promises
readdir(dir).map(function(filename) {
  stat(dir + '/' + filename).then(function(data) {
    console.log(filename + ' is ' + data.size + ' bytes.');
    if (data.size > 15) {
      readFile(dir + '/' + filename).then(function(contents) {
        console.log('The contents of ' + filename);
        console.log('==============');
        console.log(contents.toString());
        console.log('==============');
      });
    }
  });
}).catch(function(err) {
  console.log(err);
});

// Chaining promises
readdir(dir)
  .map(function(file) { return stat(dir + '/' + file); })
  .filter(function(stat) { return stat.size > 15; })
  .then(console.log);

readFile(dir + '/first.txt').then(function(contents) {
  var strContents = contents.toString().toUpperCase();
  console.log(strContents);
}).catch(function(err) {
  console.log(err);
});

// Implement simple Promise library
var Promise1 = function(fn) {
  var callback;

  var resolve = function(value) {
    // A hack to ensure the callback is set before invoking it
    setTimeout(function() {
      callback(value);
    }, 5);
  }

  this.then = function(cb) {
    callback = cb;
  }

  fn(resolve);

  return this;
};

// A Promise implementation that handles state
var Promise2 = function(fn) {
  var state = 'pending';
  var callback, value;

  var resolve = function(newValue) {
    state = 'resolved';
    value = newValue;
    if (callback) {
      handle(callback);
    }
  }

  var handle = function(onResolved) {
    if (state === 'pending') {
      callback = onResolved;
      return;
    }
    onResolved(value);
  }

  this.then = function(cb) {
    handle(cb);
  }

  fn(resolve);

  return this;
}

// False Promise implementation
var doSomethingFalse = function() {
  var value = 42;
  return {
    then: function(cb) {
      cb(value);
    }
  }
}

var doSomething = function() {
  return new Promise2(function(resolve) {
    resolve(42);
  });
}

var doubleVal = function(val) {
  return new Promise2(function(resolve) {
    var twice = val * 2;
    resolve(twice);
  });
};

readdirNew = function(filename) {
  return new Promise2(function(resolve) {
    fs.readdir(filename, function(err, files) {
      if (err) {
        console.log(err);
      } else {
        resolve(files);
      }
    });
  });
}


doSomething().then(console.log);

doubleVal(33).then(console.log);

readdirNew('./text').then(console.log);

var getDirectoryContents = function(dir, cb) {
  fs.readdir(dir, function(err, files) {
    var contents = [];

    _.each(files, function(file) {
      fs.readFile(dir + '/' + file, function(err, data) {
        contents.push(data.toString());
      });
    });

    setTimeout(function() {
      cb(contents);
    }, 500);
  });
};

getDirectoryContents(dir, function(contents) {
  console.log(contents);
});

// Final Promise example
var getDirectoryContents2 = function(dir) {
  return readdir(dir).map(function(file) {
    return readFile(dir + '/' + file);
  }).map(function(buffer) {
    return buffer.toString();
  });
};

getDirectoryContents2(dir).then(function(contents) {
  console.log(contents);
});
