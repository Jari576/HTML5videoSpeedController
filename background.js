chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        defaultSpeed: 2,
        minSpeed: 1,
        maxSpeed: 3,
        sliderInterval: 0.5,
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === 'getTabId') sendResponse({ tabId: sender.tab.id });
});

function setSpeed(speed) {
    [...document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "video")].forEach(video => video.playbackRate = speed);
}
