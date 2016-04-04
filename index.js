'use strict';

module.exports = {
    rules: {
        "forbidden-expressions": require('./lib/forbidden-expressions'),
        "forbidden-import": require('./lib/forbidden-import'),
        "forbid-new": require('./lib/forbid-new'),
        "promise-catch": require('./lib/promise-catch')
    },

    rulesConfig: {
        "forbidden-expressions": 1,
        "forbidden-import": 1,
        "forbid-new": 1,
        "promise-catch": 1
    }
};
