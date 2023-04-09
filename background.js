chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'successCounter') {
    chrome.storage.local.set({ 'successCounter': message.value });
  } else if (message.type === 'requestInitialCounter') {
    chrome.storage.local.get('successCounter', (data) => {
      if (data.successCounter) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { type: 'setInitialCounter', value: data.successCounter });
        });
      }
    });
  }
});
