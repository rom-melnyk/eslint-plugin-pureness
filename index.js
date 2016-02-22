'use strict';

module.exports = {
    rules: {
        "forbid": require('./lib/forbid'),
        "allow-new": require('./lib/allow-new')
    },

    rulesConfig: {
        "forbid": 2,
        "allow-new": 1
    }
};
