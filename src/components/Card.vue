<template>
  <v-container>
    <v-layout
      text-xs-center
    >
        <v-card>
            <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                aspect-ratio="2.75"
                ></v-img>

            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div> {{ card_text }} </div>
                </div>
            </v-card-title>

            <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data: () => ({
    })
};
</script>

<style>

</style>
