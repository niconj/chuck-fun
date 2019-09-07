<template>
  <div class="hello">
    <h1>{{joke.value}}</h1>
    <h3>likes - {{joke.likes}}</h3>
    <h3>dislikes - {{joke.dislikes}}</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'JokePage',
  props: { },
  computed: {
    ...mapGetters({
      getJokeById: 'joke/getJokeById'
    }),
    joke () {
      return this.getJokeById(this.$route.params.id)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
