const downloadHandler = async (event) => {
  if (!('BackgroundFetchManager' in window)) {
    return;
  }

  event.preventDefault();

  const element = event.target;
  const svg = element.closest('svg');
  const svgProgress = svg.querySelector('.action-progress');
  const svgError = svg.querySelector('.action-error');
  const svgAbort = svg.querySelector('.action-abort');
  const svgDl = svg.querySelector('.action-dl');
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

  const bgFetchProgress = (progressEvent) => {
    console.log(progressEvent);
    switch(progressEvent.type) {
      case 'backgroundfetchfail':
        svg.querySelector('.action-on').classList.remove('action-on');
        svgError.classList.add('action-on');
        break;
      case 'backgroundfetchsuccess':
        svg.querySelector('.action-on').classList.remove('action-on');
        //svgSuccess.classList.add('action-on');
        break;
      case 'progress':
        const percent = Math.round(progressEvent.downloaded / progressEvent.downloadTotal * 100);
        svgProgress.style.setProperty('--progress', percent);
        break;
    }
  };

  bgFetch.addEventListener('progress', bgFetchProgress);
};

const atttachDownloadHandler = () => {
  const downloads = document.querySelectorAll('.action-button');
  downloads.forEach(download => download.addEventListener('click', downloadHandler));
};

const registerServiceWorker = async () => {
  const sw = await navigator.serviceWorker.register('sw.js');
};

window.addEventListener('load', atttachDownloadHandler);
window.addEventListener('load', registerServiceWorker);