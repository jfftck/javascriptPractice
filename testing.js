/*
** Quick and dirty test functions, should work in latest version of node.js.
** A more complete testing suite should be used in place of this in production
** code.
*/

'use strict';

const assert = require('assert');
const colors = require('colors/safe');


exports = module.exports = (function () {
    return new Test();
})();


function Test(name, func) {
    let self = this;

    self.createResults = newTestResults;
    self.it = test;
    self.logger = new Logger();
    self.suite = suite;

    function Logger() {
        let logger = this;
        let _groups = new Map();
        let _name = null;
        let _format = [];

        logger.group = group;
        logger.createLog = createLog;
        logger.format = format;
        logger.log = log;

        function createLog() {
            group();
            format();

            for (let [name, items] of _groups) {
                log('\n');
                let text = null;
                let format = null;

                for (let item of items) {
                    processOutput(item.get('text'), item.get('format'));
                }
            }

            log('\n');

            _groups = new Map();

            return logger;
        }

        function format(...format) {
            _format = format;

            return logger;
        }

        function group(name) {
            if (_name === name || name == null) {
                _name = null;
            } else {
                _name = name;

                _groups.set(name, []);
            }

            return logger;
        }

        function log(...args) {
            processOutput(args.join('\t'), _format);

            format();

            return logger;
        }

        function processOutput(text, format) {
            if (_name === null) {
                if (format.length > 0) {
                    let ftext = colors;

                    for (let f of format) {
                        ftext = ftext[f];
                    }

                    text = ftext(text);
                }

                console.log(text);
            } else {
                let item = new Map();

                item.set('text', text);
                item.set('format', format);
                _groups.get(_name).push(item);
            }
        }
    }

    function newTestResults(name, actual, expected) {
        return new TestResults(name, actual, expected);
    }

    function suite(name, func) {
        let title = (x) => {
            let mid = (80 - (x.length + 4)) / 2;
            let left = Math.floor(mid);
            let right = Math.ceil(mid);

            let border = (n) => {
                let sb = [];

                for (let i = 0; i < n; i++) {
                    sb.push('=');
                }

                return sb.join('');
            }

            return border(left) + '( ' + x + ' )' + border(right);
        }
        self.logger.group(name).format('black', 'bgWhite').log(title(name));

        func();

        self.logger.createLog();
    }

    function test(name, func) {
        /*
        ** Basic test suite.
        */

        // Group the log output.
        self.logger.group(name).log(name);

        logResult(func());

        function logResult(err) {
            /*
            ** Format the pass/fail output.
            */

            if (err !== undefined) {

                // There has been a failure in the test.
                self.logger.format('red', 'bold').log('Failed: \n');

                // The log must be the output from TestResults object.
                for (let [name, errObj] of err) {
                    self.logger.log(name);
                    for (let [t, value] of err.get(name)) {
                        self.logger.log(t, value);
                    }
                }
            } else {

                // The test passed, so display that fact.
                self.logger.format('green', 'bold').log('Passed');
            }
        }
    }

    function TestResults(name, actual, expected) {
        const self = this;
        const a = 'Actual: ';
        const e = 'Expected: ';

        let _results = new Map();
        let _name = null;
        let _names = new Map();

        if (name !== undefined && actual !== undefined &&
                expected !== undefined) {
            setName(name);
            setActual(actual);
            setExpected(expected);
        }

        self.actual = setActual;
        self.assertEqual = getAssertEqual;
        self.create = createResults;
        self.expected = setExpected;
        self.name = setName;
        self.test = testResults;

        function createResults() {
            return _results;
        }

        function getAssertEqual() {
            if (_name === null) {
                return false;
            }

            try {
                assert.strictEqual(_results.get(_name).get(a),
                    _results.get(_name).get(e));

                return true;
            } catch(e1) {
                try {
                    assert.deepStrictEqual(_results.get(_name).get(a),
                        _results.get(_name).get(e));

                    return true;
                } catch(e2) {
                    return false;
                }
            }
        }

        function setActual(actual) {
            if (_name !== null) {
                _results.get(_name).set(a, actual);
            }

            return self;
        }

        function setExpected(expected) {
            if (_name !== null) {
                _results.get(_name).set(e, expected);
            }

            return self;
        }

        function setName(name) {
            _name = name;
            _names.set(name, null);
            if (_results.has(name) === false) {
                _results.set(name, new Map());
            }

            return self;
        }

        function testResults() {
            for (let n of _names.keys()) {
                setName(n);

                if (getAssertEqual() === false) {
                    return createResults();
                }
            }

            return;
        }
    }
}
