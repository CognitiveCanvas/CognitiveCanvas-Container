<template>
  <div class="card m-2">
    <div class="card-header">
      {{ type }}
    </div>

    <div class="card-body bd-callout-info">
      <p class="card-title">{{ title }}</p>
      <a v-bind:href="url" class = "btn btn-primary">Read</a>
    </div>
  </div>
</template>

<script>
export default {
name: 'contentCard',
data() {
  return {
  }
},
props: ['title','url', 'type']
}
</script>