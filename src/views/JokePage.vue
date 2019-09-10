<template>
  <div class="main-content">
    <router-link :to="{name: 'home'}" class="back-button">
        <img src="../assets/arrow-left.svg">
    </router-link>
    <div class="joke-detail">
      <JokeCardDetails :joke="joke"></JokeCardDetails>
      <section class="paginator">
        <router-link :to="{ name: 'joke', params: { id: this.previousId, }}">
          <img src="../assets/arrow-left.svg"/>
          <span>PREV. JOKE</span>
        </router-link>
        <router-link :to="{ name: 'joke', params: { id: this.nextId , }}">
          <span>NEXT JOKE</span>
          <img src="../assets/arrow-right.svg"/>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JokeCardDetails from '../components/Jokes/JokeCardDetails'

export default {
  name: 'JokePage',
  props: { },
  components: {
    JokeCardDetails
  },
  computed: {
    ...mapGetters({
      getJokeById: 'joke/getJokeById',
      getNextJokeId: 'joke/getNextJokeId',
      getPreviousJokeId: 'joke/getPreviousJokeId',
    }),
    nextId () {
      return this.getNextJokeId(this.joke.id)
    },
    previousId () {
      return this.getPreviousJokeId(this.joke.id)
    },
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

  .back-button {
    display: block;
    background: $color-black-two;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    padding: 5px;
  }

  .joke-detail {
    margin-top: 46px;
  }

  .paginator {
    display: flex;

    a {
      display: flex;
      padding: 10px;
      border-radius: 2px;
      border: solid 1px $color-white-three;
      background-color: $color-white-two;
    }
  }


  button {
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 50%;
      cursor: pointer;
    }
</style>
