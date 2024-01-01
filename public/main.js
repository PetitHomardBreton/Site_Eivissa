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

/*************************************************/
/*   Animation sur les thèmes /page Portfolio    */
/*************************************************/


// Vérifiez si l'URL actuelle est '/portfolio'
if (window.location.pathname === '/portfolio') {
  // Sélectionnez tous les éléments de liste
  const themeItems = document.querySelectorAll('.portfolioMenu li');
  // Sélectionnez la div avec la class 'portfolioShowreels'
  const showreelsDiv = document.querySelector('.portfolioShowreels');

  // Vérifiez si themeItems contient au moins un élément
  if (themeItems && themeItems.length > 0) {
      // Définissez les styles pour l'élément actif (premier élément)
      themeItems[0].style.backgroundColor = '#d59c3c';
      themeItems[0].style.color = '#050819';

      // Ajoutez un gestionnaire d'événements clic à chaque élément
      themeItems.forEach((themeItem, index) => {
          themeItem.addEventListener('click', () => {
              // Réinitialisez les styles de tous les éléments de liste
              themeItems.forEach((item, itemIndex) => {
                  item.style.backgroundColor = '';
                  item.style.color = 'var(--Dore, #d59c3c)';
              });

              // Définissez les styles pour l'élément cliqué
              themeItem.style.backgroundColor = '#d59c3c';
              themeItem.style.color = '#050819';

              // Récupérez le nom du thème de l'élément cliqué
              const themeName = themeItem.textContent.trim();

              // Condition pour gérer l'affichage de la div 'portfolioShowreels'
              if (themeName !== 'Showreel' && themeName !== 'Tous les projets') {
                  // Si le thème cliqué n'est ni 'Showreel' ni 'Tous les projets', cachez la div
                  showreelsDiv.style.display = 'none';
              } else {
                  // Sinon, affichez la div
                  showreelsDiv.style.display = 'block';
              }
          });
      });
  }
}


/***************************************************/
/*Animation fleche remontée vers le haut de la page*/
/***************************************************/

window.addEventListener('scroll', function() {
  var scrollTopBtn = document.getElementById('scrollTop');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollTopBtn.style.display = "block";
  } else {
      scrollTopBtn.style.display = "none";
  }
});

document.getElementById('scrollTop').addEventListener('click', function(event){
  event.preventDefault();
  window.scrollTo({top: 0, behavior: 'smooth'});
});


/*************************************************/
/*        slider page réalisations               */
/*************************************************/

document.querySelector('.caroussel__arrow--left').addEventListener('click', prevSlide);
document.querySelector('.caroussel__arrow--right').addEventListener('click', nextSlide);

const track = document.querySelector('.caroussel');
const items = document.querySelectorAll('.caroussel__item');
let currentIndex = 0;
const firstItem = document.querySelector('.caroussel__item');
let itemWidth = firstItem.getBoundingClientRect().width;

// Fonction pour aller à un slide spécifique

function goToSlide(index) {
    const totalWidth = itemWidth * index;
    track.style.transform = `translateX(-${totalWidth}px)`;
    currentIndex = index;
}

window.addEventListener('resize', () => {
    // Mettez à jour la largeur de l'élément du carrousel
    itemWidth = document.querySelector('.caroussel__item').getBoundingClientRect().width;

    // Recalculez la position du carrousel
    const totalWidth = itemWidth * currentIndex;
    track.style.transform = `translateX(-${totalWidth}px)`;
});

// Fonction pour aller au slide suivant
function nextSlide(event) {
    if (currentIndex < items.length - 3) {
       event.stopPropagation(); // Arrête la propagation de l'événement
        goToSlide(currentIndex + 1);
    } else {
       event.stopPropagation();// Arrête la propagation de l'événement
        goToSlide(0); // Retour au début si nous sommes à la fin
    }
}

// Fonction pour aller au slide précédent
function prevSlide(event) {
    if (currentIndex > 0) {
        event.stopPropagation(); // Arrête la propagation de l'événement
        goToSlide(currentIndex - 1);
    } else {
        event.stopPropagation(); // Arrête la propagation de l'événement
        goToSlide(items.length - 1); // Aller à la fin si nous sommes au début
    }
}


/*******************************************/
/*Masquage redirection survorl logo footer */
/*******************************************/

function redirectToLogin() {
  window.location.href = "/login";
}

