// Variables

// Sélection HTML
const parentHTML = document.querySelector("[data-mode]");
const boutonsHTML = parentHTML.querySelectorAll("[data-mode-option]");

function init() {
  parentHTML.addEventListener("click", auClicBouton);
  afficherModeNuit();
}

function auClicBouton(evenement) {
  //Etape 1: On verifie sur quel bouton on a cliqué.
  const bouton = evenement.target.closest("[data-mode-option]");
  // Etape 2: Si le bouton n'est pas null, donc on a cliqué sur le bouton ou son enfant
  if (bouton) {
    const mode = bouton.dataset.modeOption;
    modifierModeNuit(mode);
  }
}

function afficherModeNuit() {
  const optionMode = localStorage.getItem("modeNuit") || "jour";
  document.body.dataset.theme = optionMode;
  changerBoutons();
}

function modifierModeNuit(option) {
  localStorage.setItem("modeNuit", option);
  afficherModeNuit();
}

function changerBoutons() {
  boutonsHTML.forEach(function (bouton) {
    const modeChoisi = localStorage.getItem("modeNuit") || "jour";
    const modeBouton = bouton.dataset.modeOption;
    bouton.classList.toggle("invisible", modeChoisi == modeBouton);
  });
}

export default init;
