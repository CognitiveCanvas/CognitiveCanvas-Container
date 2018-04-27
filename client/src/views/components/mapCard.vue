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
            <span class="headline">{{surname}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-title>
      <div v-show = "description.edit == false">
        <label @dblclick = "description.edit = true"> {{description.title}} </label>
      </div>
      <input v-show = "description.edit == true" v-model = "description.title"
      v-on:blur= "description.edit=false; $emit('update')"
      @keyup.enter = "description.edit=false; $emit('update')">
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
      description: {'title':'Double click to add description of concept map',
                    'edit' : false},
      editedDescription: null
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
  method: {
    editDescription: function(des) {
      this.editedDescription = des;
    },
    getId: function() {
      return givenname + '_' + surname + '_' + this._uid;
    }
  },
  props: ['title','url']
}
</script>

<style module>
  input{
    width: 100%;
  }
</style>