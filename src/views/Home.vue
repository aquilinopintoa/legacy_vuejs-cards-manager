<template>
  <div class="home">
    <v-layout row wrap>
        <v-flex xs4 v-for="(card, index) of cards" :key="index">
            <Card/>
        </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
    data () {
        return {
            cards: Array(10)
        };
    },
    components: {
        Card,
    },
})

export default class Home extends Vue {}
</script>
