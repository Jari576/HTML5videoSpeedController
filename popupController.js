// on page loaded 
document.addEventListener("DOMContentLoaded", function() {
    // Get selected speed element
    let slider = document.getElementById("selectedSpeed");
    let number = document.getElementById("currentSpeed");

    // Change slider to reflect options
    chrome.storage.local.get(
        {
            minSpeed: 1,
            maxSpeed: 3,
            sliderInterval: 0.5,
        },
        response => {
            slider.min = response.minSpeed;
            slider.max = response.maxSpeed;
            slider.step = response.sliderInterval;
        }
    );

    chrome.tabs.query({ currentWindow: true, active: true }, ([currentTab]) => {
        chrome.storage.local.get({ defaultSpeed: 1 }, ({ defaultSpeed: defaultSpeedValue }) => {
            chrome.storage.local.get({ [`tabSpeed:${currentTab.id}`]: defaultSpeedValue }, ({ [`tabSpeed:${currentTab.id}`]: speed }) => {
                slider.value = speed;
                number.innerHTML = speed;
            });
        });

        slider.addEventListener("input", event => {
            let sliderValue = slider.value ?? 1;
            number.innerHTML = sliderValue;
            chrome.storage.local.set({ [`tabSpeed:${currentTab.id}`]: sliderValue })
        });
    });
});

