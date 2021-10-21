
// on page loaded 
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
            changeSpeed(response.speed);
        }
    );

    slider.addEventListener("input", event => {
        let sliderValue = slider.value ?? 1;
        chrome.storage.local.set({speed: sliderValue})
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace == "local" && changes.speed?.newValue) {
            changeSpeed(changes.speed.newValue);
        }
        
    })
});

function changeSpeed(speed) {
    chrome.tabs.query({}, (tabs) => tabs.forEach( tab => {
        chrome.scripting.executeScript(
            {
                target: {
                    tabId: tab.id,
                    allFrames: true
                },
                func: setSpeed,
                args: [speed]
            },
            () => chrome.runtime.lastError
        );
    }));
    document.getElementById("currentSpeed").innerHTML = speed;
    
}

function setSpeed(speed){
    [...document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "video")].forEach(video => video.playbackRate = speed);
}