'use strict';

var mode = process.env.NODE_ENV;
var version = process.env.TAG;

module.exports.version = function () {
    if (mode !== 'production') {
        return '';
    }
    
    if (version) {
        version = version.replace(/\./g, '-');
    }

    return '-v' + version;
};
