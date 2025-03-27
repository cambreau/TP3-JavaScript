import carrousel from "./apropos-Component/carrousel.js";
import boiteModal from "./apropos-Component/boiteModal.js";
import modeNuit from "./apropos-Component/modeNuit.js";
import ScrollAnimator from "./apropos-Component/ScrollAnimator.js";

// === Variables ===
const produitsNouveaute = [
  "Tour équilibre",
  "Bac à sable",
  "Machine à café",
  "Set de couverts",
  "Ourson thérapeutique",
];
const carrouselNouveaute = document.querySelector(".carrousel-nouveautes");
const titreBoiteModale = "Bienvenue sur notre site!";
const messageBoiteModale =
  "20% de rabais lors de la premiere commande! <br> avec le code promo: BIENVENUE20";
new ScrollAnimator(null, document.querySelectorAll(".article-texte"));

// === Sélection HTML ===
const mainHTML = document.querySelector("main");

// === Fonction ===
function init() {
  carrousel(produitsNouveaute, carrouselNouveaute);
  setTimeout(boiteModal, 1000, mainHTML, titreBoiteModale, messageBoiteModale); // SetTimeOut (Fonction, delai, parametre1, parametre2, ...)
  modeNuit();
}

// === Execution du code ===
init();
