(($) => {
    // On load check if Cordova is included
    $(window).bind('load', () => {
        if (!!(window.cordova || window.Cordova)) {
            console.log('Using Cordova');
        } else {
            console.log('Pure Angular');
        }
    })
})(jQuery);
