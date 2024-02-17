document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.getElementById('redirectToOriginalImage');

  // Get the current enabled setting from storage
  browser.storage.local.get('redirectToOriginalImage').then((res) => {
    checkbox.checked = res.redirectToOriginalImage;
  });

  // Update the setting in storage when the checkbox is changed
  checkbox.addEventListener('change', function () {
    browser.storage.local.set({redirectToOriginalImage: checkbox.checked});
  });
});
