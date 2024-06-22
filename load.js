function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) resolve(document.querySelector(selector));

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

(async () => {
  const div = document.createElement('div');
  div.id = 'sbx-panel';
  div.innerHTML = await fetch(chrome.runtime.getURL('panel.html')).then(res => res.text());

  if (document.body.classList.contains('dark-theme')) div.classList.add('dark');

  const linebreak = document.createElement('br');

  const runningGames = await waitForElm('#rbx-running-games');

  runningGames.parentNode.insertBefore(div, runningGames);
  runningGames.parentNode.insertBefore(linebreak, runningGames);
})();
