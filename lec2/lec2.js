// Prototypes

// Person contructor
var Person = function(first, last, age) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
};

// Attach methods to the prototype
Person.prototype.getName = function() {
  return this.firstName + ' ' + this.lastName;
};

Person.prototype.formalName = function() {
  return this.lastName + ', ' + this.firstName;
};

var Student = function(first, last, age, lecturesAttended) {
  // invoke the "super" constructor
  Person.apply(this, arguments)
  // Person.apply(this, [first, last, age]);
  // Person.call(this, first, last, age);
  this.lecturesAttended = lecturesAttended;
};

// Prototypical Inheritance
// Student.prototype = new Person();
Student.prototype = Object.create(Person.prototype);
// Student.prototype = Person.prototype; //-> BAD; DO NOT DO THIS

Student.prototype.lecturesAttendedTimesAge = function() {
  return this.age * this.lecturesAttended;
};

var geoff = new Person("Geoff", "V", 21);

console.log(geoff.getName());

var arman = new Student('Arman', 'T', 100, 3);

for (var prop in arman) {
  if (arman.hasOwnProperty(prop)) {
    console.log(prop + ": " + arman[prop]);
  }
}

console.log(arman.formalName());
console.log(arman.lecturesAttendedTimesAge());

// Array.prototype
Array.prototype.product = function() {
  var total = 1;
  for (var i = 0; i < this.length; i++) {
    total = total * this[i];
  };
  return total;
};

var a = [1,2,3];

// swaps pop and shift
old_pop = Array.prototype.pop;
Array.prototype.pop = Array.prototype.shift;
Array.prototype.shift = old_pop;

console.log( "product: " + a.product() );
console.log( a.pop() ); //-> 1
console.log( a.shift() ); //-> 3


// Object.create
var Instructor = function(first, last, age, officeHours) {
  Person.apply(this, arguments);
  this.officeHours = officeHours;
};

// better way of Prototypical Inheritance
Instructor.prototype = Object.create(Person.prototype);

Instructor.prototype.nameAndOfficeHours = function() {
  return 'My name is ' + this.getName() + ' and my office hours are ' + this.officeHours;
};

var clara = new Instructor('Clara', 'W', 21, 'not today');

console.log( clara.getName() );
console.log( clara.formalName() );
// console.log( clara.lecturesAttendedTimesAge() );
console.log( clara.nameAndOfficeHours() );

/*
       Person
      /     \
  Student    Instructor

*/

// npm modules, module.exports
module.exports = {
  Person: Person,
  Student: Student,
  Instructor: Instructor
};

// file system APIs and callbacks

// make sure you have fs-extra installed with `npm install fs-extra`
// var fse = require('fs-extra');

var cb = function(err, contents) {
  console.log(contents);
};

// fse.readFile('./lec2.js', cb);

// console.log('hello');


var do_something_then_cb = function(cb) {
  console.log('doing something');
  cb();
}

do_something_then_cb(function() {
  console.log('this is the callback');
});
