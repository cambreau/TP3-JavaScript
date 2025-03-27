import { formatteStringSansAccentEtEspace } from "../fonction-generique.js";

// === Variables ===
let compteur = 0;
let tailleTableau;
let interval;

// === Sélection HTML ===
let imgCarrousel;
let boutonsCarrousel;
let arrayCarrousel;

// === Fonction ===
function init(arrayProduits, parentHTML) {
  //Etape 1: Creer la partie HTML dynamiquement pour les nouveautes.
  //Etape 2: Affectation de tailleTableau.
  //Etape 3: Ajout des ecouteurs d'evenements sur les boutons.
  //Etape 4: Defilement auto des images du carroussel.
  arrayCarrousel = arrayProduits;
  genererCarrouselHTML(arrayCarrousel, parentHTML);
  tailleTableau = arrayProduits.length;
  boutonsCarrousel.forEach(function (bouton) {
    bouton.addEventListener("click", onChangementCaroussel);
  });
  interval = setInterval(defilementAutoCarrousel, 5000);
}

/**
 * Fonction qui genere le carrousel dans le HTML.
 * @param {Array[Object]} arrayProduits
 * @param {ElementHTML} parentHTML
 */
function genererCarrouselHTML(arrayProduits, parentHTML) {
  //Etape 1: Mettre le titre en format src.
  //Etape 2: Faire le template du carrousel.
  //Etape 3: Inserer le HTML.
  //Etape 4: Recuperer l'image du carrousel.
  //Etape 5: Recuperer les boutons suivant et precedent.
  const srcProduit = formatteStringSansAccentEtEspace(arrayProduits[0]);
  const templateCarrousel = `
    <input class="bouton" type="button" value="Précédent" data-direction="-1"/>
    <picture>
    <img src="./assets/img/produits/${srcProduit}.jpg" alt="${arrayProduits[0]}">
    </picture>
    <input class="bouton" type="button" value="Suivant" data-direction="1" />
  `;
  parentHTML.insertAdjacentHTML("beforeend", templateCarrousel);
  imgCarrousel = parentHTML.querySelector("picture img");
  boutonsCarrousel = parentHTML.querySelectorAll(".bouton");
}

/**
 * Fonction qui modifier l'img du produit actif dans le carrousel.
 *   @param {Event} evenement
 */
function onChangementImg() {
  //Etape 1: Mettre l'image du produit actif.
  imgCarrousel.src = `./assets/img/produits/${formatteStringSansAccentEtEspace(
    arrayCarrousel[compteur]
  )}.jpg`;
  imgCarrousel.alt = arrayCarrousel[compteur];
}

/**
 * Fonction qui gere les changements du carrousel.
 * @param {Event} evenement
 *  */
function onChangementCaroussel(evenement) {
  //Étape 1 : mettre à jour la variable compteur.
  const direction = Number(evenement.currentTarget.dataset.direction);
  if (compteur + direction === tailleTableau) {
    compteur = 0;
  } else if (compteur + direction < 0) {
    compteur = tailleTableau - 1;
  } else {
    compteur += direction;
  }
  //Étape 2 : mettre à jour l'image du carrousel.
  onChangementImg();
  //Étape 3 : réinitialiser le défilement automatique.
  clearInterval(interval);
  interval = setInterval(defilementAutoCarrousel, 5000);
}

/**
 * Fonction qui  fait defiler automatiquement le carrousel.
 */
function defilementAutoCarrousel() {
  //Étape 1 : mettre à jour la variable compteur.
  //Étape 2 : mettre à jour l'image
  compteur++;
  onChangementImg();
}

// === Export ===
export default init;
