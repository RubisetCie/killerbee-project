/****************************************************************
 * Collection of memory management utils functions.
 ****************************************************************/

// Check if variable is undefined
module.exports.isUndefined = function(v) {
    return typeof v === "undefined";
};