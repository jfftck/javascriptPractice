Collection of JavaScript
========================

This is a collection of small Node modules written in JavaScript. All scripts are designed to be ran in Node.js and can be tested with `npm test`.

Before running the tests you must run `npm install`.

To use each you must `require` them, here is the list:

`ArrayConvert = require('./arr')`  
`EasyMath = require('./easymath')`  
`Factorial = require('./factorial')`

ArrayConvert
------------

`.convert({Array<any>})`

This will return a sorted array with the values of `invalid` replaced with `replaced`.

```javascript
ArrayConvert.convert([1, 4, 2, 5, 3, 'invalid']) 
[1, 2, 3, 4, 5, 'replaced']
```

Easy Math
---------

`.easyMath({number})`

This will count up to the number given and when it is a multiple of 3, print "Easy"; when it is a multiple of 5, "Math"; when a multiple of 3 and 5, "EasyMath" or for everything else print the number.

```javascript
EasyMath.easyMath(15)
1
2
Easy
4
Math
Easy
7
8
Easy
Math
11
Easy
13
14
EasyMath
```

Factorial
---------

`.factorial({number})`

This returns the factorial of the given number. If supported, it should use tail recursion to keep from having a stack overflow.

```javascript
Factorial.factorial(5)
120
```