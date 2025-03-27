/**
 * Fonction qui prend en parametre un string et le transforme en format utilisable pour id et src.
 * @param {string} nomString
 * @returns {string}
 */
export function formatteStringSansAccentEtEspace(nomString) {
  //Etape 1: Faire une copie du string dans une nouvelle constante.
  //Etape 2: Supprimer les espaces de tabulation.
  //Etape 3: Supprimer les accents.
  //Etape 4: Mettre en minuscule.
  //Etape 5: Remplacer les espaces
  let nom = nomString;
  nom = nom.trim();
  nom = nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  nom = nom.toLowerCase();
  nom = nom.replaceAll(" ", "-");
  return nom;
}
