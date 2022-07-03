import {pubsub} from "./pubsub.js";

let ul = document.querySelector(".listeFruits ul");

export const fruits = {
    list: [],
    render: () => {
        // On ajoute un eventListener sur notre liste de fruits pour pouvoir les supprimer au clique de l'utilisateur.
        ul.addEventListener("click", fruits.deleted);

        // On ajoute un eventListener sur notre button "addFruit" pour pouvoir ensuite le publish.
        let button = document.querySelector(".fruits button");
        button.addEventListener("click", fruits.add);

        console.log('FRUITS: S\'inscrit pour savoir si un fruit a été ajouté');
        // On écoute les changements lorsque l'évènement "fruitAdded" est déclenché.
        pubsub.subscribe("fruitAdded", fruits.fruitAdded);
    },
    add: event => {
        // On évite le rafraichissement de la page.
        event.preventDefault();
        // On recupère la data dans l'input fruit.
        let input = document.querySelector('.fruits input');
        // On sauvegarde la data dans une variable "nom".
        let nom = input.value;
        // On efface la data dans l'input.
        input.value = "";
        // On prévient en publiant qu'un fruit a été ajouté.
        console.log(`FRUITS: fruitAdded "${nom}"`);
        pubsub.publish('fruitAdded', nom);
    },
    fruitAdded: name => {
        console.log(`FRUITS: J'ai entendu que ${name} avait été ajouté`);
        // Set est utilisé pour ne pas avoir de fruits dupliqués.
        let list = new Set(fruits.list);
        // On ajoute le nom du fruit dans notre liste de fruits.
        list.add(name);
        // On range la liste par ordre alphabétique.
        fruits.list = Array.from(list).sort();
        console.log(`FRUITS: a fruitsUpdated sa liste`);
        pubsub.publish('fruitsUpdated', fruits.list);

        ul.innerHTML = '';
        let docFrag = document.createDocumentFragment();
        fruits.list.forEach(title => {
            let li = document.createElement('li');
            li.innerText = title;
            docFrag.appendChild(li);
        });
        ul.appendChild(docFrag);
    },
    deleted: event => {
        // On sélectionne le li qui correspond.
        let item = event.target.closest('li');
        // On récupère le nom du fruit cliqué.
        let name = item.textContent;
        // On l'enlève de notre liste de fruits.
        fruits.list = fruits.list.filter(nom => nom !== name);
        // On publie qui le fruit a été supprimé de la liste
        pubsub.publish('fruitDeleted', fruits.list);
        // On le supprime de l'UI.
        item.parentElement.removeChild(item);
    }
}

