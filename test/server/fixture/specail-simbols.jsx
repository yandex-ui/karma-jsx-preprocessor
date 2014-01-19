(function() {
    /*global data*/
    return {
        type: data.types.split('\n').map(function(type) {
            return parseInt(type, 10);
        }),
        data: data.sanitize_signature.replace(/\u2028/g, '&#8232;')
    };
}());
