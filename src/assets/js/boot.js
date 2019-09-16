(($) => {
    // On load check if Cordova is included
    $(window).bind('load', () => {
        if (!!window.Cordova) {
            console.log('Using Cordova');

            // TODO: Initiate Push for Android/iOS
        } else {
            console.log('Pure Angular');

            // TODO: Initiate Push for pure Angular
        }
    })
})(jQuery);
