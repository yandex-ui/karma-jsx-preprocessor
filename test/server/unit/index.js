/*global jsx*/
describe('index', function() {
    var system;

    beforeEach(function() {
        system = new jsx.System();
    });

    it('should include simple server module', function() {
        expect(system.include('projectDir/test/server/fixture/simple.jsx')).to.be.equal('Hello World');
    });

    it('should include server module and eval it in special context', function() {
        var barModule = system.include('projectDir/test/server/fixture/global-context.jsx', {
            User: {
                name: 'Guest'
            }
        });

        expect(barModule()).to.be.equal('Hello Guest');
    });

    it('should include server module with not valid javascript', function() {
        var module = system.include('projectDir/test/server/fixture/notvalid-javascript.jsx');

        expect(module()).to.be.equal(true);
    });

    it('should include server module with leader single line comment', function() {
        var module = system.include('projectDir/test/server/fixture/with-leader-single-comment.jsx');

        expect(module()).to.be.equal(true);
    });

    it('should include server module with leader multiline comment', function() {
        var module = system.include('projectDir/test/server/fixture/with-leader-multi-comment.jsx');

        expect(module()).to.be.equal(true);
    });
});
