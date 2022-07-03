import {fruits} from './scripts/fruits'
import {legumes} from './scripts/legumes'
import {stats} from './scripts/stats'

document.addEventListener('DOMContentLoaded', () => {
    fruits.render();
    legumes.render();
    stats.render();
});

