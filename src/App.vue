<template>
  <v-app>
    <v-toolbar flat app class="blue white--text">
      <v-toolbar-title class="headline text-uppercase ">
        <span>Card Manager</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        fab
        color="success"
        dark
        small
        href="https://github.com/aquilinopintoa"
        target="_blank"
      >
        <v-icon
          medium
          dark>
          mdi-github-circle
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    };
  }
};
</script>
