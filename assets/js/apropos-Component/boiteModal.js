// === Variables ===

// === Sélection HTML ===

// === Fonction ===
function init(parentHTML, titre, message) {
  //Etape 1: Creer la partie HTML dynamiquement pour les nouveautes.
  genererBoiteHTML(parentHTML, titre, message);
}

/**
 * Fonction qui genere la boite modale dans le HTML.
 * @param {ElementHTML} parentHTML
 * @param {String} titre
 * @param {String} message
 */
function genererBoiteHTML(parentHTML, titre, message) {
  //Etape 1: Faire le template de la boite modale.
  //Etape 2: Inserer le HTML.
  //Etape 3: Recuperer le bouton de fermeture.
  const templateBoiteModal = `
    <div id="boite-modale">
        <h3>${titre}</h3>
        <p>${message}</p>
        <div class="bouton">Fermer</div>
    </div>
    `;
  parentHTML.insertAdjacentHTML("beforeend", templateBoiteModal);
  const boutonHTML = parentHTML.querySelector("#boite-modale .bouton");
  boutonHTML.addEventListener("click", fermerBoiteModal);
}

/**
 * Fonction qui ferme la boite modale.
 */
function fermerBoiteModal() {
  //Etape 1: Recuperer l'element HTML de la boite modale.
  //Etape 2: Ajouter la classe de disparition progressive.
  //Etape 3: Supprimer la boite modale apres l'animation.
  const boiteModal = document.querySelector("#boite-modale");
  boiteModal.classList.add("disparitionProgressive");
  boiteModal.addEventListener("animationend", function () {
    boiteModal.remove();
  });
}

// === Export ===
export default init;
