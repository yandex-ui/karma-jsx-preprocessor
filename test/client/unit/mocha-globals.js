(function(global) {
    var sinon = global.sinon;

    beforeEach(function() {
        global.sinon = sinon.sandbox.create();
    });

    afterEach(function() {
        global.sinon.restore();
    });
}(this));
