/* ========================= */
/* GET ELEMENTS */
/* ========================= */

const intro =
    document.getElementById("intro");

const startBtn =
    document.getElementById("startBtn");

const videoSection =
    document.getElementById("videoSection");

const introVideo =
    document.getElementById("introVideo");

const skipBtn =
    document.getElementById("skipBtn");

const continueBtn =
    document.getElementById("continueBtn");

const story =
    document.getElementById("story");

const panels =
    document.querySelectorAll(".panel");


let skipTimer;


/* ========================= */
/* START INTRO */
/* ========================= */

startBtn.onclick = () => {

    intro.classList.add("fadeOut");


    setTimeout(() => {

        intro.style.display = "none";

        videoSection.style.display = "flex";


        /* Reset video */

        introVideo.currentTime = 0;


        /* Start video with its built-in audio */

        introVideo.muted = false;

        introVideo.play();


        /* ========================= */
        /* SHOW SKIP AFTER 5 SECONDS */
        /* ========================= */

        skipTimer = setTimeout(() => {

            skipBtn.classList.add("show");

        },5000);


    },1000);

};


/* ========================= */
/* VIDEO FINISHED */
/* ========================= */

introVideo.onended = () => {

    clearTimeout(skipTimer);

    skipBtn.classList.remove("show");

    continueBtn.classList.add("show");

};


/* ========================= */
/* SKIP INTRO */
/* ========================= */

skipBtn.onclick = () => {

    clearTimeout(skipTimer);

    introVideo.pause();

    skipBtn.classList.remove("show");

    videoSection.classList.add("fadeOut");


    setTimeout(() => {

        videoSection.style.display = "none";

        story.style.display = "block";

        story.classList.add("fadeIn");

        window.dispatchEvent(
            new Event("scroll")
        );

    },1000);

};


/* ========================= */
/* CONTINUE READING */
/* ========================= */

continueBtn.onclick = () => {

    introVideo.pause();

    videoSection.classList.add("fadeOut");


    setTimeout(() => {

        videoSection.style.display = "none";

        story.style.display = "block";

        story.classList.add("fadeIn");

        window.dispatchEvent(
            new Event("scroll")
        );

    },1000);

};


/* ========================= */
/* PANEL SCROLL ANIMATION */
/* ========================= */

window.addEventListener("scroll", () => {

    panels.forEach(panel => {

        const top =
            panel.getBoundingClientRect().top;


        if(top < window.innerHeight - 100){

            panel.classList.add("show");

        }

    });

});