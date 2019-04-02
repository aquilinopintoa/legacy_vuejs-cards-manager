<template>
    <v-container fluid>
        <v-layout justify-center>
            <v-flex xs5 lg6>
                <v-layout>
                    <v-text-field
                        placeholder="Filter"
                        append-icon="filter_list"
                    ></v-text-field>
                </v-layout>
            </v-flex>
            <v-flex xs6 md4 lg3 class="ml-2">
                <v-layout>
                    <v-select
                        :items="orderFieldOptions"
                        item-text="label"
                        item-value="value"
                        v-model="orderFieldSelected"
                        @change="handlerOrderChange">
                        
                    </v-select>
                    <v-btn 
                        v-if="orderFieldSelected"
                        class="ml-3" 
                        flat 
                        icon 
                        color="info"
                        @click="handlerOrderSwitch">
                        <v-icon>
                            {{order === 'asc' ? 'arrow_upward' : 'arrow_downward'}}
                        </v-icon>
                    </v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
            
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

interface OrderOptionsInterface {
    label: string;
    value: string;
}

export interface OrderInterface {
    order: string;
    orderField: string;
}

@Component({
})
export default class Card extends Vue {
    private order: string | null = null;
    private orderFieldSelected: string | null = null;
    private orderFieldOptions: OrderOptionsInterface[] = [
        {
            label: 'Not ordered',
            value: ''
        },
        {
            label: 'Created at',
            value: 'created_at'
        }, {
            label: 'Title',
            value: 'title'
        }
    ];

    private handlerOrderChange (): void {
        const orderField = this.orderFieldSelected;
        if (orderField) {
            const changedOrder: OrderInterface = {
                order: this.order || 'desc',
                orderField,
            };
            this.$emit('order-change', changedOrder);
        } else {
            this.order = null;
            this.$emit('order-change', null);
        }
    }

    private handlerOrderSwitch () {
        this.order = this.order === 'asc' ? 'desc' : 'asc';
        this.handlerOrderChange();
    }
}
</script>

