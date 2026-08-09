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

const panelsContainer =
    document.getElementById("panels");

const chapterNumber =
    document.getElementById("chapterNumber");

const chapterName =
    document.getElementById("chapterName");

const previousChapter =
    document.getElementById("previousChapter");

const nextChapter =
    document.getElementById("nextChapter");


/* ========================= */
/* CHAPTER DATA */
/* ========================= */

const chapters = [

    {
        number: 1,
        name: "The Beginning",
        panels: 5
    },

    {
        number: 2,
        name: "A New Day",
        panels: 7
    },

    {
        number: 3,
        name: "The Conflict",
        panels: 6
    },

    {
        number: 4,
        name: "Revelations",
        panels: 8
    }

];


/* ========================= */
/* CURRENT CHAPTER */
/* ========================= */

let currentChapter = 0;


/* ========================= */
/* SKIP TIMER */
/* ========================= */

let skipTimer;


/* ========================= */
/* LOAD CHAPTER */
/* ========================= */

function loadChapter(){

    const chapter =
        chapters[currentChapter];


    /* Update chapter title */

    chapterNumber.textContent =
        "Chapter " + chapter.number;

    chapterName.textContent =
        chapter.name;


    /* Remove old panels */

    panelsContainer.innerHTML = "";


    /* Create chapter panels */

    for(
        let i = 1;
        i <= chapter.panels;
        i++
    ){

        const img =
            document.createElement("img");


        img.src =
            `Chapter${chapter.number}/panel${i}.jpg`;


        img.classList.add("panel");


        panelsContainer.appendChild(img);

    }


    /* ========================= */
    /* PREVIOUS BUTTON */
    /* ========================= */

    if(currentChapter === 0){

        previousChapter.disabled = true;

    }else{

        previousChapter.disabled = false;

    }


    /* ========================= */
    /* NEXT BUTTON */
    /* ========================= */

    if(
        currentChapter ===
        chapters.length - 1
    ){

        nextChapter.textContent =
            "End of Story";

        nextChapter.disabled = true;

    }else{

        nextChapter.textContent =
            "Next Chapter →";

        nextChapter.disabled = false;

    }


    /* Scroll to top */

    window.scrollTo({
        top:0,
        behavior:"instant"
    });


    /* Activate panel animation */

    setupPanelAnimations();

}


/* ========================= */
/* PANEL ANIMATIONS */
/* ========================= */

function setupPanelAnimations(){

    const panels =
        document.querySelectorAll(".panel");


    function checkPanels(){

        panels.forEach(panel => {

            const top =
                panel.getBoundingClientRect().top;


            if(
                top <
                window.innerHeight - 100
            ){

                panel.classList.add("show");

            }

        });

    }


    checkPanels();

}


/* ========================= */
/* SCROLL LISTENER */
/* ========================= */

window.addEventListener(
    "scroll",
    setupPanelAnimations
);


/* ========================= */
/* NEXT CHAPTER */
/* ========================= */

nextChapter.onclick = () => {

    if(
        currentChapter <
        chapters.length - 1
    ){

        currentChapter++;

        loadChapter();

    }

};


/* ========================= */
/* PREVIOUS CHAPTER */
/* ========================= */

previousChapter.onclick = () => {

    if(currentChapter > 0){

        currentChapter--;

        loadChapter();

    }

};


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


        /* Make sure video audio is enabled */

        introVideo.muted = false;


        /* Play video */

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


    /* Remember intro was watched */

    localStorage.setItem(
        "introWatched",
        "true"
    );


    /* Show Continue Reading */

    continueBtn.classList.add("show");

};


/* ========================= */
/* ENTER STORY */
/* ========================= */

function enterStory(){

    clearTimeout(skipTimer);


    introVideo.pause();


    skipBtn.classList.remove("show");


    continueBtn.classList.remove("show");


    videoSection.classList.add("fadeOut");


    setTimeout(() => {

        videoSection.style.display = "none";

        story.style.display = "block";

        story.classList.add("fadeIn");


        /* Load Chapter 1 */

        currentChapter = 0;

        loadChapter();

    },1000);

}


/* ========================= */
/* SKIP INTRO */
/* ========================= */

skipBtn.onclick = () => {

    /* Remember intro was skipped */

    localStorage.setItem(
        "introWatched",
        "true"
    );


    enterStory();

};


/* ========================= */
/* CONTINUE READING */
/* ========================= */

continueBtn.onclick = () => {

    /* Remember intro was watched */

    localStorage.setItem(
        "introWatched",
        "true"
    );


    enterStory();

};


/* ========================= */
/* CHECK INTRO ON PAGE LOAD */
/* ========================= */

if(
    localStorage.getItem("introWatched")
    === "true"
){

    /* Skip intro */

    intro.style.display = "none";

    videoSection.style.display = "none";

    story.style.display = "block";


    /* Load first chapter */

    loadChapter();

}