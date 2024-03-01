document.addEventListener('DOMContentLoaded', function () {
  let checkbox_redirectToOriginalImage = document.getElementById('redirectToOriginalImage');
  let checkbox_disableLightbox = document.getElementById('disableLightbox');

  // Get the current enabled setting from storage
  browser.storage.local.get('redirectToOriginalImage').then((res) => {
    checkbox_redirectToOriginalImage.checked = res.redirectToOriginalImage;
  });
  browser.storage.local.get('disableLightbox').then((res) => {
    checkbox_disableLightbox.checked = res.disableLightbox;
  });

  // Update the setting in storage when the checkbox is changed
  checkbox_redirectToOriginalImage.addEventListener('change', function () {
    browser.storage.local.set({
      redirectToOriginalImage: checkbox_redirectToOriginalImage.checked,
    });
  });
  checkbox_disableLightbox.addEventListener('change', function () {
    browser.storage.local.set({
      disableLightbox: checkbox_disableLightbox.checked,
    });
  });
});
