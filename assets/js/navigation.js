// === Variables ===
const liensNaviguationHeader = [
  {
    nom: "Accueil",
    href: "index.html",
  },
  { nom: "Nous contacter", href: "contact.html" },
  { nom: "A propos", href: "apropos.html" },
];

// === Sélection HTML ===
const navHeaderHTML = document.querySelector("header nav");
let urlCourante = window.location.pathname.split("/").pop();

// === Fonctions ===
function init() {
  //On s'assure que "" et " " son recoonu comme index.html
  //Appelle de la fonction afficheLiensHTML pour generer dans le HTML les liens.
  if (!urlCourante || urlCourante.trim() === "") {
    urlCourante = "index.html";
  }
  {
    urlCourante = "index.html";
  }
  afficheLiensHTML(liensNaviguationHeader, (IdOuClass = "lien-header"));
}

/**
 * Cette fonction reçoit en paramètre un string Nom du lien, un element HTML parent et un string class et genere l'element HTML.
 * @param {String} lien
 * @param {ElementHTML} elementHTML
 * @param {string} nomClass
 */
function genereLien(lien, elementHTML, nomClass) {
  // Méthode insertAdjacentHTML
  //On valide si urlCourante correspond au lien actuel et si ils sont identiques alors on change le style css.
  const templateLien = `
  <li class="${nomClass}">
  <a href="${lien.href}">${lien.nom}</a>
  </li>`;
  elementHTML.insertAdjacentHTML("beforeend", templateLien);
  if (urlCourante == lien.href) {
    elementHTML.lastElementChild.style.backgroundColor = "grey";
  }
}

/**
 * Cette fonction reçoit en paramètre un element HTML parent et un string id et genere l'element HTML.
 * @param {ElementHTML} ElementParentHTML
 * @param {String} nomID
 */
function genereUlLien(ElementParentHTML, nomID) {
  // Méthode insertAdjacentHTML
  const templateUl = `
 <ul id="${nomID}">
 </ul>`;
  ElementParentHTML.insertAdjacentHTML("beforeend", templateUl);
}

/**
 * Cette fonction reçoit en paramètre un array de string, un element HTML parent et un string class. Pour chaque element de l'array, on fait appelle a la fonction genereLien.
 * @param {ArrayS[string]} arrayLiens
 */
function afficheLiensHTML(arrayLiens, nomClass) {
  //Creation du ul HTML
  genereUlLien(navHeaderHTML, (id = "menu-principal"));
  //Recuperer l'element
  const menuHeaderHTML = document.querySelector("#menu-principal");
  //Faire une copie de l'array initiale pour ne pas le modifier.
  const arrayLiensTrier = [...arrayLiens];
  //Trier la copie par ordre alphabetique
  arrayLiensTrier.sort((a, b) => a.nom.localeCompare(b.nom));
  //Pour chaque elements de l'arrays generer le lien de pied de page
  arrayLiensTrier.forEach(function (lien) {
    return genereLien(lien, menuHeaderHTML, nomClass);
  });
}

// Exécution
init();
