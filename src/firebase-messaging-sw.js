// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: 'AIzaSyA8ZU8IxNKNc7oPGXwyaVd83B0mO8DmggE',
    authDomain: 'nr-escape.firebaseapp.com',
    databaseURL: 'https://nr-escape.firebaseio.com',
    projectId: 'nr-escape',
    storageBucket: 'nr-escape.appspot.com',
    messagingSenderId: '1731961068',
    appId: '1:1731961068:web:ccf4f76871e043bab745c9'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
