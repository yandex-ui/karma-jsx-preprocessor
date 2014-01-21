/*global jsx*/
describe('Testing API for server side javascript(jsx)', function() {
    describe('How use System object', function() {
        var system;

        beforeEach(function() {
            system = new jsx.System();
        });

        it('add file in system', function() {
            system.addFile('/test/foo.txt', 'Hello World!');

            expect(system.include('/test/foo.txt')).to.be.equal('Hello World!');
        });

        it('get file from system', function() {
            system.addFile('/test/foo.txt', 'Hello World!');

            expect(system.getFile('/test/foo.txt')).to.be.equal('Hello World!');
        });

        it('add server javascript in system', function() {
            /**
             * This function using in preprocessor
             * In your test you should use `addFile` function
             * instead `addServerFile`
             */
            jsx.addServerFile('/test/foo.js', '{foo: "bar"}');

            expect(system.include('/test/foo.js')).to.be.eql({
                foo: "bar"
            });
        });

        it('include file in special defined context', function() {
            /**
             * This allow you simple mock and stub global server
             * side objects
             */
            jsx.addServerFile('/test/foo.js', 'function(User){return User.name}(User);');

            expect(system.include('/test/foo.js', {
                User: {
                    name: 'Guest'
                }
            })).to.be.eql('Guest');
        });


        it('raise exception if file does not exist in system', function() {
            expect(function() {
                system.include('/test/foo.txt');
            }).to.throwError(/does not exist/);
        });

        it('example of include file which using System object', function() {
            system.addFile('/greet.txt', 'Hello');
            jsx.addServerFile('/test/foo.js', 'function(User, System){return System.include("/greet.txt") + " " + User.name}(User, System);');

            expect(system.include('/test/foo.js', {
                User: {
                    name: 'Guest'
                },
                System: system
            })).to.be.eql('Hello Guest');
        });

        it('should clear context after call module', function() {
            jsx.addServerFile('/test/foo.js', 'function(User){return User.name}(User);');

            system.include('/test/foo.js', {
                User: {
                    name: 'Guest'
                }
            });

            expect(system.jsx.context['/test/foo.js']).to.be.equal(null);
        });
    });
});
