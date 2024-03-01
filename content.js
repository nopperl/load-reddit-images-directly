const pollingInterval = 500;

function replaceLightboxElementWithAnchor() {
  browser.storage.local.get('disableLightbox', function(result) {
    if (result.disableLightbox) {
      const images = document.querySelectorAll('img.media-lightbox-img');
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const a = document.createElement('a');
        a.setAttribute('href', img.getAttribute('src'));
        img.parentNode.insertBefore(a, img);
        a.appendChild(img);
      }
    }
  });
}

// Schedule the initial check and start polling
replaceLightboxElementWithAnchor();
setInterval(replaceLightboxElementWithAnchor, pollingInterval);
