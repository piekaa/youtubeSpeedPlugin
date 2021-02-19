window.addEventListener('DOMContentLoaded', (event) => {

    let buttons = document.getElementsByClassName("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", selectSpeed, false);
        console.log(buttons[i]);
    }

    chrome.storage.sync.get(['speed'], (result) => {
        if (result.speed === undefined) {
            document.getElementById("1").classList.add("selected");
        } else {
            document.getElementById(result.speed + "").classList.add("selected");
        }
    });

});

function selectSpeed() {

    chrome.tabs.query({currentWindow: true, active: true},
        (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id,
                {
                    speed: parseFloat(this.innerText),
                    divId: this.id
                }, selectSpeedUI);


        });
}

function selectSpeedUI(data) {
    let selectedList = document.getElementsByClassName("selected");
    for (let i = 0; i < selectedList.length; i++) {
        selectedList[i].classList.remove("selected");
    }
    document.getElementById(data.divId+"").classList.add("selected");
}

