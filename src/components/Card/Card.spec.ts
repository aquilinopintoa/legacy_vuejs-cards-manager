import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Card from '@/components/Card/Card.vue';
import { CardRawInterface, FactoryCard } from '@/store/modules/cards/cards';

Vue.use(Vuetify);

describe('Card.vue', () => {
    let wrapper: any = null;
    const card = FactoryCard({
        title: 'test',
        description: 'test-description',
        url: 'https://test.test.co'
    });

    beforeEach(() => {
        wrapper = shallowMount(Card, {
            propsData: { card,  actions: []},
        });
    });

    it('renders props.msg when passed', () => {
        expect(wrapper.text()).toMatch(card.description);
    });
});
