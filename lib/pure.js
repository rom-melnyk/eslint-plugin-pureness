/**
 * @fileoverview Ensures files/methods are pure
 * @author Roman Melnyk
 */
'use strict';

/**
 * @type {{object: String, property: String}[]}
 * Each object contains name and property name of forbidden call, e.g., 'Math' and 'random'
 */
var FORBIDDEN_MEMBER_EXPRESSIONS = [
    'Math.random', 'Date.now', '_.now'
];

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
            //BlockStatement: checkBlockFactory('body'),
            //BinaryExpression: checkBinaryExpression,
            MemberExpression: checkMemberExpression(context)
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

function __isDeclaration(node) {
    return node && node.type.indexOf('Declaration') > -1;
}

function __isExpression(node) {
    return node && node.type.indexOf('Expression') > -1;
}

function checkBlockFactory(target) {
    return function checkBlock(node) {
        var destination = node[target];
    }
}

function checkBinaryExpression(node) {
}

function checkMemberExpression(context) {
    return function (node) {
        //var shouldReport = false;
        var message = 'This makes the method unpure: %0.%1()';

        FORBIDDEN_MEMBER_EXPRESSIONS.some(function (expr) {
            expr = expr.split('.');
            if (
                node.object && node.object.name === expr[0] &&
                node.property && node.property.name && expr[1]
            ) {
                context.report({
                    node: node,
                    message: message.replace('%0', expr[0]).replace('%1', expr[1])
                });
            }
        });

        //if (shouldReport) {
        //    console.log('Forbidden member!');
        //}
    };
}
