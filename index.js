var path = require('path');
var util = require('util');

var createPattern = function(file) {
    return {
        pattern: file,
        included: true,
        served: true,
        watched: false
    };
};

var jsxLoader = function(logger, basePath) {
    var log = logger.create('preprocessor.jsx');

    return function(content, file, done) {
        var filePath = path.relative(basePath + '/..', file.originalPath);

        log.debug('Processing "%s".', file.originalPath);

        content = util.format('jsx.addServerFile("%s", function(){with(jsx.context["%s"] || {}){return %s}});', filePath, filePath, content);

        log.debug(content);

        done(content);
    };
};

jsxLoader.$inject = ['logger', 'config.basePath'];

var jsxInit = function(files) {
    files.unshift(createPattern(__dirname + '/src/adapter.js'));
};

jsxInit.$inject = ['config.files'];

module.exports = {
    'preprocessor:jsx': ['factory', jsxLoader],
    'framework:jsx': ['factory', jsxInit]
};
