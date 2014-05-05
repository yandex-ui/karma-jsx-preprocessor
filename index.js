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

var jsxLoader = function(logger, basePath, projectDir) {
    var log = logger.create('preprocessor.jsx');

    return function(content, file, done) {
        var filePath = path.relative(basePath, file.originalPath);
        var uglifyOptions = {
            fromString: true,
            mangle: false,
            compress: {
                dead_code: false,
                unused: false,
                negate_iife: false
            }
        };
        var uglifyContent = function(content) {
            return uglify.minify(content, uglifyOptions).code;
        };
        var resultContent;

        filePath = path.join(projectDir || '', filePath);
        log.debug('Processing "%s".', file.originalPath);

        /**
         * Может быть не валидный javascript внутри jsx
         * Стоит попробовать библиотеку для удалени комментариев
         */
        try {
            resultContent = util.format('jsx.addServerFile("%s", function(){with(jsx.context["%s"] || {}){return %s}});', filePath, filePath, uglifyContent(content));
        } catch (e) {
            // Not Valid javascript
            resultContent = util.format('jsx.addServerFile("%s", function(){with(jsx.context["%s"] || {}){return (%s)}});', filePath, filePath, content);
            resultContent = uglifyContent(resultContent);
        }

        log.debug(resultContent);

        done(resultContent);
    };
};

jsxLoader.$inject = ['logger', 'config.basePath', 'config.jsx.projectDir'];

var jsxInit = function(files) {
    files.unshift(createPattern(__dirname + '/src/adapter.js'));
};

jsxInit.$inject = ['config.files'];

module.exports = {
    'preprocessor:jsx': ['factory', jsxLoader],
    'framework:jsx': ['factory', jsxInit]
};
