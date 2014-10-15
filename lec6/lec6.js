// underscore.js
var _ = require('underscore');

console.log( _.first([1,2,3]) );
console.log( _.last([1,2,3]) );
console.log( _.keys({a: 1, b: "test"}) );

var sorted = _(['1', '10', '2'])
  .map(function(el) { return parseInt(el, 10); })
  .sort(function(a, b) { return a < b; });

console.log( sorted );

console.log( _.isObject( {} ) );
console.log( _.isObject( [] ) );
console.log( _.isArray( {} ) );
console.log( _.isArray( [] ) );
