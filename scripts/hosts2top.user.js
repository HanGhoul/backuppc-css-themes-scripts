// ==UserScript==
// @name        BackupPC Host Selection to Top
// @description Detach and move the first <h2> and <select> from #NavMenu to after #logo-container
// @namespace   https://github.com/HanGhoul/backuppc-themes
// @version     1.0
// @match       *://example.com/*
// @grant       none
// ==/UserScript==

/* Replace "example.com" in the @match field above with the (sub)domain of your BackupPC instance. */

(function () {
    "use strict";

    function rearrangeElements() {
        try {
            const navMenu = document.querySelector("#NavMenu");
            const logoContainer = document.querySelector("#logo-container");

            if (!navMenu || !logoContainer) return; // Exit if elements are not found

            // Look for the first H2 and the <select> that follows it
            const firstH2 = navMenu.querySelector("h2.NavTitle");
            const selectElement = firstH2 ? firstH2.nextElementSibling : null;

            if (firstH2 && selectElement && selectElement.tagName === "SELECT") {
                const fragment = document.createDocumentFragment();
                fragment.appendChild(firstH2);
                fragment.appendChild(selectElement);

                // Insert the detached elements after #logo-container
                logoContainer.parentNode.insertBefore(fragment, logoContainer.nextSibling);

                // Disconnect the observer after successful rearrangement
                observer.disconnect();
            }
        } catch (err) {
            console.error("Error in rearrangeElements:", err);
        }
    }

    const observer = new MutationObserver(() => {
        try {
            rearrangeElements();
        } catch (err) {
            console.error("Error in MutationObserver callback:", err);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    try {
        rearrangeElements();
    } catch (err) {
        console.error("Error during initial rearrangeElements call:", err);
    }
})();
