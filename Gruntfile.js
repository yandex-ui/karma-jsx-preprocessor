module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkgFile: 'package.json',
        files: {
            server: ['test/unit/server/mocha-globals.js', 'test/unit/server/**/*.js'],
            client: ['test/client/**/*.js']
        },
        karma: {
            client: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            server: {
                configFile: 'karma-test.conf.js',
                singleRun: true
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: ['*.js', 'src/*.js']
            }
        },
        'npm-contributors': {
            options: {
                commitMessage: 'chore: update contributors'
            }
        },
        bump: {
            options: {
                commitMessage: 'chore: release v%VERSION%',
                pushTo: 'origin'
            }
        },
        'auto-release': {
            options: {
                checkTravisBuild: true
            }
        }
    });

    grunt.registerTask('release', 'Bump the version and publish to NPM.', function(type) {
        return grunt.task.run(['npm-contributors', "bump:" + (type || 'patch'), 'npm-publish']);
    });
    grunt.registerTask('test', ['jshint', 'karma:server', 'karma:client']);
    grunt.registerTask('default', ['jshint', 'test']);
};
