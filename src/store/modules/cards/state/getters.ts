import { CardRawInterface, CardInterface } from '../interfaces';
export default {
    get: (state: any) =>
        (id: string): CardInterface | CardInterface[] => {
            if (id) {
                return state.cards[id];
            } else {
                return Object.values(state.cards);
            }
        }
};
