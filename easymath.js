'use strict';

exports = module.exports = {
    easyMath: easyMath2
}

function easyMath (n) {
    /*
    ** This will output "Easy" when multiple of 3, "Math" when multiple of 5,
    ** "EasyMath" when multiple of 3 and 5, and the number all other times.
    */

    // Create a string buffer for the result.
    let resultBuffer = [];

    for (let i = 1; i <= n; i++) {
        // Create a string buffer for the line.
        let sb = [];

        if (i % 3 === 0) {
            // This is a multiple of 3.
            sb.push('Easy');
        }
        if (i % 5 === 0) {
            // This is a multiple of 5.
            sb.push('Math');
        }
        if (sb.length < 1) {
            // This is the fastest way to convert to string based on tests
            // in most browsers.
            sb.push('' + i);
        }

        // Add line, and concatenate it if needed, to the result buffer.
        resultBuffer.push(sb.join(''));
    }

    // Return the result buffer with new lines added.
    return resultBuffer.join('\n');
}

function easyMath2 (n) {
    return new Array(parseInt(n)).fill()
        .map(function (v, i) {return (i + 1) % 3 === 0 ? 'Easy' : '';})
        .map(function (v, i) {return (i + 1) % 5 === 0 ? v + 'Math' : v === '' ? '' + (i + 1) : v;})
        .join('\n');
}