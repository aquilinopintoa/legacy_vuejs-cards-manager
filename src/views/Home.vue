<template>
  <div class="home">
    <v-toolbar app class="card-toolbar mt-5 blue pt-3"  card prominent>
        <v-layout row justify-center>
            <CardsToolBar
                @filter-change="handlerFilterChange"
                @order-change="handlerOrderChange"/>
        </v-layout>
    </v-toolbar>
    
    <v-layout row wrap class="mt-5 pt-4">
        <v-flex xs12 md6 lg4 v-for="(card, index) of cards" :key="index">
            <Card
                :card="card"
                :actions="cardActions"/>
        </v-flex>
    </v-layout>
    <v-dialog
      v-model="openModal"
      width="500">
        <CardForm
            :card="selectedCard"
            :onSubmit="handlerSubmit"
            :onCancel="handlerCancel"
            :submitLabel="isUpdateModalActive ? 'Update' : 'Create'"/>
    </v-dialog>
    <v-btn
        fixed
        dark
        fab
        bottom
        right
        color="blue"
        @click="openCreateModal"
    >
        <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { clone, orderBy, startsWith } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import {
    CardRawInterface,
    CardInterface
} from '@/store/modules/cards';
import Card, { CardActionInterface } from '@/components/Card.vue';
import CardsToolBar, {
    OrderInterface,
    FilterInterface,
    FILTER_TYPES
} from '@/components/CardsToolBar.vue';
import CardForm from '@/components/CardForm.vue';

const MODAL_MODE = {
    create: 'CREATE',
    update: 'UPDATE'
};

interface CardWithIndexInterface extends CardInterface {
    [key: string]: string;
}

@Component({
    components: {
        Card,
        CardForm,
        CardsToolBar
    },
})

export default class Home extends Vue {
    private numCards: number = 0;
    private modalMode: string | null = null;
    private openModal: boolean = false;
    private selectedCard: CardInterface | null = null;
    private order: OrderInterface | null = null;
    private filter: FilterInterface | null = null;

    get cards (): CardInterface[] {
        let cards = this.$store.getters['cards/get']();
        const filter = this.filter;
        if (filter) {
            cards = cards.filter((card: CardInterface) => {
                const cardWithIndex = card as CardWithIndexInterface;
                switch (filter.type) {
                    case FILTER_TYPES.equals:
                        return cardWithIndex[filter.filterField] === filter.filter;
                    case FILTER_TYPES.startWith:
                        return startsWith(cardWithIndex[filter.filterField], filter.filter);
                    default:
                }
                return false;
            });
        }

        if (this.order) {
            cards = orderBy(cards, [this.order.orderField], [this.order.order]);
        }

        return cards;
    }

    get isUpdateModalActive (): boolean {
        return this.modalMode === MODAL_MODE.update;
    }

    get isCreateModalActive (): boolean {
        return this.modalMode === MODAL_MODE.create;
    }

    get cardActions (): CardActionInterface[] {
        return [
            {
                label: 'Edit',
                labelColor: 'warning',
                onAction: (card: CardInterface) => {
                    this.openUpdateModal(card);
                }
            },
            {
                label: 'Remove',
                labelColor: 'error',
                onAction: (card: CardInterface) => {
                    this.removeCard(card.id);
                }
            }
        ];
    }

    private openCreateModal () {
        this.openModal = true;
        this.modalMode = MODAL_MODE.create;
    }

    private openUpdateModal (card: CardInterface) {
        this.openModal = true;
        this.modalMode = MODAL_MODE.update;
        this.selectedCard = clone(card);
    }

    // MODAL MANAGER METHODS
    private async handlerSubmit (data: CardRawInterface) {
        switch (this.modalMode) {
            case MODAL_MODE.create:
                await this.createCard(data);
                break;
            case MODAL_MODE.update:
                if (!this.selectedCard) {
                    break;
                }

                const id = this.selectedCard.id;
                await this.updateCard(data);
                break;
            default:
                alert('Error modal mode undefined!');
        }

        this.handlerCancel();
    }

    private handlerCancel () {
        this.modalMode = null;
        this.openModal = false;
        this.selectedCard = null;
    }

    // CARD MANAGER METHODS
    private createCard (cardRaw: CardRawInterface) {
        return this.$store.dispatch('cards/create', cardRaw);
    }

    private updateCard (card: CardRawInterface) {
        const updatedCard = {
            ...this.selectedCard,
            ...card
        };

        return this.$store.dispatch('cards/update', updatedCard);
    }

    private removeCard (id: string) {
        return this.$store.dispatch('cards/remove', id);
    }

    //  METHODS TO CARD MANAGER TOOL BAR EVENTS
    private handlerOrderChange (newValue: OrderInterface) {
        this.order = newValue;
    }

    private handlerFilterChange (newValue: FilterInterface) {
        this.filter = newValue;
    }
}
</script>

<style>
.card-toolbar {
    z-index: 1;
}
</style>

