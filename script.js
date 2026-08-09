/* ========================= */
/* GET ELEMENTS */
/* ========================= */

const intro = document.getElementById("intro");
const startBtn = document.getElementById("startBtn");
const videoSection = document.getElementById("videoSection");
const introVideo = document.getElementById("introVideo");
const skipBtn = document.getElementById("skipBtn");
const continueBtn = document.getElementById("continueBtn");
const story = document.getElementById("story");

const panels = document.querySelectorAll(".panel");

let skipTimer;


/* ========================= */
/* CHECK IF INTRO WAS WATCHED */
/* ========================= */

if (localStorage.getItem("introWatched") === "true") {

    /* Skip intro */

    intro.style.display = "none";

    videoSection.style.display = "none";

    story.style.display = "block";

    story.classList.add("fadeIn");

    /* Make first panels visible */

    window.dispatchEvent(new Event("scroll"));

}


/* ========================= */
/* START INTRO */
/* ========================= */

startBtn.onclick = () => {

    intro.classList.add("fadeOut");

    setTimeout(() => {

        intro.style.display = "none";

        videoSection.style.display = "flex";

        introVideo.currentTime = 0;

        introVideo.muted = false;

        introVideo.play();

        /* Show Skip button after 5 seconds */

        skipTimer = setTimeout(() => {

            skipBtn.classList.add("show");

        }, 5000);

    }, 1000);

};


/* ========================= */
/* VIDEO FINISHED */
/* ========================= */

introVideo.onended = () => {

    clearTimeout(skipTimer);

    skipBtn.classList.remove("show");

    /* Remember that intro was watched */

    localStorage.setItem("introWatched", "true");

    /* Show Continue Reading */

    continueBtn.classList.add("show");

};


/* ========================= */
/* SKIP INTRO */
/* ========================= */

skipBtn.onclick = () => {

    clearTimeout(skipTimer);

    introVideo.pause();

    skipBtn.classList.remove("show");

    /* Remember that intro was skipped */

    localStorage.setItem("introWatched", "true");

    videoSection.classList.add("fadeOut");

    setTimeout(() => {

        videoSection.style.display = "none";

        story.style.display = "block";

        story.classList.add("fadeIn");

        window.dispatchEvent(new Event("scroll"));

    }, 1000);

};


/* ========================= */
/* CONTINUE READING */
/* ========================= */

continueBtn.onclick = () => {

    introVideo.pause();

    /* Remember that intro was watched */

    localStorage.setItem("introWatched", "true");

    videoSection.classList.add("fadeOut");

    setTimeout(() => {

        videoSection.style.display = "none";

        story.style.display = "block";

        story.classList.add("fadeIn");

        window.dispatchEvent(new Event("scroll"));

    }, 1000);

};


/* ========================= */
/* PANEL SCROLL ANIMATION */
/* ========================= */

window.addEventListener("scroll", () => {

    panels.forEach(panel => {

        const top = panel.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            panel.classList.add("show");

        }

    });

});