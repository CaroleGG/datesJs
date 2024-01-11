// on require books car on en a aussi besoin dans ce fichier
const books = require('./books');
// on importe le module dayjs
const dayjs = require('dayjs');
// on require le plugin advancedFormat pour pouvoir avoir accès à plus de formats de date (le Do notamment)
const advancedFormat = require('dayjs/plugin/advancedFormat');
// on doit dire à notre objet dayjs qu'on étend ses fonctionnalités avec le plugin advancedFormat
dayjs.extend(advancedFormat);
// on importe le plugin relativeTime pour pouvoir utiliser la fonction fromNow() et obtenir l'âge des livres
const relativeTime = require('dayjs/plugin/relativeTime');
// on oublie pas de faire étendre les fonctionnalités de dayjs avec ce plugin
dayjs.extend(relativeTime);
// on importe la locale fr
require('dayjs/locale/fr');
// puis on paramètre dayjs avec cette locale. Ca aura pour effet d'afficher les dates en français !
dayjs.locale('fr');

// on peut exporter directement une fonction
// il s'agira ici de la fonction pour créer un tableau HTML correspondant à la liste de nos livres
module.exports = () => {
  // on va trier notre tableau en fonction des dates
  books.sort((a, b) => {
    return dayjs(a.releaseDate).year() - dayjs(b.releaseDate).year();
  });

  //initialise l'entete du tableau à vide
  let headerTableBook = '';

  // on boucle sur un objet du tableau books pour récupérer ses propriétés et les insérer dans des th
  //pour cela je récuoère un seul objet peu importe lequel 
  // 1er tour title, 2eme tour language, 3eme tour country etc etc 
  for(const propriete in books[0]){
    headerTableBook += `<th>${propriete}</th>`;
  }

  //initialise le contenu du tableau à vide
  let contentTableBook = '';

  for (const book of books) {
    //une ligne de tableau par livre
    contentTableBook += `<tr>
            <td>${book.title}</td>
            <td>${book.language}</td>
            <td>${book.country}</td>
            <td>${book.author}</td>
            <td>${dayjs(book.releaseDate).format('dddd Do MMMM YYYY')}</td>
            <td>${dayjs(book.releaseDate).fromNow(true)}</td>
        </tr>`;
  }

  let tableBooksHTML = `<table>
        <thead>
            <tr>
            ${headerTableBook}
            </tr>
        </thead>
        <tbody>
            ${contentTableBook}
        </tbody>
    </table>`;
  // on retourne le contenu de la variable tableBooksHTML (le tableau HTML)
  return tableBooksHTML;

};