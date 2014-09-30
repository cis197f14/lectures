// Callbacks review
var cb = function(n) {
  console.log('the current value is ' + n);
};

// Simple object
var counter = {
  value: 10,
  increment: function(cb) {
    this.value++;
    cb(this.value);
  }
}

// Class implementation
var Counter = function() {
  this.value = 10;
}

Counter.prototype.increment = function(callback) {
  this.value++;
  callback(this.value);
}

console.log( counter.value );
counter.increment(cb);
counter.increment(cb);
counter.increment(cb);
console.log( counter.value );

var c1 = new Counter();
c1.increment(cb);
c1.increment(function(n) {
  console.log(n);
});

// see lec4.html for the rest of the lecture notes
// Browser Events

// Event propogation

// DOM ready event
