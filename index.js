'use strict';

module.exports = {
    rules: {
        "pure": require('./lib/pure')
    },

    rulesConfig: {
        "pure": [2, 'format', 'help', 'util']
    }
};
