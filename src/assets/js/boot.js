window.onload = (event) => {
    console.log(
        !!(window.cordova || window.Cordova) ? 'Using Cordova' : 'Pure Angular'
    );
}