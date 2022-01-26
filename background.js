chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        defaultSpeed: 2,
        minSpeed: 1,
        maxSpeed: 3,
        sliderInterval: 0.5,
    });
});



chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log(`tab removed with id: ${tabId}`)
    chrome.storage.local.remove(`tabSpeed:${tabId}`);
})

chrome.tabs.onCreated.addListener((tab) => {
    console.log(`tab created with id: ${tab.id}`)
    chrome.scripting.executeScript(
        {
            target: {
                tabId: tab.id,
                allFrames: true,
            },
            func: createListener,
            args: [tab.id]
        },
        () => chrome.runtime.lastError
    )
});

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName == "local") {
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                if (tabSpeed = changes[`tabSpeed:${tab.id}`]) {
                    console.log(`Storage change. tab: ${tab.id}, speed: ${tabSpeed.newValue}`);
                    changeSpeed(tabSpeed.newValue, tab);
                }
            });
        })
    }
});

function createListener(tabId) {
    console.log(`tabid: ${tabId}`);
    const observer = new MutationObserver(mutations => {
        chrome.storage.local.get({ defaultSpeed: 1 }, ({ defaultSpeed: defaultSpeedValue }) => {
            chrome.storage.local.get({ [`tabSpeed:${currentTab.id}`]: defaultSpeedValue }, ({ [`tabSpeed:${currentTab.id}`]: speed }) => {
                [...document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "video")].forEach(video => video.playbackRate = speed);
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function changeSpeed(speed, tab) {
    chrome.scripting.executeScript(
        {
            target: {
                tabId: tab.id,
                allFrames: true,
            },
            func: setSpeed,
            args: [speed]
        },
        () => chrome.runtime.lastError
    );
}

function setSpeed(speed) {
    [...document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "video")].forEach(video => video.playbackRate = speed);
}
