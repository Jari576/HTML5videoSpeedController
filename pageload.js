const observer = new MutationObserver(mutations => {
    chrome.storage.local.get({ speed: 1 }, response => {
        [...document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "video")].forEach(video => video.playbackRate = response.speed);
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
