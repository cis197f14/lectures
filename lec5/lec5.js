// Function Programming in JavaScript
// forEach
var a = [1,2,4,5];
for (var i = 0, l = a.length; i < l; i++) {
  // console.log( a[i] );
};

var forEach = function(arr, fn) {
  for (var i = 0, len = arr.length; i < len; i++) {
    fn(arr[i]);
  };
};

var strs = ["10", "1", "23"];

var parseIntForEach = function(arr) {
  var ints = [];
  forEach(arr, function(el) {
    ints.push( parseInt(el, 10) );
  });
  return ints;
};

// forEach(a, function(el) { console.log(el); });
// map
var map = function(arr, fn) {
  var result = [];
  forEach(arr, function(el) {
    result.push( fn(el) );
  });
  return result;
};

var parseIntForEach2 = function(arr) {
  var parseInt10 = function(n) {
    return parseInt(n, 2);
  };
  return map(arr, parseInt10);
};

// console.log( parseIntForEach2(['10', '10', '1010001']) );

var times2 = function(n) { return n * 2; };

var sum = function(arr) {
  var total = 0; // base case
  forEach(arr, function(el) {
    total += el;
  });
  return total;
};


// foldl === reduce
var forEach = function(arr, fn) {
  for (var i = 0, len = arr.length; i < len; i++) {
    fn( arr[i] );
  };
};

var foldl = function(arr, fn, base) {
  forEach(arr, function(el) {
    base = fn(base, el);
  });
  return base;
};

var sum2 = function(arr) {
  var add = function(a, b) {
    return a + b;
  };
  return foldl(arr, add, 0);
};

// console.log( sum2([1,2,3,4,56]) );
//
var filter = function(arr, pred) { // pred is a predicate
  var builder = function(base, el) {
    if (pred(el)) {
      base.push(el);
    }
    return base;
  };
  return foldl(arr, builder, []);
};

var isEven = function(n) {
  return n % 2 === 0;
};

var isTrue = function(x) {
  return !!x;
};

// console.log( map(filter([1,2,3,4,5,6,7], isEven), times2) );
// console.log( filter([true, false, "", "non-empty", 0], isTrue) );

// composition
// h(x) = f(g(x))

var composer = function(f, g) {
  var composed = function(input) {
    return g( f(input) );
  };
  return composed;
};

var plus3 = function(n) { return n + 3; };
var parseInt10 = function(x) { return parseInt(x, 10); };
var times4 = function(n) { return n * 4; };

var parseIntAndThenPlus3AndThenTimes4 = composer(composer(parseInt10, plus3), times4);

// console.log( map(['10', '12', '3'], parseIntAndThenPlus3AndThenTimes4) );

// partial application (currying)
var add2 = function(a, b) {
  return a + b;
};

var add2p = function(a) {
  var add1p = function(b) {
    return a + b;
  }
  return add1p;
};

var add3p = function(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
};

var incrementBy2 = add2p(2);

// console.log( incrementBy2 );
// console.log( incrementBy2.call(this, 100000) );

var f = add3p(1);
var g = f(3);

// console.log( g(0) );

// partial application using bind

var add3 = function(a, b, c) {
  return a + b + c;
};

var add2 = add3.bind(null, 0);

var incrementBy2 = add3.bind(null, 0, 2);

// console.log( incrementBy2(100) );

var timeout = function(time, fn) {
  setTimeout(fn, time);
};

var delay = timeout.bind(this, 2000);

// delay(function() {
// console.log("delayed by 2s");
// });

// Backbone Models!!!!
//
//
//
//



var add = function(a, b) {
  console.log("First argument is " + a + ", second argument is " + b);
  return a + b;
};


var add12 = add.bind(null, 12);

console.log( add12(100) );
