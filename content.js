document.youtubezum = {};
(() => {

    chrome.storage.sync.get(['speed'], (result) => {

        let speed = 1;
        console.log(result);
        if (result.speed !== undefined) {
            speed = result.speed;
        }
        let intervalId = setInterval(() => {
            let video = document.getElementsByTagName("video");
            if (video !== undefined) {
                document.youtubezum.video = video[0];
                document.youtubezum.video.playbackRate = speed;
                clearInterval(intervalId);
            }
        }, 100);

    });


})();

chrome.runtime.onMessage.addListener((request, sender, response) => {
    if (document.youtubezum.video !== undefined) {
        chrome.storage.sync.set({speed: request.speed}, () => {
        });
        document.youtubezum.video.playbackRate = request.speed;
        response(request);
    }
});