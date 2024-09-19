```javascript
// helpers.js

/**
 * Function to check if an object is empty
 * @param {Object} obj - The object to check
 * @returns {boolean} - Returns true if the object is empty
 */
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Function to deeply clone an object
 * @param {Object} obj - The object to clone
 * @returns {Object} - Returns a deeply cloned copy of the object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Function to merge two objects
 * @param {Object} target - The target object to merge into
 * @param {Object} source - The source object to merge from
 * @returns {Object} - Returns the merged object
 */
function mergeObjects(target, source) {
    return Object.assign({}, target, source);
}

module.exports = {
    isEmptyObject,
    deepClone,
    mergeObjects
};
```