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


/*******************************************/
/*Masquage redirection survorl logo footer */
/*******************************************/

function redirectToLogin() {
  window.location.href = "/login";
}

