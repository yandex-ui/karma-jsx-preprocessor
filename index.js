var path = require('path');
var util = require('util');
var uglify = require('uglify-js');

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

        content = uglify.minify(content, {
            fromString: true,
            mangle: false,
            compress: {
                negate_iife: false
            }
        });
        content = content.code.replace(/(\\)/gm, '\\$1').replace(/([\"\'])/gm, '\\$1');
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
