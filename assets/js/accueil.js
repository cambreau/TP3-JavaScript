//--- Declaration des variables globales ---//
//On déclare une variable booléenne, qui indique si un produit a été sélectionné ou non.
let produitSelection = false;
//On déclare le tableau contenant les objets produits.
const produits = [
  {
    titre: "Tour équilibre",
    age: "9 mois",
    etat: "Bon état",
    prix: 40,
  },
  {
    titre: "Jeu dentaire",
    age: "3 mois",
    etat: "Bon état",
    prix: 10,
  },
  {
    titre: "Bac à sable",
    age: "1 an",
    etat: "Bon état",
    prix: 50,
  },
  {
    titre: "Lot de 3 bavoirs",
    age: "Naissance",
    etat: "Bon état",
    prix: 10,
  },
  {
    titre: "Machine à café",
    age: "1 an",
    etat: "Bon état",
    prix: 20,
  },
  {
    titre: "Livre Au lit",
    age: "6 mois",
    etat: "Bon état",
    prix: 10,
  },
  {
    titre: "Livre musical",
    age: "6 mois",
    etat: "Bon état",
    prix: 10,
  },
  {
    titre: "Set de couverts",
    age: "6 mois",
    etat: "Bon état",
    prix: 20,
  },
  {
    titre: "Ourson thérapeutique",
    age: "3 mois",
    etat: "Bon état",
    prix: 30,
  },
];
//On déclare le tableau contenant le nom des filtres
const nomFiltres = [
  "Par ordre alphabetique",
  "Par prix croissant",
  "Par prix decroissant",
];

//--- Selection HTML ---//
const asideHTML = document.querySelector("aside");
const mainHTML = document.querySelector("main");
let produitsHTML; // On viendra assigner la valeur lorsque le HTML aura été généré.

//--- Fonctions ---//
//----- Fonction d'initialisation -----//
function init() {
  //--- Etape 1 ---: ASIDE
  //On affiche le aside HTML.
  afficheAside(produitSelection);

  //--- Etape 2 ---: MAIN
  //On affiche les liste des produits dans le main HTML.
  afficheMain(produits, mainHTML);

  //--- Etape 3 ---: FILTRES
  //On creer les boutons filtres
  //On recupere l'element html des boutons
  //On ecoute les evenements sur les boutons.
  genereBoutonFiltre(nomFiltres, mainHTML);
  const boutonsFiltre = document.querySelectorAll("#conteneur-bouton div");
  boutonsFiltre.forEach(function (boutonHTML) {
    boutonHTML.addEventListener("click", filtreLesProduits);
  });
}

//----- Autres fonction -----//
/**
 * Fonction qui prend en parametre un string et le transforme en format utilisable pour id et src.
 * @param {string} nomString
 * @returns {string}
 */
function formatteStringSansAccentEtEspace(nomString) {
  //Faire une copie du string dans une nouvelle constante.
  let nom = nomString;
  //Supprimer les espaces de tabulation
  nom = nom.trim();
  //Supprimer les accents
  nom = nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  //Mettre en minuscule
  nom = nom.toLowerCase();
  //Remplacer les espaces
  nom = nom.replaceAll(" ", "-");
  return nom;
}

/**
 * Permet de supprimer les bordures des éléments HTML d'un array.
 * @param {arrayElementsHTML} arrayElementHTML
 */
function supprimeBordures(arrayElementHTML) {
  arrayElementHTML.forEach(function (elementHTML) {
    elementHTML.style.border = "solid 1px  #dcbda8";
  });
}

/**
 * A partir d'un Objet et d'un nom d"ID, on creer la structure HTML d'un produit.
 * @param {Object} produit
 * @param {string} NomID Nom de l'ID pour l'assignation
 */
function creerProduitHTML(produit, elementHTML) {
  const produitFormatIdSrc = formatteStringSansAccentEtEspace(produit.titre);
  const templateProduit = `
  <article id="${produitFormatIdSrc}">
    <div class="image-produit">
      <img src="./assets/img/produits/${produitFormatIdSrc}.jpg" alt="${produit.titre}">
    </div>
    <h3>${produit.titre}</h3>
    <div class="description-produit">
      <p>${produit.age}</p>
      <p>${produit.etat}</p>
      <p>${produit.prix}$</p>
    </div>
    <div class="bouton">
      <a href="#">
        <img src="./assets/img/icon/ajout-panier-logo.svg">
      </a>
       <a href="#">
        <img src="./assets/img/icon/favoris-logo.svg">
      </a>
    </div>
  </article>`;
  elementHTML.insertAdjacentHTML("beforeend", templateProduit);
}

/**
 * Fonction qui a pour but de generer un texte et une image de Bienvenue dans le aside du HTML.
 */
function creerContenuBienvenue() {
  const templateContenuBienvenue = `
 <article id="article-bienvenue">
   <div id="img-bienvenue">
    <img src="./assets/img/bienvenue.jpg" alt="photo de deux enfants qui jouent ensemble">
  </div>
  <p>Offir le meilleur à vos enfants, tout en respectant votre budget c'est possible.</p>
  <p>Alors n'hésitez plus, <span></span>faites un second tour de jeux !</span></p>
 </article>`;
  asideHTML.insertAdjacentHTML("beforeend", templateContenuBienvenue);
}

/**
 *Affiche le contenu de aside en fonction de la valeur produitSelection
 * @param {boolean} produitSelection
 */
function afficheAside(produitSelection) {
  if (produitSelection) {
    produitSelection.forEach(function (produit) {
      creerProduitHTML(produit, asideHTML);
    });
  } else {
    creerContenuBienvenue();
  }
}

/**
 * Affiche le contenu de main: pour chaque elements de l'array, on appelle la fonction creerProduitHTML pour generer le HTML.
 * @param {ArrayObjet} produits
 */
function afficheMain(produits, parentHtml) {
  //Creation de la div qui contiendra les produits
  //On recupere l'element HTML div
  const templateDivProduit = `
  <div id="conteneur-produit"></div>`;
  parentHtml.insertAdjacentHTML("beforeend", templateDivProduit); // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
  const divHTMLProduits = document.getElementById("conteneur-produit");
  produits.forEach(function (produit) {
    creerProduitHTML(produit, divHTMLProduits);
  });
  //On recupere les elements HTML produits.
  //On ecoute les evenements sur les produits.
  produitsHTML = document.querySelectorAll("main article");
  produitsHTML.forEach(function (produitHTML) {
    produitHTML.addEventListener("click", afficheAsideProduitSelection);
  });
}

/**
 * A partir d'un évènement, on récupère l'élément déclencheur et on généré le HTML.
 * @param {Event} evenement
 */
function afficheAsideProduitSelection(evenement) {
  //--- Etape 1 ---
  //On appelle la fonction « SuprimeBordures » pour supprimer toutes les bordures des éléments HTML produit.
  supprimeBordures(produitsHTML);

  //--- Etape 2 ---
  //Sélectionner l'article existant dans le document enfant de la div "contenu-principal".
  //On supprime l'article existant pour pouvoir mettre le nouveau.
  let articleAsupprimer = document.querySelector("aside article");
  articleAsupprimer.remove();

  //--- Etape 3 ---
  //On indique qu'il y a un produit sélectionné.
  produitSelection = true;

  //--- Etape 4 ---
  //On récupère le déclencheur de l'évènement.
  //Pour chaque produit de l'array produits, on compare le titre avec le texte du déclencheur pour déterminer quel produit a été sélectionné.
  //On appelle la fonction formatteTitreImageID pour obtenir le nom de l'ID.
  //On sélectionne l'élément HTML du produit de la liste-produit.
  const declencheurH3 = evenement.currentTarget.querySelector("h3");
  produits.forEach(function (produit) {
    if (produit.titre == declencheurH3.textContent) {
      const idProduit = formatteStringSansAccentEtEspace(produit.titre);
      const produitHTML = document.getElementById(idProduit);
      produitHTML.style.border = "solid 2px  #d94862 ";
      creerProduitHTML(produit, asideHTML);
    }
  });
}

/**
 * Fonction qui permet de generer le HTML pour les boutons filtre a partir d'un array de nom et d'un element parent HTML.
 * @param {ArrayString} arrayFiltres
 * @param {elementHTML} parentHTMLDiv
 */
function genereBoutonFiltre(arrayFiltres, parentHTMLDiv) {
  //Creation de la div qui contiendra les boutons.
  //On recupere l'element HTML div.
  //Pour chaque element de l'arraY filtre on creer le bouton.
  const templateDiv = `
    <div id="conteneur-bouton"></div>`;
  parentHTMLDiv.insertAdjacentHTML("afterbegin", templateDiv); // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

  const divHTML = document.getElementById("conteneur-bouton");
  console.log(divHTML);

  for (let i = 0; i < arrayFiltres.length; i++) {
    const templateFiltre = `<div>
    ${arrayFiltres[i]}
    </div>`;
    divHTML.insertAdjacentHTML("beforeend", templateFiltre);
  }
}

/**
 * Fonction qui supprime la liste produits existante dans le HTML et la remplace par une filtree en fonction du choix de l'utilisateur.
 * @param {event} evenement
 */
function filtreLesProduits(evenement) {
  //--- Etape 1 --- : recuperer l'evenement et le mettre au bon format pour utilisation.
  let declencheur = evenement.currentTarget.textContent;
  declencheur = formatteStringSansAccentEtEspace(declencheur);

  //--- Etape 2 --- : faire les filtres.
  //On fait une copie des produits pour ne pas modifier l'information originale.
  //On filtre la nouvelle variable produitsFiltre https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  let produitsFiltre = [...produits];
  if (declencheur === formatteStringSansAccentEtEspace(nomFiltres[0])) {
    produitsFiltre.sort((a, b) => a.titre.localeCompare(b.titre));
  }
  if (declencheur === formatteStringSansAccentEtEspace(nomFiltres[1])) {
    produitsFiltre.sort((a, b) => a.prix - b.prix);
  } else if (declencheur === formatteStringSansAccentEtEspace(nomFiltres[2])) {
    produitsFiltre.sort((a, b) => b.prix - a.prix);
  }

  //--- Etape 3 --- : On supprime les articles existants pour pouvoir mettre les nouveaux.
  let articleAsupprimer = document.querySelector("#conteneur-produit");
  articleAsupprimer.remove();

  //--- Etape 4 --- : faire afficher les nouveaux articles produits.
  afficheMain(produitsFiltre, mainHTML);
}

//--- Execution du code ---//
init();
