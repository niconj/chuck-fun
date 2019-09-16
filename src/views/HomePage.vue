<template>
  <div class="main-content" :class="$mq">
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

<style lang="scss" scoped>
</style>
