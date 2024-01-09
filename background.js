function redirect(details) {
  const url = new URL(details.url);
  const targetURL = url.searchParams.get("url");
  if (targetURL) {
    return {
      redirectUrl: targetURL
    };
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

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ["*://www.reddit.com/media*"], types: ["main_frame"] },
  ["blocking"]
);
browser.webRequest.onBeforeSendHeaders.addListener(
  modifyAcceptHeader,
  { urls: ['*://i.redd.it/*', '*://external-preview.redd.it/*', '*://preview.redd.it/*'] },
  ['blocking', 'requestHeaders']
);
