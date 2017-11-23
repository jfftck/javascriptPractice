/*
** Test suites for Node.js, requires 6.0 or higher.
*/

'use strict';

const easymath = require('./easymath');
const arrConverter = require('./arr');
const factorial = require('./factorial');
const test = require('./testing');


test.suite('EasyMath Module', () => {
    test.it('Returns "Easy" when multiple of three.',
        () => {
            let multOf3 = easymath.easyMath(3).split('\n');
            let result = test.createResults('multiple of three',
                multOf3[2], 'Easy');

            return result.test();
        });

    test.it('Should get "Math" when multiple of five.',
        () => {
            let multOf5 = easymath.easyMath(5).split('\n');
            let result = test.createResults('multiple of five',
                multOf5[4], 'Math');

            return result.test();
        });

    test.it('Expect "EasyMath" when multiple of three and five.',
        () => {
            let multOf3And5 = easymath.easyMath(15).split('\n');
            let result = test.createResults('multiple of three and five',
                multOf3And5[14], 'EasyMath');

            return result.test();
        });

    test.it('Ensure the correct string when given 30.',
        () => {
            let expected = ['1', '2', 'Easy', '4', 'Math', 'Easy', '7', '8',
            'Easy', 'Math', '11', 'Easy', '13', '14', 'EasyMath', '16',
            '17', 'Easy', '19', 'Math', 'Easy', '22', '23', 'Easy', 'Math',
            '26', 'Easy', '28', '29', 'EasyMath'].join('\n');
            let result = test.createResults('EasyMath up to 30',
                easymath.easyMath(30), expected);

            return result.test();
        });
});

test.suite('Custom Array Formatting Module', () => {
    test.it('Check that the correct length is given and array is sorted.',
        () => {
            let arr = [
                'zebra',
                'invalid',
                'boat',
                'quick',
                'app'
            ];
            let result = test.createResults('length',
                arrConverter.convertArray(arr), 5);
            let expectedArray = [
                'app',
                'boat',
                'quick',
                'replaced',
                'zebra'
            ];

            result.name('array').actual(arr).expected(expectedArray);

            return result.test();
        });
});

test.suite('Factorial Module', () => {
    test.it('Factorial of 5 should be 120.',
        () => {
            let result = test.createResults('factorial 5',
                factorial.factorial(5), 120);

            return result.test();
        });

    test.it('Factorial of 1 should be 1.',
        () => {
            let result = test.createResults('factorial 1',
                factorial.factorial(1), 1);

            return result.test();
        });

    test.it('Factorial of 0 should be 1.',
        () => {
            let result = test.createResults('factorial 0',
                factorial.factorial(0), 1);

            return result.test();
        });

    test.it('Factorial of -10 should be 0.',
        () => {
            let result = test.createResults('factoral -10',
                factorial.factorial(-10), 0);

            return result.test();
        });
});
