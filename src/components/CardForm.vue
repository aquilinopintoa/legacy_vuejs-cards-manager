<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-layout
                text-xs-center>
                <v-card>
                    <v-card-title primary-title>
                        <v-flex xs12>
                            <v-text-field
                                label="Title"
                                v-model="cardEdit.title"
                                :rules="rules.title"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                label="Description"
                                :rules="rules.description"
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
                        <v-btn
                            @click="onCancel" 
                            color="red">
                            Cancel
                        </v-btn>
                        <v-btn
                            :disabled="!valid"
                            @click="handlerSubmit" 
                            color="success">
                            {{submitLabel}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script lang="ts">
import { clone } from 'lodash';
import { CardRawInterface, CardInterface } from '@/store/modules/cards';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

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

    private valid: boolean = false;
    private rules = {
        title: [
            (v: string | null): string | boolean => v ? true : `Title is required.`
        ],
        description: [
            (v: string | null): string | boolean => v ? true : `Description is required.`
        ]
    };

    private cardEdit = {};

    private mounted () {
        this.cardEdit = this.resetEditCard();
    }

    private resetEditCard (): CardRawInterface {
        (this.$refs.form as any).resetValidation();
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

    @Watch('card')
    private onCardChanged (value: CardRawInterface, oldValue: CardRawInterface) {
        this.cardEdit = this.resetEditCard();
    }
}
</script>

<style>

</style>
