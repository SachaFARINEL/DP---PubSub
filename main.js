import {fruits} from './scripts/fruits.js'
import {legumes} from './scripts/legumes.js'
import {stats} from './scripts/stats.js'
import {pubsub} from "./scripts/pubsub";

// Au chargement du DOM, les différents composants s'abonnent au PubSub et charge des events onClick.
document.addEventListener('DOMContentLoaded', () => {
    fruits.render();
    legumes.render();
    stats.render();
});

