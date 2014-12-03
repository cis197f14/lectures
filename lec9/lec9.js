// EventEmitter, util.inherits
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var eventsStream = new EventEmitter();

eventsStream.on('data', function(data) {
  console.log(data);
});

// eventsStream.emit('data', {text: 'Hello world'});

// Door
var Door = function() {
  this.open = false;
  EventEmitter.call(this);

  this.on('open', function(data) {
    if (this.open) {
      console.log('Door is already open. Sorry, ' + data.name + '.');
    } else {
      this.open = true;
      console.log(data.name + ' has opened the door.');
    }
  });

  this.on('close', function(data) {
    if (!this.open) {
      console.log('Door is already closed. Sorry, ' + data.name + '.');
    } else {
      this.open = false;
      console.log(data.name + ' has closed the door.');
    }
  });
}

util.inherits(Door, EventEmitter);

// Door + Person
var Person = function(name, door) {
  this.name = name;
  this.door = door;
};

// Metaprogramming
['open', 'close'].forEach(function(fn) {
  var methodName = fn + 'Door';
  Door.prototype[methodName] = function(name) {
    this.emit(fn, {name: name});
  };

  Person.prototype[methodName] = function() {
    this.door[methodName](this.name);
  };
});

var frontdoor = new Door();
var geoff = new Person('Geoff', frontdoor);
var arman = new Person('Arman', frontdoor);

geoff.openDoor();
arman.openDoor();
arman.closeDoor();
geoff.closeDoor();

// Promises + Events, reading files and emitting contents

var Promise = require('bluebird');
var fs = require('fs');

var readdir = Promise.promisify(fs.readdir);
var readFile = Promise.promisify(fs.readFile);

var getContentsStream = function(dir) {
  var stream = new EventEmitter();
  var contents = {};
  var filesRead = 0;
  readdir(dir).map(function(file, index, total) {
    readFile(dir + '/' + file).then(function(data) {
      contents[file] = data.toString();
      stream.emit('file', data.toString());
      filesRead++;
      if (filesRead === total) {
        stream.emit('complete', contents);
      }
    }).catch(function(err) {
      console.log(err);
      console.log('File was not read');
    });
  });
  return stream;
};

var stream = getContentsStream('./text');

stream.on('file', function(data) {
  // console.log(data);
});

var readStream = fs.createReadStream('./text/first.txt');
var writeStream = fs.createWriteStream('./text/newfile.txt');

readStream.pipe(writeStream);

readStream.on('error', function(err) {
  console.log('File not read.');
});

readStream.on('data', function(data) {
  // console.log(data.toString());
});
