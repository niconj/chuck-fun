<template>
  <div>
    <section class="loading" v-if="jokesLoading">
      <vcl-code :primary="'#cfb995'"></vcl-code>
    </section>
    <div class="main-content" :class="$mq" v-if="!jokesLoading">
      <router-link v-if="$mq !== 'mobile'"
          :to="{name: 'home'}" class="back-button">
          <img src="../assets/chevron-left.svg">
      </router-link>
      <section class="joke-content" :class="$mq">
        <JokeCardDetails :joke="joke"></JokeCardDetails>
        <TopJokes v-if="$mq === 'laptop'"></TopJokes>
      </section>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import JokeCardDetails from '../components/Jokes/JokeCardDetails'
  import TopJokes from '../components/Jokes/TopJokes'
  import { VclCode } from 'vue-content-loading';

  export default {
    name: 'JokePage',
    props: { },
    components: {
      JokeCardDetails,
      TopJokes,
      VclCode
    },
    computed: {
      ...mapGetters({
        getJokeById: 'joke/getJokeById',
        jokesLoading: 'joke/jokesLoading',
      }),
      joke () {
        return this.getJokeById(this.$route.params.id)
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";

  .loading {
    margin: 40px auto;
    max-width: 700px;
  }

  .joke-content {
    display: flex;
    padding: 15px;
    margin-top: 2.625rem;
    div:first-child {
      flex: 1;
      margin: 0px 10px;
    }
    &.mobile {
      display: block;
      margin-top: 0.5rem;
      margin-right: 0px;
      padding: 0px
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
