const passMessage = (message) => {
  if (message.direction === 'seetree-content-script') {
    browser.tabs.sendMessage(message.tabId, message);
  }

  if (message.direction === 'seetree-devtool') {
    browser.runtime.sendMessage(message);
  }
};

browser.runtime.onMessage.addListener(passMessage);
