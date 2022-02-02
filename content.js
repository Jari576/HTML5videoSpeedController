chrome?.runtime?.sendMessage('getTabId', ({ tabId }) => {
    const observer = new MutationObserver(mutations => {
        chrome.storage?.local?.get({ defaultSpeed: 1 }, ({ defaultSpeed }) => {
            chrome.storage?.local?.get({ [`tabSpeed:${tabId}`]: defaultSpeed }, ({ [`tabSpeed:${tabId}`]: speed }) => {
                setSpeed(speed);
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    chrome.storage?.onChanged?.addListener((changes, areaName) => {
        if (areaName == "local") {
            if (speed = changes[`tabSpeed:${tabId}`]?.newValue) {
                setSpeed(speed);
            }
        }
    });
});

function setSpeed(speed) {
    [...document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "video")].forEach(video => video.playbackRate = speed);
}
