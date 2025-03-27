//--- Déclaration des variables globales ---//
//Étape du formulaire
let etapeFormulaire = 1;

//--- Sélection HTML ---//
const formulaireContact = document.querySelector("#form-contact");
const elementsFormHTML = formulaireContact.querySelectorAll(
  "input[name],select[name],textarea[name]"
);
const formSectionsHTML = formulaireContact.querySelectorAll("section");
const boutonPrecedent = formulaireContact.querySelector(
  "input[data-direction='-1']"
);
const boutonSuivant = formulaireContact.querySelector(
  "input[data-direction='1']"
);
const boutonEnvoyer = formulaireContact.querySelector("input[type='submit']");
const progressionHTML = formulaireContact.querySelector(
  ".barre-progression-remplissage"
);

//--- Fonctions ---//

//----- Fonction d'initialisation -----//
function init() {
  //Étape 1 : Mettre display : "block" sur la section-1 du formulaire.
  mettreDisplayBlock();
  //Étape 2 : On écoute les changements sur les boutons.
  boutonSuivant.addEventListener("click", onValideSection);
  boutonPrecedent.addEventListener("click", onChangementSection);
  formulaireContact.addEventListener("submit", bloqueFormulaire);
  //Étape 3 : On écoute les changements sur les éléments du formulaire.
  elementsFormHTML.forEach(function (elementHTML) {
    elementHTML.addEventListener("change", onChangementElement);
  });
  //Étape 4 : On valide le formulaire. Si la validation est réussie, on le soumet.
  if (formulaireContact.checkValidity()) {
    formulaireContact.submit();
  }
}

//----- Autres fonction -----//

/**
 * Fonction qui bloque la soumission du formulaire.
 * @param {event} evenement
 */
function bloqueFormulaire(evenement) {
  evenement.preventDefault();
}

// ---------- GESTION DES CHANGEMENTS ELEMENTS FORMULAIRE ---------- //

/**
 * La fonction met à jour la section-3 (résumé) du formulaire.
 * @param {HTMLElement} elementHTML
 */
function modifierResume(elementHTML) {
  //Étape 1 : On récupère le nom et la valeur de l'élément.
  //Étape 2 : On gère la case à cocher.
  //Étape 3 : On met à jour le résumé.
  const elementName = elementHTML.name;
  let elementValue = elementHTML.value;
  if (elementHTML.type === "checkbox") {
    elementValue = elementHTML.checked ? "Oui" : "Non";
  }
  const champResume = formulaireContact.querySelector(
    `[data-champ="${elementName}"]`
  );
  champResume.textContent = elementValue;
}

/**
 * La fonction gère l'affichage de la classe "affichage-erreur".
 * @param {elementHTML} elementHTML
 * @param {boolean} etatErreur
 */
function affichageClassErreur(elementHTML, etatErreur) {
  //Étape 1 : On récupère l'élément HTML parent du message d'erreur à afficher.
  //Étape 2 : On valide si elementMessageErreur contient la classe "affichage-erreur".
  //Si erreur (etatErreur = false) : si elementMessageErreur ne contient pas déjà la class, on vient l'ajouter.
  //Si aucune erreur : si elementMessageErreur contient la class, alors on vient la retirer.
  const elementMessageErreur = document.querySelector(
    `#${elementHTML.name}-conteneur .erreur`
  );
  const estActiveClassErreur =
    elementMessageErreur.classList.contains("affichage-erreur");
  if (!etatErreur) {
    if (!estActiveClassErreur) {
      elementMessageErreur.classList.add("affichage-erreur");
    }
  } else {
    if (estActiveClassErreur) {
      elementMessageErreur.classList.remove("affichage-erreur");
    }
  }
}

/**
 * La fonction valide les règles d'un élément du formulaire, puis appelle la fonction affichageClassErreur() pour afficher la class.
 * @param {elementHTML} elementHTML
 * @returns {boolean} //Si erreur = false, validation non complète // Aucune erreur = true, validation complète.
 */
function validationElementFormulaire(elementHTML) {
  //Étape 1 : On valide si elementHTML respecte les règles du formulaire.
  //Étape 2 : On appelle la fonction affichageClassErreur sur l'élément parent du message d'erreur.
  let validationErreur;
  if (elementHTML.name === "confirmation-email") {
    const emailOriginale = document.querySelector("input[name=email]");
    validationErreur =
      elementHTML.value === emailOriginale.value ? true : false;
  } else {
    validationErreur = elementHTML.checkValidity();
  }

  affichageClassErreur(elementHTML, validationErreur);
  return validationErreur;
}

/**
 * Fonction qui gere les appelles des fonctions lors d'un changement des elements du formulaire.
 * @param {evenement} evenement
 */
function onChangementElement(evenement) {
  //Etape 1: On recupere l'element declencheur de l'evenement.
  //Etape 2: On appelle la fonction validationElementFormulaire, sauf pour les inputs de type checkbox.
  //Si validationElementFormulaire = true, on met a jour la section-3 (resume), sauf pour la confirmation d'email : fonction modifierResume().
  const declencheur = evenement.currentTarget;
  const validation =
    declencheur.type === "checkbox"
      ? true
      : validationElementFormulaire(declencheur);
  if (validation) {
    if (declencheur.name !== "confirmation-email") {
      modifierResume(declencheur);
    }
  }
}

//---------- GESTION DES CHANGEMENTS DE SECTION ---------- //

/**
 * La fonction valide les éléments de la section courante avant de changer de section.
 * @param {Event} evenement
 * @returns
 */
function onValideSection(evenement) {
  //Étape 1 : On déclare une variable qui va compter le nombre d'erreurs dans la section du formulaire.
  //Étape 2 : On récupère les éléments du formulaire de la section courante.
  //Étape 3 : On fait une validation de chaque élément.
  //Étape 4 : S'il n'y a aucune erreur, on lance l'étape de changement de section.
  let nbrErreur = 0;
  const elementFormSection = document.querySelectorAll(
    `#section-${etapeFormulaire} [name]`
  );
  elementFormSection.forEach(function (elementHTML) {
    if (!elementHTML.checkValidity()) {
      affichageClassErreur(elementHTML, (validationErreur = false));
      nbrErreur += 1;
    }
  });
  if (nbrErreur === 0) {
    onChangementSection(evenement);
  }
}

/**
 * Fonction qui met display : "none" à toutes les sections du formulaire.
 */
function mettreDisplayNone() {
  formSectionsHTML.forEach(function (section) {
    section.style.display = "none";
  });
}

/**
 * Fonction qui met display : "block" à la section du formulaire que l'on souhaite afficher.
 */
function mettreDisplayBlock() {
  const sectionHTMLChoisi = document.querySelector(
    `#section-${etapeFormulaire}`
  );
  sectionHTMLChoisi.style.display = "block";
}

/**
 * Fonction qui procède au changement de section dans le formulaire.
 */
function onChangementSection(evenement) {
  //Étape 1 : mettre display : "none" à toutes les sections du formulaire.
  //Étape 2 : récupérer le déclencheur de l'événement.
  //Étape 3 : mettre à jour la variable etapeFormulaire.
  //Étape 4 : mettre display : "block" sur la section choisie.
  //Étape 5 : appelle des fonctions gestionAffichageBouton() et gestionAffichageProgression().
  mettreDisplayNone();
  const declencheur = evenement.currentTarget;
  const direction = Number(declencheur.dataset.direction);
  etapeFormulaire += direction;
  mettreDisplayBlock();
  gestionAffichageBouton();
  gestionAffichageProgression();
}

/**
 * Fonction qui gère l'affichage des boutons du formulaire.
 */
function gestionAffichageBouton() {
  if (etapeFormulaire === 1) {
    boutonPrecedent.setAttribute("disabled", "true");
  } else if (etapeFormulaire === 2) {
    boutonPrecedent.removeAttribute("disabled");
    boutonSuivant.removeAttribute("disabled");
    boutonEnvoyer.setAttribute("disabled", "true");
  } else if (etapeFormulaire === 3) {
    boutonSuivant.setAttribute("disabled", "true");
    boutonEnvoyer.removeAttribute("disabled");
  }
}

/**
 * Fonction qui gère l'affichage de la barre de progression.
 */
function gestionAffichageProgression() {
  if (etapeFormulaire === 1) {
    progressionHTML.style.width = "10%";
  } else if (etapeFormulaire === 2) {
    progressionHTML.style.width = "50%";
  } else if (etapeFormulaire === 3) {
    progressionHTML.style.width = "100%";
  }
}

//--- Execution du code ---//
init();
