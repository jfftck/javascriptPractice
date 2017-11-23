'use strict';

exports = module.exports = {
    convertArray: convertArray
}

function convertArray(arr) {
    /*
    Get the length of an array, replace "invalid" with "replaced", and sort it.
    */

    // Store the length of the array to avoid evaluating it multiple times.
    let len = arr.length;

    // Loop through and replace "invalid" with "replaced".
    for (let i = 0; i < len; i ++) {
        if (arr[i] === 'invalid') {
            arr[i] = 'replaced';
        }
    }

    mergeSort(arr);

    return len;
}

function mergeSort(arr, comp, inPlace) {
    /*
    ** Memory efficient merge sort.
    */

    // Create a comparator function if one is not defined.
    if (comp === undefined) {
        comp = (a, b) => {
            if (typeof a === 'string') {
                return a.localeCompare(b);
            }
            if (typeof a === 'number') {
                return a - b;
            }

            // Not sure how to sort, so it is equal.
            return 0;
        };
    }

    split();

    function mergeLargeArray(leftStart, leftEnd, rightEnd) {
        /*
        ** Merge left and right halves of an array in-place.
        */

        // Set the right half starting index.
        let rightStart = leftEnd + 1;

        // When the left end value is less than the right start value it should
        // be sorted.
        if (comp(arr[rightStart], arr[leftEnd]) > 0) {
            return;
        }

        // Keep looping when the right and left starting indexes are less than
        // their respective ends.
        while (leftStart <= leftEnd && rightStart <= rightEnd) {

            // Find the value that is smaller and only swap if the right is
            // smaller than the left.
            if (comp(arr[leftStart], arr[rightStart]) > 0) {
                let temp = arr[rightStart];
                shiftArr(leftStart, rightStart - leftStart);
                arr[leftStart] = temp;

                // Move all indexes up one.
                rightStart++;
                leftStart++;
                leftEnd++;
            } else {

                // Left is in the correct position, so just increase the index.
                leftStart++;
            }
        }
    }

    function mergeSmallArray(leftStart, leftEnd, rightEnd) {
        /*
        ** Memory should not be an issue, so we will use an extra array to merge
        ** the left and right halves.
        */

        let rightStart = leftEnd + 1;
        let temp = [];

        // Loop until both the left and right starting positions are greater
        // than their respective ends.
        while (leftStart <= leftEnd || rightStart <= rightEnd) {
            if (rightStart <= rightEnd &&
                    comp(arr[rightStart], arr[leftStart]) < 0 ||
                    leftStart > leftEnd) {
                temp.push(arr[rightStart]);
                rightStart++;
            } else {
                temp.push(arr[leftStart]);
                leftStart++;
            }
        }

        // Move the contents of the temp array to the array provided.
        for (let i = 0, len = temp.length; i < len; i++) {
            arr[rightEnd - i] = temp.pop();
        }
    }

    function shiftArr(start, len) {
        /*
        ** Shift part of the array to the right one position.
        */

        for (let i = len - 1; i >= 0; i--) {
            arr[start + i + 1] = arr[start + i];
        }
    }

    function split(left, right) {
        /*
        ** Split the array in half.
        */

        // Set the base case to the entire array.
        if (left === undefined) {
            left = 0;
            right = arr.length - 1;
        }

        // Left must be less than right or we return.
        if (right > left) {
            // Find the middle.
            let middle = Math.floor((right + left) / 2);

            // Keep breaking the arr down to smaller halves.
            split(left, middle);
            split(middle + 1, right);

            // Merge the halves back together using memory saving or time saving
            // merge function, the default is smaller sections merged with a
            // scratch-array and very large sections with in-place swapping.
            if (right - left > 1000000 && inPlace === undefined ||
                    inPlace === true) {
                mergeLargeArray(left, middle, right);
            } else {
                mergeSmallArray(left, middle, right);
            }
        }
    }
}
