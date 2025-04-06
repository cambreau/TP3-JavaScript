// Variables

// Sélection HTML
const parentHTML = document.querySelector("[data-mode]");
const boutonsHTML = parentHTML.querySelectorAll("[data-mode-option]");

function init() {
  parentHTML.addEventListener("click", auClicBouton);
  afficherModeNuit();
}

/**
 * Fonction pour identifier l'élément cliqué et demander une modification
 * @param {Event} evenement
 */
function auClicBouton(evenement) {
  //Etape 1: On verifie sur quel bouton on a cliqué.
  const bouton = evenement.target.closest("[data-mode-option]");
  // Etape 2: Si le bouton n'est pas null, donc on a cliqué sur le bouton ou son enfant
  if (bouton) {
    const mode = bouton.dataset.modeOption;
    modifierModeNuit(mode);
  }
}

/**
 * La fonction est responsable de configurer le thème de la page
 * en mode nuit ou en mode jour en fonction de la préférence stockée localement.
 * Si aucune préférence n'est définie, elle applique le mode jour par défaut.
 */
function afficherModeNuit() {
  const optionMode = localStorage.getItem("modeNuit") || "jour";
  document.body.dataset.theme = optionMode;
  changerBoutons();
}

/**
 * La fonction permet de changer le mode actuel (jour ou nuit)
 * Elle sauvegarde la préférence dans le stockage local et applique immédiatement le nouveau mode.
 * @param {string} option
 */
function modifierModeNuit(option) {
  localStorage.setItem("modeNuit", option);
  afficherModeNuit();
}

/**
 * La fonction permet de mettre à jour l'affichage des bouton.
 */
function changerBoutons() {
  boutonsHTML.forEach(function (bouton) {
    const modeChoisi = localStorage.getItem("modeNuit") || "jour";
    const modeBouton = bouton.dataset.modeOption;
    bouton.classList.toggle("invisible", modeChoisi == modeBouton);
  });
}

export default init;
