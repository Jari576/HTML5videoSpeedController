chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        defaultSpeed: 1,
        minSpeed: 1,
        maxSpeed: 2,
        sliderInterval: 0.1,
    });
});

chrome.action.setBadgeBackgroundColor({
    color: [0, 0, 0, 255],
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === 'getTabId') sendResponse({ tabId: sender.tab.id });
    chrome.storage.local.get({ defaultSpeed: 1 }, response => {
        chrome.action.setBadgeText({
            tabId: sender.tab.id,
            text: String(response.defaultSpeed),
        })
    });
});

