function getVideos(eleman) {

    let videolar = eleman.getElementsByTagName('ytd-thumbnail-overlay-time-status-renderer');
    return videolar;
}

function sureHesapla(videos) {
    let toplam_sure = [];
    for (let i = 0; i < videos.length; i++) {
        toplam_sure.push(videos[i].innerText || "");
    }

    let dakika = 0;
    let saniye = 0;
    toplam_sure.forEach(function (element) {
        if (!element.includes("\n")) {
            let d_s = element.split(":");
            if (d_s.length > 2) {
                let s_d = parseInt(d_s[0]) * 60;
                dakika = dakika + s_d + parseInt(d_s[1]);
                saniye = saniye + parseInt(d_s[2]);
            } else {
                dakika = dakika + parseInt(d_s[0]);
                saniye = saniye + parseInt(d_s[1]);
            }
        }

    });
    //let saniye_d = Math.floor(saniye / 60);
    //let toplam_dakika = dakika + saniye_d

    return parseInt(dakika * 60) + parseInt(saniye);
}

function timeConvert(n) {
    var d = Number(n);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

function addSpan() {
    if (document.readyState === 'complete') {
        if (window.location.href.indexOf("playlist") > -1) {
            var a = document.getElementsByClassName('style-scope ytd-playlist-video-list-renderer').contents;
        } else {
            var a = document.getElementsByClassName('playlist-items yt-scrollbar-dark style-scope ytd-playlist-panel-renderer').items;
        }

        var videos = getVideos(a);
        var toplam_sure = sureHesapla(videos);
        var duration = 'Total Time: [ '+timeConvert(toplam_sure)+' ]';
        var hr = document.createElement('hr');
        var node = document.createElement("span");
        var textnode = document.createTextNode(duration);
        node.style.fontSize = "1.1rem";

        node.appendChild(textnode);
        node.className = "yt-simple-endpoint style-scope";
        node.id = "total_playlist_time";
        if (window.location.href.indexOf("playlist") > -1) {
            document.getElementById('title').appendChild(hr);
            document.getElementById('title').appendChild(node);
        } else {
            document.getElementById('save-button').appendChild(node);
        }


        if (!document.getElementById("total_playlist_time")) {
            console.log('youtube playlist duration calculator loaded.')
            if (window.location.href.indexOf("playlist") > -1) {
                document.getElementById('title').appendChild(hr);
                document.getElementById('title').appendChild(node);
            } else {
                document.getElementById('save-button').appendChild(node);
            }
            clearInterval(timer);
        } else {
            document.getElementById("total_playlist_time").remove();
            if (window.location.href.indexOf("playlist") > -1) {
                document.getElementById('title').appendChild(hr);
                document.getElementById('title').appendChild(node);
            } else {
                document.getElementById('save-button').appendChild(node);
            }
        }
    }

}
var timer = setInterval(addSpan, 4000);