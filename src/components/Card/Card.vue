<template>
  <v-container>
    <v-layout
      text-xs-center
    >
        <v-card 
            width="100%" 
            @mouseover="handlerHover"
            @mouseout="handlerHover">
            <v-img
                :src="card.url"
                aspect-ratio="2.75"
                class="align-end"
                >
                <v-container
                    fluid
                    pa-2
                    align-end
                    justify-start
                  >
                    <div class="headline white--text text-xs-left">{{ card.title }}</div>
                  </v-container>
            </v-img>
            <v-card-title primary-title>
                <div>
                    <div> {{ card.description }} </div>
                </div>
            </v-card-title>

            <v-card-actions class="justify-end">
                <div v-show="hover">
                    <v-btn 
                        v-for="(action, index) of actions" 
                        :key="index" 
                        flat
                        @click="action.onAction(card)" 
                        :color="action.labelColor">{{action.label}}</v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { CardInterface } from '@/store/modules/cards/cards';
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface CardActionInterface {
    label: string;
    labelColor: string;
    onAction: (card: CardInterface) => void;
}

@Component({
})
export default class Card extends Vue {
    @Prop({required: true})
    private readonly card!: CardInterface;
    @Prop({default: []})
    private readonly actions!: CardActionInterface[];
    private hover: boolean = false;

    private handlerHover (): void {
        this.hover = !this.hover;
    }
}
</script>

<style>
.min-height {
    min-height: 52px
}
</style>
