import moment from 'moment';
import Vue from 'vue';

const DEFAULT_URL = 'https://cdn.vuetifyjs.com/images/cards/desert.jpg';

export interface CardRawInterface {
    title: string;
    description: string;
    url: string;

}

export interface CardInterface {
    id: string;
    title: string;
    description: string;
    url: string;
    created_at: string;

}

export default {
    namespaced: true,
    state: {
        cards: {}
    },

    getters: {
        get: (state: any) =>
            (id: string): CardInterface | CardInterface[] => {
                if (id) {
                    return state.cards[id];
                } else {
                    return Object.values(state.cards);
                }
            }
    },

    mutations: {
        set (store: any, card: CardInterface) {
            Vue.set(store.cards, card.id, card);
        },
        reset (store: any) {
            store.cards = {};
        }
    },

    actions: {
        async create (context: any, cardRaw: CardRawInterface) {
            const createdAt = moment().format();
            const card = {
                id: `${cardRaw.title}${createdAt}`,
                created_at: createdAt,
                ...cardRaw,
                url: cardRaw.url || DEFAULT_URL
            };

            await context.commit('set', card);
        },
        async remove (context: any, id: string) {
            const previous = context.getters.get;
            const removedTarget = previous.filter((card: CardInterface) => card.id !== id);

            await context.commit('reset');

            await Promise.all(removedTarget.map((card: CardInterface) => context.commit('set', card)));
        }
    }
};
