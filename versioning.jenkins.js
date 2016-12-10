'use strict';

var mode = process.env.NODE_ENV;
var version = process.env.TAG;

module.exports.version = function () {
    if (mode !== 'production') {
        return '';
    }

    return '-v' + version;
};