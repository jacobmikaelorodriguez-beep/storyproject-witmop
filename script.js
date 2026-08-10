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
/*
   Put your chapters here.

   "number" = folder number
   "name"   = chapter title
   "panels" = number of panels
*/

const chapters = [
    {
        number: 1,
        name: "A well-known tech",
        panels: 9
    },

    {
        number: 2,
        name: "Kenji's Life",
        panels: 3
    },
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


    /* ========================= */
    /* UPDATE CHAPTER TITLE */
    /* ========================= */

    chapterNumber.textContent =
        "Chapter " + chapter.number;

    chapterName.textContent =
        chapter.name;


    /* ========================= */
    /* REMOVE OLD PANELS */
    /* ========================= */

    panelsContainer.innerHTML = "";


    /* ========================= */
    /* LOAD PANELS */
    /* ========================= */

    for(
        let i = 1;
        i <= chapter.panels;
        i++
    ){

        const img =
            document.createElement("img");


        /*
           IMPORTANT:

           This matches your GitHub folders:

           Chapter-1/
               Panel1.jpeg
               Panel2.jpeg
               ...

           Chapter-2/
               Panel1.jpeg
               Panel2.jpeg
               ...
        */

        img.src = `Chapter-${chapter.number}/Panel${i}.jpeg`;


        img.classList.add("panel");


        img.alt = `Chapter ${chapter.number}, Panel ${i}`;


        panelsContainer.appendChild(img);

    }


    /* ========================= */
    /* PREVIOUS CHAPTER BUTTON */
    /* ========================= */

    if(currentChapter === 0){

        previousChapter.disabled = true;

    }else{

        previousChapter.disabled = false;

    }


    /* ========================= */
    /* NEXT CHAPTER BUTTON */
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


    /* ========================= */
    /* SCROLL TO TOP */
    /* ========================= */

    window.scrollTo({
        top:0,
        behavior:"instant"
    });


    /* ========================= */
    /* CHECK PANELS */
    /* ========================= */

    setupPanelAnimations();

}


/* ========================= */
/* PANEL ANIMATIONS */
/* ========================= */

function setupPanelAnimations(){

    const panels =
        document.querySelectorAll(".panel");


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


        /* Enable video audio */

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


    /* Remember intro */

    localStorage.setItem(
        "introWatched",
        "true"
    );


    /* Show Continue */

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


        /* Always start at Chapter 1 */

        currentChapter = 0;

        loadChapter();

    },1000);

}


/* ========================= */
/* SKIP INTRO */
/* ========================= */

skipBtn.onclick = () => {

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

    intro.style.display = "none";

    videoSection.style.display = "none";

    story.style.display = "block";


    /* Start at Chapter 1 */

    currentChapter = 0;

    loadChapter();

}
