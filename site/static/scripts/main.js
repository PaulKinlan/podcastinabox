const downloadHandler = async (event) => {
  if (!('BackgroundFetchManager' in window)) {
    return;
  }

  event.preventDefault();

  const element = event.target.closest('a');
  const svg = element.querySelector('svg');
  const svgProgress = svg.querySelector('.action-progress');
  const svgError = svg.querySelector('.action-error');
  const svgAbort = svg.querySelector('.action-abort');
  const svgDl = svg.querySelector('.action-dl');
  const href = element.closest('a.read-more').href;
  const src = element.href;
  const title = element.title;
  const id = href;
  const size = element.getAttribute('size');
  const image = element.getAttribute('image');
  const reg = await navigator.serviceWorker.ready;
  let bgFetch = await reg.backgroundFetch.get(id) ||
                await reg.backgroundFetch.fetch(id, [src], {
    title: title,
    icons: [{ sizes: '300x300', src: image, type: 'image/jpeg' }],
    downloadTotal: size
  });

  if (svgAbort.classList.contains('action-on')) {
    bgFetch.abort(id);
    return;
  }

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
        if (progressEvent.target.result === 'failure') {
          svg.querySelector('.action-on').classList.remove('action-on');
          svgError.classList.add('action-on');
          break;
        }
        const percent = Math.round(bgFetch.downloaded / bgFetch.downloadTotal * 100);
        svgProgress.style.setProperty('--progress', percent);
        break;
    }
  };

  svgDl.classList.remove('action-on');
  svgAbort.classList.add('action-on');
  bgFetch.addEventListener('progress', bgFetchProgress);
};

const atttachDownloadHandler = () => {
  const downloads = document.querySelectorAll('.action-button');
  downloads.forEach(download => download.addEventListener('click', downloadHandler));
};

const registerServiceWorker = async () => {
  const sw = await navigator.serviceWorker.register('sw.js');
  const reg = await sw.ready;
  const ids = await reg.backgroundFetch.getIds();
  ids.forEach(id => {
    // Update the UI on reload.
  })
};

window.addEventListener('load', atttachDownloadHandler);
window.addEventListener('load', registerServiceWorker);