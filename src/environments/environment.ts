// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    // API: Server URL
    apiUrl: 'http://api.escape.nygmarosebeauty.com/api/v1',
    appUrl: 'http://escape.nygmarosebeauty.com',

    // API: Firbase Services
    firebase: {
        apiKey: 'AIzaSyA8ZU8IxNKNc7oPGXwyaVd83B0mO8DmggE',
        authDomain: 'nr-escape.firebaseapp.com',
        databaseURL: 'https://nr-escape.firebaseio.com',
        projectId: 'nr-escape',
        storageBucket: 'nr-escape.appspot.com',
        messagingSenderId: '1731961068',
        appId: '1:1731961068:web:ccf4f76871e043bab745c9'
    },

    // URL Preview Link
    urlPreview: {
        url: 'https://api.linkpreview.net/',
        key: '5b54e80a65c77848ceaa4630331e8384950e09d392365'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
