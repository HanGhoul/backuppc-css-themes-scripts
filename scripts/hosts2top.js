// No userscript manager required if you append below code to:
// `/usr/share/backuppc/image/sorttable.js`

// For userscript managers use `hosts2top.user.js`

// Host Selection to Top
document.addEventListener("DOMContentLoaded", () => {
  // Find the elements inside the original NavMenu
  const navMenu = document.querySelector("#NavMenu");
  const logoContainer = document.querySelector("#logo-container");

  // Look for the first H2 and the <select> that follows it
  const firstH2 = navMenu?.querySelector("h2.NavTitle");
  const selectElement = firstH2 ? firstH2.nextElementSibling : null;

  if (firstH2 && selectElement && selectElement.tagName === "SELECT") {
    // Create a DocumentFragment to hold the detached elements
    const fragment = document.createDocumentFragment();
    fragment.appendChild(firstH2);
    fragment.appendChild(selectElement);

    // Insert the detached elements after #logo-container
    logoContainer.parentNode.insertBefore(fragment, logoContainer.nextSibling);
  }
});
