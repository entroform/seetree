const input = document.querySelector('#input-selector')
const button = document.querySelector('#button-submit');
const result = document.querySelector('#result');

button.addEventListener('click', async () => {
  browser.runtime.sendMessage({
    direction: 'seetree-content-script',
    command: 'map',
    selector: input.value.trim(),
    tabId: browser.devtools.inspectedWindow.tabId,
  });
});

browser.runtime.onMessage.addListener((message) => {
  result.innerHTML = message.content.join('<br />');
});

browser.devtools.panels.create(
  "SeeTree",
  "icons/star.png",
  "devtool.html",
);
