'use strict';

module.exports = {
    rules: {
        "forbidden-expressions": require('./lib/forbidden-expressions'),
        "allow-new": require('./lib/allow-new')
    },

    rulesConfig: {
        "forbidden-expressions": 1,
        "allow-new": 1
    }
};
