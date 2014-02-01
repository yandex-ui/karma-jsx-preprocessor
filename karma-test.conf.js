module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'expect', 'sinon', 'jsx'],
        files: [
            'test/server/fixture/*.jsx',
            'test/server/unit/**/*.js'
        ],
        plugins: [
            'karma-mocha',
            'karma-expect',
            'karma-sinon',
            'karma-phantomjs-launcher',
            require('./index.js'),
            require('./src/adapter.js')
        ],
        reporters: ['progress'],
        preprocessors: {
            '**/*.jsx': ['jsx']
        },
        jsx: {
            projectDir: 'projectDir'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: false
    });
};
