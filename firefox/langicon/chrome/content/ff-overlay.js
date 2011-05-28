langicon.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ langicon.showFirefoxContextMenu(e); }, false);
};

langicon.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-langicon").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { langicon.onFirefoxLoad(); }, false);
