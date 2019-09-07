<template>
  <div class="main-content">
    <CategoriesList></CategoriesList>
    <JokesList></JokesList>
  </div>
</template>

<script>
import JokesList from '../components/Jokes/JokesList'
import CategoriesList from '../components/Categories/CategoriesList'
export default {
  name: 'HomePage',
  components: { JokesList, CategoriesList },
  props: { },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main-content {
    padding: 4rem 10rem;
  }
</style>
