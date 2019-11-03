<template>
    <v-container fluid class="pa-0">
        <v-layout justify-center>
            <v-flex xs5 lg6>
                <v-layout>
                    <v-text-field
                        dark
                        placeholder="Filter"
                        append-icon="filter_list"
                        v-model="filterValue"
                        @keyup="handlerFilterChange"
                    ></v-text-field>
                </v-layout>
            </v-flex>
            <v-flex xs6 md4 lg3 class="ml-2">
                <v-layout align-center>
                    <v-select
                        dark
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
                        color="white"
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

export interface FilterInterface {
    filter: string;
    filterField: string;
    type: string;
}

export const FILTER_TYPES = {
    equals: '$eq',
    startWith: '$startWith'
};

@Component({
})
export default class Card extends Vue {
    private order: string | null = null;
    private orderFieldSelected: string | null = null;
    private filterValue: string | null = null;
    private orderFieldOptions: OrderOptionsInterface[] = [
        {
            label: 'Not ordered',
            value: ''
        },
        {
            label: 'Created',
            value: 'created_at'
        }, {
            label: 'Title',
            value: 'title'
        }
    ];

    private handlerFilterChange (): void {
        const filter = this.filterValue;
        if (filter) {
            const filterChanged: FilterInterface = {
                filter: filter || 'desc',
                filterField: 'title',
                type: FILTER_TYPES.startWith
            };
            this.$emit('filter-change', filterChanged);
        } else {
            this.filterValue = null;
            this.$emit('filter-change', null);
        }
    }

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

