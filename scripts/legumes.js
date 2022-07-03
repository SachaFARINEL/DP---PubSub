import {pubsub} from "./pubsub.js";

let ul = document.querySelector(".listeLegumes ul");

export const legumes = {
    list: [],
    render: () => {
        // On ajoute un eventListener sur notre liste de legumes pour pouvoir les supprimer au clique de l'utilisateur.
        ul.addEventListener("click", legumes.deleted);

        // On ajoute un eventListener sur notre button "addLegume" pour pouvoir ensuite le publish.
        let button = document.querySelector(".legumes button");
        button.addEventListener("click", legumes.add);

        console.log('LEGUMES: S\'inscrit pour savoir si un légume a été ajouté');
        // On écoute les changements lorsque l'évènement "legumeAdded" est déclenché.
        pubsub.subscribe("legumeAdded", legumes.legumeAdded);
    },
    add: event => {
        // On évite le rafraichissement de la page.
        event.preventDefault();
        // On recupère la data dans l'input legume.
        let input = document.querySelector('.legumes input');
        // On sauvegarde la data dans une variable "nom".
        let nom = input.value;
        // On efface la data dans l'input.
        input.value = "";
        // On prévient en publiant qu'un legume a été ajouté.
        console.log(`LEGUMES: legumeAdded "${nom}"`);
        pubsub.publish('legumeAdded', nom);
    },
    legumeAdded: name => {
        console.log(`LEGUMES: J'ai entendu que ${name} avait été ajouté`);
        // Set est utilisé pour ne pas avoir de legumes dupliqués.
        let list = new Set(legumes.list);
        // On ajoute le nom du legume dans notre liste de legumes.
        list.add(name);
        // On range la liste par ordre alphabétique.
        legumes.list = Array.from(list).sort();
        console.log(`LEGUMES: a legumesUpdated sa liste`);
        pubsub.publish('legumesUpdated', legumes.list);

        ul.innerHTML = '';
        let docFrag = document.createDocumentFragment();
        legumes.list.forEach(title => {
            let li = document.createElement('li');
            li.innerText = title;
            docFrag.appendChild(li);
        });
        ul.appendChild(docFrag);
    },
    deleted: event => {
        // On sélectionne le li qui correspond.
        let item = event.target.closest('li');
        // On récupère le nom du legume cliqué.
        let name = item.textContent;
        // On l'enlève de notre liste de legumes.
        legumes.list = legumes.list.filter(nom => nom !== name);
        // On publie qui le legume a été supprimé de la liste
        pubsub.publish('legumeDeleted', legumes.list);
        // On le supprime de l'UI.
        item.parentElement.removeChild(item);
    }
}

