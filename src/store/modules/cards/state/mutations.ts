import Vue from 'vue';
import { CardInterface } from '../interfaces';

export default {
    initialiseStore (store: any) {
        const storeLS = localStorage.getItem('cm.cards');
        if (storeLS) {
            const newStore = JSON.parse(storeLS);
            Object.assign(store, newStore);
        }
    },
    set (store: any, card: CardInterface) {
        Vue.set(store.cards, card.id, card);
        localStorage.setItem('cm.cards', JSON.stringify(store));
    },
    reset (store: any) {
        store.cards = {};
        localStorage.setItem('cm.cards', JSON.stringify(store));
    }
};
