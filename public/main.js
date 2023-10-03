function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  const burger = document.querySelector(".burger");
  const logoLeft = document.querySelector("#logoLeft");
  const headerNav = document.querySelector("header nav");

  burger.addEventListener("click", (e) => {
    navbar.classList.toggle("show-nav");
    logoLeft.classList.toggle("hide-logoLeft");
    headerNav.classList.toggle("no-border");
  });

  const navbarLinks = document.querySelectorAll(".navbar a");
  navbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navbar.classList.toggle("show-nav");
      logoLeft.classList.toggle("hide-logoLeft");
      headerNav.classList.toggle("no-border");
    });
  });
}
toggleMenu();

const videoIntro = document.querySelector(".videoIntroPortfolio");
const portfolioSection = document.querySelector(".portfolio");

function fadeOutVideoShowContent() {
  console.log("plop")
  videoIntro.style.opacity = "0";
  portfolioSection.style.opacity = "1";
}

videoIntro.addEventListener("ended", fadeOutVideoShowContent);
document.addEventListener("click", fadeOutVideoShowContent);

