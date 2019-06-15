const downloadHandler = async (event) => {
  if (!('BackgroundFetchManager' in window)) {
    return;
  }

  event.preventDefault();

  const element = event.target;
  const src = element.href;
  const title = element.title;
  const id = src;
  const size = element.getAttribute('size');
  const image = element.getAttribute('image');

  const reg = await navigator.serviceWorker.ready;
  const bgFetch = await reg.backgroundFetch.fetch(id, [src], {
    title: title,
    icons: [{ sizes: '300x300', src: image, type: 'image/jpeg' }],
    downloadTotal: size
  });

  const bgFetchProgress = () => {

  };
  bgFetch.addEventListener('progress', bgFetchProgress);
};

const atttachDownloadHandler = () => {
  const downloads = document.querySelectorAll('.action-button');
  downloads.forEach(download => download.addEventListener(downloadHandler));
};

const registerServiceWorker = async () => {
  const sw = await navigator.serviceWorker.register('sw.js');
};

document.addEventListener('load', atttachDownloadHandler);
document.addEventListener('load', registerServiceWorker);