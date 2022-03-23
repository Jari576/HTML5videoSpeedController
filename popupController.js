// on page loaded 
document.addEventListener("DOMContentLoaded", function() {
    // Get selected speed element
    let slider = document.getElementById("selectedSpeed");
    let tickmarks = document.getElementById("tickmarks");

    chrome.tabs.query({ currentWindow: true, active: true }, ([currentTab]) => {

        slider.addEventListener("input", () => {
            let sliderValue = slider.value ?? 1;
            chrome.action.setBadgeText({
                tabId: currentTab.id,
                text: sliderValue,
            });
            chrome.storage.local.set({ [`tabSpeed:${currentTab.id}`]: sliderValue });
        });

        slider.addEventListener("change", () => {
            window.close();
        });

        // Change slider to reflect options
        chrome.storage.local.get(
            {
                minSpeed: 1,
                maxSpeed: 2,
                sliderInterval: 0.1,
                defaultSpeed: 1,
            },
            ({
                defaultSpeed,
                minSpeed,
                maxSpeed,
                sliderInterval,
            }) => {
                slider.min = minSpeed;
                slider.max = maxSpeed;
                slider.step = sliderInterval;
                const ticks = Array.from({ length: ((maxSpeed - minSpeed) / sliderInterval) }, (_, i) => i * sliderInterval + Number(minSpeed));
                console.log(`ticks: ${ticks}`)
                const tickmarkHTML = ticks.reduce((html, tick) => `${html}<option value="${tick}"></option>`, "");
                console.log(`HTML: ${tickmarkHTML}`)
                tickmarks.innerHTML = tickmarkHTML;
                chrome.storage.local.get({ [`tabSpeed:${currentTab.id}`]: defaultSpeed }, ({ [`tabSpeed:${currentTab.id}`]: speed }) => {
                    slider.value = speed;
                });
            }
        );
    });
});
