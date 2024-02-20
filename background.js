let redirectToOriginalImageEnabled = false;

function redirect(details) {
  const url = new URL(details.url);
  const targetURL = url.searchParams.get("url");
  if (targetURL) {
    return {
      redirectUrl: targetURL
    };
  }
}

function redirectToOriginalImage(details) {
  if (redirectToOriginalImageEnabled) {
    var url = new URL(details.url);
    url.hostname = "i.redd.it";
    return {redirectUrl: url.toString()};
  }
}

function modifyAcceptHeader(details) {
  let newHeaders = details.requestHeaders.map(header => {
    if (header.name.toLowerCase() === 'accept') {
      return {
        name: header.name,
        value: 'image/avif,image/webp,*/*'
      };
    }
    return header;
  });

  return { requestHeaders: newHeaders };
}

checkSetting();
function checkSetting() {
  browser.storage.local.get('redirectToOriginalImage', function(result) {
    redirectToOriginalImageEnabled = result.redirectToOriginalImage
  });
}

browser.storage.onChanged.addListener(checkSetting);

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ["*://www.reddit.com/media*"], types: ["main_frame"] },
  ["blocking"]
);

browser.webRequest.onBeforeRequest.addListener(
  redirectToOriginalImage,
  { urls: ["*://preview.redd.it/*"], types: ["main_frame"] },
  ["blocking"]
);

browser.webRequest.onBeforeSendHeaders.addListener(
  modifyAcceptHeader,
  { urls: ['*://i.redd.it/*', '*://external-preview.redd.it/*', '*://preview.redd.it/*'] },
  ['blocking', 'requestHeaders']
);
