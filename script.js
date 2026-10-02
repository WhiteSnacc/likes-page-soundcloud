// Sub Nav
const subNavLinks = document.querySelectorAll(".sub-nav a");

subNavLinks.forEach(link => {
link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".sub-nav a.active").classList.remove("active");
    link.classList.add("active");
    });
});

// PLay Controls
const audio = document.querySelector("#audio");
const playButton = document.querySelector("#play-button");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const progress = document.querySelector("#progress");
const playerStatus = document.querySelector("#player-status");
const tracks = [
    "songs/Nightcore - Darkside - Alan Walker.mp3",
    "songs/Mitski - Nobody (Lyric Video) - Dead Oceans.mp3",
];
let currentTrackIndex = 0;

function changeTrack(direction) {
    const shouldPlay = !audio.paused;
    currentTrackIndex = (currentTrackIndex + direction + tracks.length) % tracks.length;
    audio.src = tracks[currentTrackIndex];
    audio.load();
    progress.value = 0;
    playerStatus.textContent = "";

    if (shouldPlay) {
        audio.play().catch((error) => {
            if (error.name !== "AbortError") {
                playerStatus.textContent = `Gagal memutar audio: ${error.message}`;
            }
        });
    }
}

previousButton.addEventListener("click", () => changeTrack(-1));
nextButton.addEventListener("click", () => changeTrack(1));
audio.addEventListener("ended", () => changeTrack(1));

playButton.addEventListener("click", async () => {
    if (audio.paused) {
        playerStatus.textContent = "";
        try {
            await audio.play();
        } catch (error) {
            if (error.name !== "AbortError") {
                playerStatus.textContent = `Gagal memutar audio: ${error.message}`;
            }
        }
    } else {
        audio.pause();
    }
});

audio.addEventListener("error", () => {
    const errorCode = audio.error?.code ?? "tidak diketahui";
    playerStatus.textContent = `Audio gagal dimuat (kode ${errorCode}). Periksa file dan lokasi lagu.`;
});

audio.addEventListener("play", () => {
    playButton.textContent = "❚❚";
    playButton.setAttribute("aria-label", "Jeda");
});

audio.addEventListener("pause", () => {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Putar");
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});