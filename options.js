function save_options() {
    let minSpeed = document.getElementById("min");
    let maxSpeed = document.getElementById("max");
    let sliderInterval = document.getElementById("sInterval");
    chrome.storage.local.set(
        {
            minSpeed: minSpeed.value,
            maxSpeed: maxSpeed.value,
            sliderInterval: sliderInterval.value,
        },
        function updateStatus() {
            var status = document.getElementById("status");
            status.textContent = "Options saved.";
            setTimeout(function () {
                status.textContent = "";
            }, 1000);
        }
    );
}

function restore_options() {
    chrome.storage.local.get(
        {
            minSpeed: 0.1,
            maxSpeed: 3,
            sliderInterval: 0.1,
        },
        function (items) {
            document.getElementById("min").value = items.minSpeed;
            document.getElementById("max").value = items.maxSpeed;
            document.getElementById("sInterval").value = items.sliderInterval;
        }
    );
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
