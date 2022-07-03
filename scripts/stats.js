import {pubsub} from './pubsub';
import {fruits} from "./fruits";

export const stats = {
    render: () => {
        console.log('STATS: S\'inscrit pour savoir si un fruit a été mis à jour');
        pubsub.subscribe("fruitsUpdated", stats.fruitsUpdated);

        console.log('STATS: S\'inscrit pour savoir si un légume a été mis à jour');
        pubsub.subscribe("legumesUpdated", stats.legumesUpdated);

        console.log('STATS: S\'inscrit pour savoir si un fruit a été supprimé');
        pubsub.subscribe("fruitDeleted", stats.fruitsUpdated);

        console.log('STATS: S\'inscrit pour savoir si un légume a été supprimé');
        pubsub.subscribe("legumeDeleted", stats.legumesUpdated);
    },
    fruitsUpdated: list => {
        let textFruit = "fruit";
        if (list.length > 1) {
            textFruit = "fruits";
        }
        if (list.length > 0) {
            document.querySelector(".fruitsCount").innerText = `${list.length} ${textFruit} dans la liste`;
        } else {
            document.querySelector(".fruitsCount").innerText = `Aucun fruit dans la liste`;
        }
    },
    legumesUpdated: list => {
        let textLegume = "legume";
        if (list.length > 1) {
            textLegume = "legumes";
        }
        if (list.length > 0) {
            document.querySelector(".legumesCount").innerText = `${list.length} ${textLegume} dans la liste`;
        } else {
            document.querySelector(".legumesCount").innerText = `Aucun légume dans la liste`;
        }
    }


}