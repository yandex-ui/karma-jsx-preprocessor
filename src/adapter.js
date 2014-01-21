(function(global) {
    var jsx = {};

    var System = function(jsx) {
        this.fileSystem = {};
        this.jsx = jsx || global.jsx;
    };

    /**
     * @desc Implement server include function
     * @param {String} filepath The file path
     * @param {[Object]} context The context in which will be
     * evaluate module
     */
    System.prototype.include = function(filepath, context) {
        var content = this.getFile(filepath);
        var result;

        if (context) {
            this.jsx.context[filepath] = context;
        }

        result = content.wrapper ? content() : content;

        this.jsx.context[filepath] = null;

        return result;
    };

    /**
     * @desc Get file content from virtual server
     * @param {String} filepath The file path
     * @return {Any} The content of the file or module
     */
    System.prototype.getFile = function(filepath) {
        if (this.fileSystem.hasOwnProperty(filepath)) {
            return this.fileSystem[filepath];
        }

        if (this.jsx.fileSystem.hasOwnProperty(filepath)) {
            return this.jsx.fileSystem[filepath];
        }

        throw new Error('File ' + filepath + ' does not exist!');
    };

    /**
     * @desc simple add file to virtual server file system
     * @param {string} filepath The file path
     * @param {any} content The files's content
     */
    System.prototype.addFile = jsx.addFile = function(filepath, content) {
        this.fileSystem[filepath] = content;
    };

    /**
     * @desc add file to virtual server file system.
     * It create wrapper function which will be invoked
     * when you call system.include and return result
     * of module.
     *
     * It also allow replace global server variable.
     *
     * @param {String} filepath The file path
     * @param {String | Function} content The file content
     */
    jsx.addServerFile = function(filepath, content) {
        /*jshint evil:true*/
        var wrapperFunction = content;

        if (typeof content === 'string') {
            wrapperFunction = new Function('with(jsx.context["' + filepath + '"] || {}){return ' + content + '}');
        }

        wrapperFunction.wrapper = true;

        this.addFile(filepath, wrapperFunction);
    };

    jsx.System = System;
    jsx.context = {};
    jsx.fileSystem = {};

    /**
     * export module
     */
    global.jsx = jsx;
}(this));
