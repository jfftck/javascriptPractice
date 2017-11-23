'use strict';

exports = module.exports = {
    factorial: factorial
}

function factorial(n, acc = 1) {
    /*
    ** Factorial calculator with tail recursion, if supported by the JavaScript
    ** implementation.
    */

    // Return 0 as per the spec when value is negative.
    if (n < 0) return 0;
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}
