import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Card from '@/components/Card/Card.vue';
import { CardInterface } from '@/store/modules/cards/interfaces';
import { FactoryCard } from '@/store/modules/cards/factories';

Vue.use(Vuetify);

describe('Card.vue', () => {
    let wrapper: any = null;
    const card: CardInterface = FactoryCard({
        title: 'test',
        description: 'test-description',
        url: 'https://test.test.co'
    });

    beforeEach(() => {
        wrapper = shallowMount(Card, {
            propsData: { card,  actions: []},
        });
    });

    it('returns an error for a valid code', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders props.msg when passed', () => {
        expect(wrapper.text()).toMatch(card.description);
    });
});
