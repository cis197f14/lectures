// Fizzbuzz
for (var i = 0; i < 100; i++) {
  var str = "";
  if (i % 3 === 0) {
    str += "Fizz";
  }
  if (i % 5 === 0) {
    str += "Buzz";
  }
  console.log(str ? str : i);
}

// Objects, nesting, representing data
var cis197 = {
  students: [
    'Arman',
    'Ian',
    'Razzi',
    'Andrew'
  ],
  instructor: {
    name: 'Geoff',
    birthday: 'September 15',
    favoriteIceCream: 'rocky road'
  },
  times: "Tues 3-4:30"
};


// set key to a value (adding a key)
cis197.lectureNumber = 1;
console.log(cis197.lectureNumber);

// Functions, this, and arguments
var counter = {
  value: 1,
  double: function() {
    var that = this;

    var helper = function() {
      that.value = that.value * 2;
      that.print();
    }

    helper();
  },
  print: function() {
     console.log(this.value);
  }
};

// Closures

var genClosure = function() {
  var _user = {
    first: 'Adi'
  , last: 'Dahiya'
  };

  var printName = function() {
    console.log(_user.first + ' ' + _user.last);
  };

  return printName;
}

var name = genClosure();
name();

var Counter = function() {
  var _value = 1;

  this.double = function() {
    _value = _value * 2;
    return _value;
  }

  this.addTo = function(n) {
    _value = _value + n;
    return _value;
  }

  this.getValue = function() {
    return _value;
  }

  this.setValue = function(v) {
    _value = v;
    return _value;
  }

  return this;
};

var c = new Counter();

console.log("c values");
console.log( c.double() );
console.log( c.double() );
console.log( c.double() );
console.log( c.double() );
console.log( c.addTo(10) );

var c2 = new Counter();

console.log("\nc2 values");
console.log( c2.setValue(13) );
console.log( c2.double() );

// Imediately Invoked Function Expressions (IIFE)
(function() {

  var counter = 0;
  console.log("hello world");

})();
