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

/* Autre possibilité de slider :
// slider gauche à droite puis droite à gauche :

const track = document.querySelector('.caroussel');
const items = document.querySelectorAll('.caroussel__item');
let currentIndex = 0;
let movingForward = true; // Nouvelle variable pour suivre la direction


function goToSlide(index) {
    if (index < 0) {
        index = 0;
        movingForward = true; // Change la direction si vous atteignez le début
    }
    else if (index >= items.length) {
        index = items.length - 1;
        movingForward = false; // Change la direction si vous atteignez la fin
    }
    track.style.transform = `translateX(-${index * (100 / items.length )}%)`;
    currentIndex = index;
}

function nextSlide() {
    if (movingForward) {
        goToSlide(currentIndex + 2);
    } else {
        goToSlide(currentIndex - 2);
    }
}

function prevSlide() {
  if (currentIndex <= 0) {
      currentIndex = items.length - 1; // Retour à la fin si nous sommes au début
  } else {
      currentIndex--;
  }
  goToSlide(currentIndex);
}

setInterval(nextSlide, 2000); */

const track = document.querySelector('.caroussel');
const items = document.querySelectorAll('.caroussel__item');
let currentIndex = 0;

// Fonction pour aller à un slide spécifique
function goToSlide(index) {
    // Bouclage du carrousel
    if (index < 0) {
        index = items.length - 1; // Boucle au dernier élément si l'index est inférieur à 0
    } else if (index >= items.length) {
        index = 0; // Boucle au premier élément si l'index dépasse le dernier élément
    }

    track.style.transform = `translateX(-${index * (100 / items.length)}%)`;
    currentIndex = index;
}

// Fonction pour aller au slide suivant
function nextSlide() {
    goToSlide(currentIndex + 2); // Avance de deux éléments
}

// Fonction pour aller au slide précédent
function prevSlide() {
    goToSlide(currentIndex - 2); // Recule de deux éléments
}

// Initialisation du défilement automatique
setInterval(nextSlide, 2000);



/*******************************************/
/*Masquage redirection survorl logo footer */
/*******************************************/

function redirectToLogin() {
  window.location.href = "/login";
}

