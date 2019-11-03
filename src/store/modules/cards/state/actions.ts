import { CardRawInterface, CardInterface } from '../interfaces';
import { FactoryCard } from '../factories';

export default {
    async create (context: any, cardRaw: CardRawInterface) {
        const card = FactoryCard(cardRaw);

        await context.commit('set', card);
    },
    async update (context: any, card: CardInterface) {
        await context.commit('set', card);
    },
    async remove (context: any, id: string) {
        const previous = context.getters.get();
        const removedTarget = previous.filter((card: CardInterface) => card.id !== id);

        await context.commit('reset');

        await Promise.all(removedTarget.map((card: CardInterface) => context.commit('set', card)));
    }
};
