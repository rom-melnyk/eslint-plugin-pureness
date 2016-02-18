/**
 * @fileoverview Ensures files/methods are pure
 * @author Roman Melnyk
 */
'use strict';

module.exports = function(context) {
    var filenameChunks = context.getFilename().split(/[\/\\]/).map(__toLowerCase);
    var filenameMasks = context.options.map(__toLowerCase);

    var shouldAnalyzeContext = filenameMasks.some(function (mask) {
        return filenameChunks.some(function (chunk) {
            return chunk.indexOf(mask) > -1;
        });
    });

    if (shouldAnalyzeContext) {
        return {
            //FunctionDeclaration: checkBlock,
            BlockStatement: checkBlockFactory('body')
            //ExpressionStatement: checkBlock
        };
    } else {
        return {};
    }
};

// ------------------------------------ private methods ------------------------------------
function __toLowerCase(str) {
    return str.toLowerCase();
}

function __isStatement(node) {
    return node && node.type.indexOf('Statement') > -1;
}

function checkBlockFactory(target) {
    return function checkBlock(node) {
        var destination = node[target];


    }
}
