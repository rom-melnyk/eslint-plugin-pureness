/**
 * @fileoverview Ensures `.then()` sequences are terminated by `.catch()`/`.done()`
 * @author Roman Melnyk
 */
'use strict';

var utils = require('./utils/utils');
var doesFilenameMatchMasks = require('./utils/does-filename-match-masks');

var checkThenSequence = require('./ast/then-sequence');

module.exports = function(context) {
    if ( doesFilenameMatchMasks(context.getFilename(), context.options) ) {
        return {
            MemberExpression: checkThenSequence(context)
        };
    } else {
        return {};
    }
};
