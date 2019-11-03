import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import cardStore from './cards';
import { CardRawInterface, CardInterface } from './interfaces';
import { cloneDeep } from 'lodash';

describe('create card action', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    it('Should add one new card in cards state', () => {
        const cardMock: CardRawInterface = {
            title: 'test',
            description: 'test-description',
            url: 'https://test.test.co'
        };
        const store: any = new Vuex.Store(cloneDeep(cardStore));

        store.dispatch('create', cardMock);

        const cards = store.getters.get();

        expect(cards.length).toBe(1);
    });
});
