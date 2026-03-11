/**
 * auth-gate.js — Lightweight auth check for pages that don't load firebase.js.
 * Dynamically loads Firebase Auth (compat) and redirects to / if not signed in.
 * Include a single <script src="/js/auth-gate.js"></script> anywhere on the page.
 */
(function () {
    'use strict';

    var FIREBASE_VERSION = '10.7.1';
    var CDN = 'https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION;

    // If firebase is already loaded (e.g. dashboard, settings), reuse it
    if (window.firebase && window.firebase.auth) {
        checkAuth();
        return;
    }

    // Dynamically load Firebase compat SDKs
    var appScript = document.createElement('script');
    appScript.src = CDN + '/firebase-app-compat.js';
    appScript.onload = function () {
        var authScript = document.createElement('script');
        authScript.src = CDN + '/firebase-auth-compat.js';
        authScript.onload = function () {
            // Initialize only if not already initialized
            if (!firebase.apps.length) {
                firebase.initializeApp({
                    apiKey: 'AIzaSyCpDtcBpKvjLwihnL2bizxBFxXD6Qn8Lb4',
                    authDomain: 'letterinthescroll.firebaseapp.com',
                    projectId: 'letterinthescroll'
                });
            }
            checkAuth();
        };
        document.head.appendChild(authScript);
    };
    document.head.appendChild(appScript);

    function checkAuth() {
        var auth = firebase.auth();
        // onAuthStateChanged fires once immediately with cached state
        var unsubscribe = auth.onAuthStateChanged(function (user) {
            unsubscribe(); // only need the first callback
            if (!user) {
                window.location.href = '/';
            }
        });
    }
})();
