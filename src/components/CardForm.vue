<template>
    <v-form>
        <v-container>
            <v-layout
                text-xs-center>
                <v-card>
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <v-text-field
                                label="Title"
                                v-model="cardEdit.title"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                label="Description"
                                v-model="cardEdit.description"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                label="Url"
                                v-model="cardEdit.url"
                            ></v-text-field>
                        </v-flex>
                    </v-card-title>

                    <v-card-actions>
                        <v-btn @click="onCancel" color="red">Cancel</v-btn>
                        <v-btn @click="handlerSubmit" color="success">{{submitLabel}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script lang="ts">
import { clone } from 'lodash';
import { CardRawInterface } from '@/store/modules/cards';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Card extends Vue {
    @Prop({})
    private readonly card!: CardRawInterface | null;
    @Prop({default: 'Submit'})
    private readonly submitLabel!: string;
    @Prop({})
    private readonly onSubmit!: (c: CardRawInterface) => void;
    @Prop({})
    private readonly onCancel!: () => void;

    private cardEdit = this.resetEditCard();

    private resetEditCard (): CardRawInterface {
        return {
            title: this.card ? this.card.title || '' : '',
            description: this.card ? this.card.description || '' : '',
            url: this.card ? this.card.url || '' : ''
        };
    }

    private async handlerSubmit () {
        const card = clone(this.cardEdit);

        await this.onSubmit(card);

        this.cardEdit = this.resetEditCard();
    }
}
</script>

<style>

</style>
