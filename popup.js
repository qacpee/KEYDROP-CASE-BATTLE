async function requestSuccessCounter() {
  try {
    chrome.storage.local.get('successCounter', (data) => {
      if (data.successCounter) {
        updateSuccessCounter(data.successCounter);
      }
    });
  } catch (error) {
    console.error('Error while requesting success counter:', error);
  }
}

function updateSuccessCounter(counter) {
  const counterNumberElement = document.getElementById('counterNumber');
  counterNumberElement.textContent = counter;
}

document.getElementById('resetBtn').addEventListener('click', () => {
  chrome.storage.local.set({ 'successCounter': 0 }, () => {
    updateSuccessCounter(0);
  });
});

document.getElementById('startBtn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, 'start');
    requestSuccessCounter();
  } catch (error) {
    console.error('Error while starting script:', error);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'successCounter') {
    updateSuccessCounter(message.value);
  }
});

window.addEventListener('load', () => {
  requestSuccessCounter();
});
