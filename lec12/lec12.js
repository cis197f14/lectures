// Administrative stuff

// Proposal Meetings
// Unneeded unless I specifically select you

// Demo days
// December 11 @ 12 - 2pm in Levine lobby
// December 16 @ 6 - 8pm in Levine 307

// The Future of JavaScript
// ECMAScript 6 -- ECMAScript Harmony
// Make sure to run this in Firefox 35 or higher

// let + const
for (let i = 0; i < 10; i++) {
  console.log(i);
}

var x = true;

// block
if (x === true) {
  let a = 123;
  console.log(a);
}

// another block
{
  let a = 'test';
}
// console.log(a);

// console.log(i);
const PI = 3.14159;

console.log(PI);

PI = 1; // cannot redefine

console.log(PI);

const f = function() {
  let a = 123;
  console.log(a);
};

f();

f = function() {
  console.log('not a');
};

f();

// map + set + weakmap + weakset
var m = new Map();
m.set('key', 'value');
m.set(true, {hello: 'world'});

let e = [];
let o = {};
var ones = [1,1,1,1];
m.set(e, 'empty array');
m.set(o, 'empty object');
m.set(ones, 'array of ones');

console.log( m.get(e) );
console.log( m.get(o) );
console.log( m.has(ones) );
console.log(m);

var s = new Set();

s.add('hello1');
s.add('hello2');
s.add('hello3');
s.add('hello1'); // duplicate not added

console.log( s.size );
console.log( s );


// arrows

let f = (function() { }).bind(this);
let f = () => { };

var a = [ 1, 2, 3, 4 ];

console.log( a.map((num) => { return num * 2; }) );


var obj = {
  sum: 0,
  values: [1, 2, 3],
  mapOverValues() {
    this.values.map( (val) => { this.sum += val; });
    console.log(this.sum);
  }
}

obj.mapOverValues();

// enhanced object literals

var one = 1;

var o = {
  one,
  args(first, second) {
    return first + second;
  },
  toString() {
    console.log('The toString() method logs ' + this.one);
  },
  ['key ' + one]: true
};

console.log(o);
console.log( Object.keys(o) );

// destructuring
var {x, y} = {x: 123, y: 34543};
console.log(x);
console.log(y);

var c = function({model: m}) {
  console.log(m);
};

var [a, b, ...c] = [1, 2, 3, 4, 5 ];
console.log(a);
console.log(b);
console.log(c);

// template strings
var name = 'Geoff';
var compiled = `Hel
  lo, 
  ${name}`;
console.log(compiled);

// default + rest + spread
var g = function(a, b=123, c='test') {
  console.log(b, c);
};

g();
g(1, 'Hello', 'world');

var g = function(first, second, third, ...rest) {
  console.log('The first arg is ' + first);
  console.log('The second arg is ' + second);
  console.log('The third arg is ' + third);
  console.log('The rest are' + rest);
};

g(...[1, 2, 3, 4, 5, 6]);

var func = function(url, base) {
  console.log(url);
  console.log(base);
};

var urls = [ 'cis.json', 'http://classes.com/' ];

func(...urls);


// classes + extends + super + static

// generators

function* gen() {
  yield 42;
  yield 'test';
}


// var it = gen();
// console.log( it.next().value );
// console.log( it.next().value );

var request = function (url) {
  $.ajax({
    url,
    success: (data) => {
      it.next(data);
    }
  })
}


function* main() {
  var posts = yield request('http://ph-api.herokuapp.com/posts');
  var first3 = posts.slice(0, 3);
  console.log(first3);

  var allComments = [];
  for (post of first3) {
    let comments = yield request(`http://ph-api.herokuapp.com/comments?post_id=${post.id}`);
    console.log(comments);
    allComments.push(comments);
  }
  console.log(allComments);
};


var it = main();
it.next();
