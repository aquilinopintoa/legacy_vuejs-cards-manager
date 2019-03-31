<template>
  <div class="home">
    <v-layout row wrap>
        <v-flex xs4 v-for="(card, index) of cards" :key="index">
            <Card
                :card="card"
                :actions="cardActions(card.id)"/>
        </v-flex>
    </v-layout>
    <v-dialog
      v-model="openModal"
      width="500"
    >
        <CardForm
            :card="selectedCard"
            :onSubmit="handlerSubmit"
            :onCancel="handlerCancel"
            :submitLabel="isUpdateModalActive ? 'Update' : 'Add'"/>
    </v-dialog>
    <v-btn
        fixed
        dark
        fab
        bottom
        right
        color="pink"
        @click="openCreateModal"
    >
        <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
    CardRawInterface,
    CardInterface
} from '@/store/modules/cards';
import Card, { CardActionInterface } from '@/components/Card.vue';
import CardForm from '@/components/CardForm.vue';

const MODAL_MODE = {
    create: 'CREATE',
    update: 'UPDATE'
};

@Component({
    components: {
        Card,
        CardForm
    },
})

export default class Home extends Vue {
    private numCards: number = 0;
    private modalMode: string | null = null;
    private openModal: boolean = false;
    private selectedCard: CardInterface | null = null;

    get cards (): CardInterface[] {
        const cards = this.$store.getters['cards/get']();
        return cards;
    }

    get isUpdateModalActive (): boolean {
        return this.modalMode === MODAL_MODE.update;
    }

    get isCreateModalActive (): boolean {
        return this.modalMode === MODAL_MODE.create;
    }

    get cardActions (): (id: string) => CardActionInterface[] {
        return (id: string) => {
            const actions = [
                {
                    label: 'Edit',
                    labelColor: 'warning',
                    onAction: () => {
                        alert('work');
                    }
                },
                {
                    label: 'Remove',
                    labelColor: 'error',
                    onAction: () => {
                        alert('works');
                    }
                }
            ];
            return actions;
        };
    }

    private openCreateModal () {
        this.openModal = true;
        this.modalMode = MODAL_MODE.create;
    }

    private async handlerSubmit (data: CardRawInterface) {
        switch (this.modalMode) {
            case MODAL_MODE.create:
                await this.createCard(data);
                break;
            case MODAL_MODE.update:
                // valor previo
                // crear nuevo objeto con data updated
                // this.updateCard(data)
                break;
            default:
                alert('Error modal mode undefined!');
        }

        this.handlerCancel();
    }

    private handlerCancel () {
        this.modalMode = null;
        this.openModal = false;
    }

    private createCard (cardRaw: CardRawInterface) {
        this.$store.dispatch('cards/create', cardRaw);
    }

    private updateCard (card: CardInterface) {
        this.$store.dispatch('cards/update', card);
    }

    private removeCard (id: string) {
        this.$store.dispatch('cards/remove', id);
    }
}
</script>
