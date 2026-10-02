// Sub Nav
const subNavLinks = document.querySelectorAll(".sub-nav a");

subNavLinks.forEach(link => {
link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".sub-nav a.active").classList.remove("active");
    link.classList.add("active");
    });
});
// FOOTER
document.getElementById('year').textContent = new Date().getFullYear();

const langButton = document.getElementById('langBtn');
const langModal = document.getElementById('langModal');
const langCloseButton = document.getElementById('langClose');
const langCancelButton = document.getElementById('langCancel');

if (langButton && langModal) {
    const setModalClosed = () => {
        langModal.hidden = true;
        langButton.setAttribute('aria-expanded', 'false');
    };

    const setModalOpen = () => {
        langModal.hidden = false;
        langButton.setAttribute('aria-expanded', 'true');
    };

    langButton.addEventListener('click', event => {
        event.stopPropagation();
        if (langModal.hidden) {
            setModalOpen();
        } else {
            setModalClosed();
        }
    });

    langModal.querySelectorAll('[data-lang]').forEach(item => {
        item.addEventListener('click', () => {
            langModal.querySelector('.active')?.classList.remove('active');
            item.classList.add('active');
            langButton.textContent = item.textContent;
            setModalClosed();
        });
    });

    if (langCloseButton) {
        langCloseButton.addEventListener('click', setModalClosed);
    }

    if (langCancelButton) {
        langCancelButton.addEventListener('click', setModalClosed);
    }

    document.addEventListener('click', event => {
        if (!langModal.contains(event.target) && !langButton.contains(event.target)) {
            setModalClosed();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            setModalClosed();
        }
    });
}

// PLay Controls
const audio = document.querySelector("#audio");
const playButton = document.querySelector("#play-button");
const previousButton = document.querySelector("#previous-button");
const nextButton = document.querySelector("#next-button");
const progress = document.querySelector("#progress");
const playerStatus = document.querySelector("#player-status");
const trackArtwork = document.querySelector("#track-artwork");
const trackTitle = document.querySelector("#track-title");
const trackArtist = document.querySelector("#track-artist");
const currentTimeDisplay = document.querySelector("#current-time");
const durationDisplay = document.querySelector("#duration");
const playerProgressTrack = document.querySelector("#player-progress");
const playIcon = document.querySelector("#play-icon");
const volume = document.querySelector("#volume");
const muteButton = document.querySelector("#mute-button");
const shuffleButton = document.querySelector("#shuffle-button");
const repeatButton = document.querySelector("#repeat-button");
const likeButton = document.querySelector("#like-button");
const followButton = document.querySelector("#follow-button");
const nextUpButton = document.querySelector("#next-up-button");
const nextUpMenu = document.querySelector("#next-up-menu");
const nextUpList = document.querySelector("#next-up-list");
const tracks = [
    { title: "Darkside", artist: "Alan Walker", image: "assets/grid1.jpg", src: "songs/Nightcore - Darkside - Alan Walker.mp3" },
    { title: "Nobody", artist: "Mitski", image: "assets/grid2.jpg", src: "songs/Mitski - Nobody (Lyric Video) - Dead Oceans.mp3" },
    { title: "God Is a Girl", artist: "W&W and Groove Coverage", image: "assets/grid3.jpg", src: "songs/W&W and Groove Coverage - God Is A Girl (Official Video).mp3" },
    { title: "Fool", artist: "Bôa", image: "assets/grid4.jpg", src: "songs/Bôa - Fool (Official Lyric Video).mp3" },
    { title: "Join Me in Death", artist: "HIM", image: "assets/grid5.jpg", src: "songs/HIM - Join Me In Death.mp3" },
    { title: "Monster", artist: "Dev", image: "assets/grid6devmonster.jpg", src: "songs/Dev - Monster - Lyrics [HD].mp3" },
    { title: "Legends Never Die", artist: "Against the Current", image: "assets/grid7.jpg", src: null },
    { title: "GODS", artist: "NewJeans", image: "assets/grid8.jpg", src: null },
];
const playingTiles = document.querySelector(".playing-tiles");
const tileButtons = [];
let currentTrackIndex = 0;
let shuffleEnabled = false;
let repeatMode = "off";

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
}

function updateTrackInfo(index) {
    const track = tracks[index];
    trackArtwork.src = track.image;
    trackArtwork.alt = `Sampul ${track.title}`;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
}

function updateProgressTrack(value) {
    playerProgressTrack.style.setProperty("--progress", `${value}%`);
}

function updateMuteButton() {
    const isMuted = audio.muted || audio.volume === 0;
    muteButton.setAttribute("aria-label", isMuted ? "Nyalakan suara" : "Matikan suara");
    muteButton.title = isMuted ? "Nyalakan suara" : "Matikan suara";
}

function updateRepeatButton() {
    const labels = {
        off: ["Aktifkan pengulangan", "Pengulangan: mati"],
        all: ["Ulangi semua lagu", "Pengulangan: semua"],
        one: ["Ulangi lagu ini", "Pengulangan: satu lagu"],
    };
    repeatButton.dataset.mode = repeatMode;
    repeatButton.setAttribute("aria-pressed", String(repeatMode !== "off"));
    repeatButton.setAttribute("aria-label", labels[repeatMode][0]);
    repeatButton.title = labels[repeatMode][1];
}

updateTrackInfo(currentTrackIndex);
audio.volume = Number(volume.value);
updateMuteButton();

tracks.forEach((track, index) => {
    const tile = document.createElement("button");
    tile.className = "track-tile";
    tile.type = "button";
    tile.setAttribute("aria-label", `Putar ${track.title} oleh ${track.artist}`);

    const image = document.createElement("img");
    image.src = track.image;
    image.alt = "";
    image.loading = "lazy";

    const copy = document.createElement("span");
    copy.className = "track-copy";
    const title = document.createElement("span");
    title.className = "track-title";
    title.textContent = track.title;
    const artist = document.createElement("span");
    artist.className = "track-artist";
    artist.textContent = track.artist;
    copy.append(title, artist);
    tile.append(image, copy);
    tile.addEventListener("click", () => playTrack(index));
    playingTiles.append(tile);
    tileButtons.push(tile);
});

const emptyTileCount = (6 - (tracks.length % 6)) % 6;
for (let index = 0; index < emptyTileCount; index++) {
    const emptyTile = document.createElement("div");
    emptyTile.className = "tile-placeholder";
    emptyTile.setAttribute("aria-hidden", "true");
    playingTiles.append(emptyTile);
}

function playTrack(index) {
    const track = tracks[index];
    if (!track.src) {
        playerStatus.textContent = `File lagu untuk ${track.title} belum tersedia.`;
        return;
    }

    currentTrackIndex = index;
    updateTrackInfo(index);
    tileButtons.forEach((tile, tileIndex) => {
        tile.classList.toggle("is-active", tileIndex === index);
    });
    audio.src = track.src;
    audio.load();
    progress.value = 0;
    currentTimeDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";
    updateProgressTrack(0);
    playerStatus.textContent = "";
    renderNextUp();

    audio.play().catch((error) => {
        if (error.name !== "AbortError") {
            playerStatus.textContent = `Gagal memutar audio: ${error.message}`;
        }
    });
}

function changeTrack(direction, shouldPlay = !audio.paused) {
    const playableTrackIndexes = tracks
        .map((track, index) => track.src ? index : -1)
        .filter(index => index >= 0);
    if (shuffleEnabled && playableTrackIndexes.length > 1) {
        const alternatives = playableTrackIndexes.filter(index => index !== currentTrackIndex);
        currentTrackIndex = alternatives[Math.floor(Math.random() * alternatives.length)];
    } else {
        const currentPosition = playableTrackIndexes.indexOf(currentTrackIndex);
        const nextPosition = (currentPosition + direction + playableTrackIndexes.length) % playableTrackIndexes.length;
        currentTrackIndex = playableTrackIndexes[nextPosition];
    }
    const track = tracks[currentTrackIndex];
    updateTrackInfo(currentTrackIndex);
    audio.src = track.src;
    audio.load();
    progress.value = 0;
    currentTimeDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";
    updateProgressTrack(0);
    playerStatus.textContent = "";
    tileButtons.forEach((tile, tileIndex) => {
        tile.classList.toggle("is-active", tileIndex === currentTrackIndex);
    });
    renderNextUp();

    if (shouldPlay) {
        audio.play().catch((error) => {
            if (error.name !== "AbortError") {
                playerStatus.textContent = `Gagal memutar audio: ${error.message}`;
            }
        });
    }
}

function renderNextUp() {
    const playableTrackIndexes = tracks
        .map((track, index) => track.src ? index : -1)
        .filter(index => index >= 0);
    const currentPosition = playableTrackIndexes.indexOf(currentTrackIndex);
    const upcomingIndexes = playableTrackIndexes
        .slice(currentPosition + 1)
        .concat(playableTrackIndexes.slice(0, currentPosition));
    nextUpList.replaceChildren();

    upcomingIndexes.forEach(index => {
        const track = tracks[index];
        const item = document.createElement("li");
        const button = document.createElement("button");
        button.className = "queue-track";
        button.type = "button";

        const image = document.createElement("img");
        image.src = track.image;
        image.alt = "";
        const copy = document.createElement("span");
        copy.className = "queue-track-copy";
        const title = document.createElement("span");
        title.className = "queue-track-title";
        title.textContent = track.title;
        const artist = document.createElement("span");
        artist.className = "queue-track-artist";
        artist.textContent = track.artist;
        copy.append(artist, title);
        button.append(image, copy);
        button.addEventListener("click", () => {
            nextUpMenu.hidden = true;
            nextUpButton.setAttribute("aria-expanded", "false");
            playTrack(index);
        });
        item.append(button);
        nextUpList.append(item);
    });
}

previousButton.addEventListener("click", () => changeTrack(-1));
nextButton.addEventListener("click", () => changeTrack(1));
audio.addEventListener("ended", () => {
    if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
    }

    const playableTrackIndexes = tracks
        .map((track, index) => track.src ? index : -1)
        .filter(index => index >= 0);
    if (!shuffleEnabled && repeatMode === "off" && currentTrackIndex === playableTrackIndexes.at(-1)) {
        playIcon.textContent = "▶";
        playButton.setAttribute("aria-label", "Putar");
        return;
    }
    changeTrack(1, true);
});

shuffleButton.addEventListener("click", () => {
    shuffleEnabled = !shuffleEnabled;
    shuffleButton.setAttribute("aria-pressed", String(shuffleEnabled));
    shuffleButton.setAttribute("aria-label", shuffleEnabled ? "Matikan acak" : "Aktifkan acak");
});

repeatButton.addEventListener("click", () => {
    repeatMode = repeatMode === "off" ? "all" : repeatMode === "all" ? "one" : "off";
    updateRepeatButton();
});

likeButton.addEventListener("click", () => {
    const liked = likeButton.getAttribute("aria-pressed") !== "true";
    likeButton.classList.toggle("is-active", liked);
    likeButton.setAttribute("aria-pressed", String(liked));
    likeButton.setAttribute("aria-label", liked ? "Unlike" : "Like");
    likeButton.title = liked ? "Unlike" : "Like";
});

followButton.addEventListener("click", () => {
    const followed = followButton.getAttribute("aria-pressed") !== "true";
    followButton.setAttribute("aria-pressed", String(followed));
    followButton.setAttribute("aria-label", followed ? "Following" : "Follow");
    followButton.title = followed ? "Following" : "Follow";
});

nextUpButton.addEventListener("click", event => {
    event.stopPropagation();
    const open = nextUpMenu.hidden;
    nextUpMenu.hidden = !open;
    nextUpButton.setAttribute("aria-expanded", String(open));
});

nextUpMenu.addEventListener("click", event => event.stopPropagation());
document.addEventListener("click", () => {
    nextUpMenu.hidden = true;
    nextUpButton.setAttribute("aria-expanded", "false");
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        nextUpMenu.hidden = true;
        nextUpButton.setAttribute("aria-expanded", "false");
    }
});
updateRepeatButton();
renderNextUp();

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
    playIcon.textContent = "❚❚";
    playButton.setAttribute("aria-label", "Jeda");
});

audio.addEventListener("pause", () => {
    playIcon.textContent = "▶";
    playButton.setAttribute("aria-label", "Putar");
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const value = (audio.currentTime / audio.duration) * 100;
        progress.value = value;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        updateProgressTrack(value);
    }
});

audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
        updateProgressTrack(progress.value);
    }
});

volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    audio.muted = audio.volume === 0;
    updateMuteButton();
});

muteButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    updateMuteButton();
});