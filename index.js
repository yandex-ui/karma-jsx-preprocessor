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

        content = content.replace(/([\"\'])/gm, '\\$1');
        content = content.replace(/(\r\n|\n|\r)/gm, "");
        content = util.format('__jsx__.addServerFile("%s", "%s");', filePath, content);

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
