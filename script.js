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

const backToIntro =
    document.getElementById("backToIntro");

const previousChapter =
    document.getElementById("previousChapter");

const nextChapter =
    document.getElementById("nextChapter");


/* ========================= */
/* CHAPTER DATA */
/* ========================= */
/*
    To add another chapter:

    1. Create a folder:

       Chapter-3

    2. Put the panels inside:

       Panel1.jpeg
       Panel2.jpeg
       Panel3.jpeg
       etc.

    3. Add a new block here.

    Example:

    {
        number: 3,
        name: "Chapter 3 Name",
        panels: 7
    }

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
            GitHub folder structure:

            Chapter-1/Panel1.jpeg
            Chapter-1/Panel2.jpeg

            Chapter-2/Panel1.jpeg
            Chapter-2/Panel2.jpeg
        */

        img.src =
            `Chapter-${chapter.number}/Panel${i}.jpeg`;


        img.classList.add("panel");


        img.alt =
            `Chapter ${chapter.number}, Panel ${i}`;


        /* Check if image exists */

        img.onerror = function(){

            console.error(
                "Could not load:",
                this.src
            );

        };


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
    /* SHOW VISIBLE PANELS */
    /* ========================= */

    setupPanelAnimations();

}


/* ========================= */
/* PANEL SCROLL ANIMATION */
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
/* BACK TO INTRO */
/* ========================= */

backToIntro.onclick = () => {

    /*
        Remove the saved intro status.

        This means the intro will play
        again the next time the user
        clicks the surprise button.
    */

    localStorage.removeItem(
        "introWatched"
    );


    /* Stop and reset video */

    introVideo.pause();

    introVideo.currentTime = 0;


    /* Clear skip timer */

    clearTimeout(skipTimer);


    /* Hide story */

    story.style.display = "none";

    story.classList.remove("fadeIn");


    /* Show intro */

    intro.style.display = "flex";

    intro.classList.remove("fadeOut");


    /* Reset video buttons */

    skipBtn.classList.remove("show");

    continueBtn.classList.remove("show");

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


        /*
            The audio is inside intro.mp4.
            No MP3 is required.
        */

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


        /* Start at Chapter 1 */

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

    /*
        Intro has already been watched,
        so go straight to the story.
    */

    intro.style.display = "none";

    videoSection.style.display = "none";

    story.style.display = "block";


    currentChapter = 0;

    loadChapter();

}
