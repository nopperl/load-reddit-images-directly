const pollingInterval = 500;

function replaceLightboxElementWithAnchor() {
  // only disable lightbox for /r/*/comments/* pages
  if (!(window.location.host === "www.reddit.com" && window.location.pathname.includes("/comments/"))) {
    return;
  }
  browser.storage.local.get('disableLightbox', function(result) {
    if (result.disableLightbox) {
      const images = document.querySelectorAll('img.media-lightbox-img');
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
	if (img.parentNode.nodeName == "A") {
	  continue;
	}
        const a = document.createElement('a');
        a.setAttribute('href', img.getAttribute('src'));
        img.parentNode.insertBefore(a, img);
        a.appendChild(img);
      }
    }
  });
}

replaceLightboxElementWithAnchor();
// regularly attempt to replace the lightbox as the window.location might have changed to a post page using history.pushState
setInterval(replaceLightboxElementWithAnchor, pollingInterval);
