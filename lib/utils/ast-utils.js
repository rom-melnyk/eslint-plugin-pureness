module.exports = {
    getCode: getCode
};

function getCode(context, node) {
    if (!context || !node) {
        return '';
    }

    var sourceCode = context.getSourceCode();
    var text = sourceCode && sourceCode.getText(node);
    text = text.replace(/\n/g, '');

    return text;
}
