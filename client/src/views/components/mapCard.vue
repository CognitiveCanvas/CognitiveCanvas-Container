<template>
  <v-card>
    <v-card-media
      class="white--text"
      height="200px"
      src="https://vuetifyjs.com/static/doc-images/cards/docks.jpg"
    >
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{title}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-title>
      <div> 
        <label class="grey--text">Number 10</label><br>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
      <v-btn flat color="orange">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>  
export default {
  name: 'mapCard',
  data() {
    return {
    }
  },
  computed: {
    surname: function () {
      return this.$store.state.localUser.lastName
    },
    givenname: function () {
      return this.$store.state.localUser.firstName
    }
  },
  methods: {
  },
  props: ['title','url']
}
</script>

<style module>
  input{
    width: 100%;
  }
</style>