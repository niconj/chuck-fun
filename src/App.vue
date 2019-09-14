<template>
  <div id="app">
    <header>
      <nav>
        <router-link :to="{ name: 'home' }">
          <img :class="$mq" src="./assets/logo.svg"/>
        </router-link>
      </nav>
    </header>
    <section class="header-section" :class="$mq">
      <h2 :class="$mq">The Joke Bible</h2>
      <h3 :class="$mq">Daily Laughs for you and yours</h3>
      <div class="search-wrapper" :class="$mq">
        <div class="search-section">
          <input type="text" v-model="searchTerm" @keyup.enter="search()" placeholder="Search joke..">
          <img @click="search()" src="./assets/search-icon.svg"/>
        </div>
      </div>
    </section>
    <router-view />
    <footer :class="$mq">
      <span>Got jokes? Get paid for submitting!</span>
      <div>
        <a>Submit Joke </a>
        <img src="./assets/arrow-right.svg">
      </div>
    </footer>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'app',
    data() {
      return { searchTerm: '' }
    },
    computed: {
      ...mapGetters({
        currentJokes: 'joke/getCurrentJokes',
      }),
    },
    methods: {
      ...mapActions({
        getJokes: 'joke/getAllJokes',
        getCategories: 'joke/getCategories',
        searchJokes: 'joke/searchJokes',
      }),
      search() {
        this.searchJokes(this.searchTerm)
        if (this.currentJokes.length === 1) {
          this.$router.push({name: 'joke', params: { id: this.currentJokes[0].id } }).catch(err => {})
        } else {
          this.$router.push({name: 'home'}).catch(err => {})
        }
      }
    },
    mounted () {
      this.getJokes()
      this.getCategories()
    },
  }
</script>

<style lang="scss">
@import "./styles/_variables.scss";
@import "./styles/_styles.scss";

  #app {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: $color-white-two;
  }

  nav {
    display: flex;
    height: 60px;
    align-items: center;
    background-color: $color-black-two;

    img {
      margin-left: 10rem;
      &.mobile { margin-left: 30px; }
    }
  }

  body {
    margin: 0px;
  }

  .main-content {
    padding: 4em 6em;
    &.mobile { padding: 1rem };
  }

  .header-section {
    background: url('./assets/bookshelf.png') center;
    background-size: cover;
    padding: 4rem 2rem;
    &.mobile { padding: 3rem 2rem; }

    h2 {
      font-size: 3rem;
      line-height: 1.5;
      margin: 0px;
      font-weight: normal;
      letter-spacing: normal;
      text-align: center;
      color: $color-toupe;
      &.mobile { font-size: 2rem; }
    }

    h3 {
      font-size: 1.3rem;
      margin: 0px;
      font-weight: $almost-bold;
      line-height: 1.45;
      text-align: center;
      color: $color-white;
      &.mobile { font-size: 1rem; }
    }

    .search-wrapper {
        display: flex;
        justify-content: center;
        padding-top: 3rem;
        &.mobile { font-size: 1rem;}
    }

    .search-section {
      width: 20rem;
      height: 1.5rem;
      border-radius: 4px;
      background: $color-white;
      display: flex;
      padding: 14px 16px 14px 16px;
      justify-content: center;
      align-items: center;

      input {
        width: 100%;
        border: $color-white;
        outline: none;
        font-size: 1rem;
      }

      img {
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 11rem;
    background: url('./assets/footer.jpg') center;
    background-size: cover;
    height: 12rem;
    text-transform: uppercase;
    font-weight: bold;
    text-align: left;
    &.mobile {
      height: 7rem;
      padding-left: 1rem;
    }

    span {
      width: 200px;
      font-size: 1rem;
      color: $color-white-two;
    }

    div {
      display: flex;
      padding-top: 13px;
    }

    a {
      font-size: 0.8rem;
      color: $color-toupe;
          padding-right: 8px;
    }
  }
</style>
