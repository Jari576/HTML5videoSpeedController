document.addEventListener("DOMContentLoaded", function () {
    // Get selected speed element
    let slider = document.getElementById("selectedSpeed");

    // Change slider to reflect options
    chrome.storage.local.get(
        {
            minSpeed: 0.1,
            maxSpeed: 3,
            sliderInterval: 0.1,
            speed: 1,
        },
        response => {
            slider.min = response.minSpeed;
            slider.max = response.maxSpeed;
            slider.step = response.sliderInterval;
            slider.value = response.speed;
            exec(response.speed);
        }
    );

    slider.addEventListener("input", event => {
        let sliderValue = slider.value ?? 1;
        chrome.storage.local.get({ speed: 1 }, result => {
            if (sliderValue !== result.speed) exec(sliderValue);
        });
    });
});

function exec(speed) {
    chrome.storage.local.set({ speed: speed });
    chrome.tabs.executeScript(
        {
            // code: `console.log(${speed});`,
            code: `[...document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "video")].forEach(video => video.playbackRate = ${speed});`,
        },
        () => chrome.runtime.lastError
    );
    document.getElementById("currentSpeed").innerHTML = speed;
}
