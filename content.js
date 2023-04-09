let successCounter = 0;
const successSound = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');

function sendSuccessCounter() {
  chrome.runtime.sendMessage({ type: 'successCounter', value: successCounter });
}

async function main() {
  chrome.runtime.sendMessage({ type: 'requestInitialCounter' });
  while (true) {
    const offset = (Math.random() + 1.2);
    await new Promise(r => setTimeout(r, 100 * offset));
    try {
      const casePrices = (([...document.querySelectorAll('div.flex.items-center.justify-center.rounded-tl-lg')]).splice(0, 3)).map(e => e.textContent);
      if (casePrices.includes('FREE')) {
        const btns = [...document.querySelectorAll('a.button.ml-1.mr-5')];
        const btn = btns[casePrices.indexOf('FREE')];
        btn.click();
        successCounter++;
        sendSuccessCounter();
        successSound.play();
        break;
      }
    } catch {
      null;
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'start') {
    main();
  } else if (message.type === 'setInitialCounter') {
    successCounter = message.value;
  }
});

