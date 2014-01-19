/*global __jsx__*/
describe('index', function() {
    var jsx = __jsx__;
    var system;

    beforeEach(function() {
        system = new jsx.System();
    });

    it('should include server module', function() {
        expect(system.include('karma-jsx-preprocessor/test/server/fixture/foo.jsx')).to.be.equal('Hello World');
    });

    it('should include server module and eval it in special context', function() {
        var barModule = system.include('karma-jsx-preprocessor/test/server/fixture/bar.jsx', {
            User: {
                name: 'Guest'
            }
        });

        expect(barModule()).to.be.equal('Hello Guest');
    });
});
