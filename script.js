// SPLASH SCREEN LOGIC
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  setTimeout(() => {
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
    }, 500);
  }, 1500);

  // Show popup after 3 seconds
  setTimeout(() => {
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector(".popup-content");
    const heading = document.querySelector(".popup-heading");
    const text = document.querySelector(".popup-text");
    const button = popupContent.querySelector("button");

    // Update Content
    heading.textContent = "📢 Stay Tuned!";
    text.textContent = "This page will be updated soon with new features!";

    // Random Animation on Popup Box
    const animations = ["animate-scale", "animate-slide-top", "animate-slide-bottom"];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    popupContent.classList.remove("animate-scale", "animate-slide-top", "animate-slide-bottom");
    popupContent.classList.add(randomAnimation);

    // Remove old animations on parts
    heading.classList.remove("heading-animate");
    text.classList.remove("text-animate");
    button.classList.remove("button-animate");

    // Add animations to each part
    heading.classList.add("heading-animate");
    text.classList.add("text-animate");
    button.classList.add("button-animate");

    popup.classList.add("show");

    // Auto-close after 4 seconds
    setTimeout(closePopup, 4000);
  }, 3000);
});

// POPUP CLOSE FUNCTION
function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
}

// CLOSE ON OUTSIDE CLICK
window.addEventListener("click", (event) => {
  const popup = document.getElementById("popup");
  const popupContent = document.querySelector(".popup-content");
  if (popup.classList.contains("show") && !popupContent.contains(event.target)) {
    closePopup();
  }
});




// COUNTDOWN TIMER
function startCountdown() {
  const weddingDate = new Date("2025-05-25T11:00:00").getTime();

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "<h3>We are Married!</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format numbers to always have 2 digits
    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
  }, 1000);
}
startCountdown();
