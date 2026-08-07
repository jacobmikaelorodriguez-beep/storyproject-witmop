const intro = document.getElementById("intro");

const startBtn = document.getElementById("startBtn");

const videoSection = document.getElementById("videoSection");

const introVideo = document.getElementById("introVideo");

const continueBtn = document.getElementById("continueBtn");

const story = document.getElementById("story");

const panels = document.querySelectorAll(".panel");

// Start Intro

startBtn.onclick = () => {
  
  intro.classList.add("fadeOut");
  
  setTimeout(() => {
    
    intro.style.display = "none";
    
    videoSection.style.display = "flex";
    
    introVideo.play();
    
  }, 1000);
  
};

// When video ends

introVideo.onended = () => {
  
  continueBtn.classList.add("show");
  
};

// Continue Reading

continueBtn.onclick = () => {
  
  videoSection.classList.add("fadeOut");
  
  setTimeout(() => {
    
    videoSection.style.display = "none";
    
    story.style.display = "block";
    
    story.classList.add("fadeIn");
    
    window.dispatchEvent(new Event("scroll"));
    
  }, 1000);
  
};

// Fade panels while scrolling

window.addEventListener("scroll", () => {
  
  panels.forEach(panel => {
    
    const top = panel.getBoundingClientRect().top;
    
    if (top < window.innerHeight - 100) {
      
      panel.classList.add("show");
      
    }
    
  });
  
});
