(function(User) {
    return function() {
        return 'Hello ' + User.name;
    };
}(User));
