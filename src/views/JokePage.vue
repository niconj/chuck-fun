<template>
  <div class="main-content">
    <router-link :to="{name: 'home'}" class="back-button">
        <img src="../assets/arrow-left.svg">
    </router-link>
    <section class="joke-content">
      <JokeCardDetails :joke="joke"></JokeCardDetails>
      <TopJokes></TopJokes>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JokeCardDetails from '../components/Jokes/JokeCardDetails'
import TopJokes from '../components/Jokes/TopJokes'

export default {
  name: 'JokePage',
  props: { },
  components: {
    JokeCardDetails,
    TopJokes
  },
  computed: {
    ...mapGetters({
      getJokeById: 'joke/getJokeById',
    }),
    joke () {
      return this.getJokeById(this.$route.params.id)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../styles/_variables.scss";

  .main-content {
    padding: 4rem 10rem;
  }

  .joke-content {
    display: flex;
    margin-top: 2.625rem;
    div:first-child {
      flex: 1;
    }
  }

  .back-button {
    display: block;
    background: $color-black-two;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    padding: 5px;
  }

  button {
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 50%;
      cursor: pointer;
    }
</style>
