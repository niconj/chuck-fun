<template>
  <div id="app">
    <header>
      <nav>
        <router-link :to="{ name: 'home' }">
          <img src="./assets/logo.svg"/>
        </router-link>
      </nav>
    </header>
    <section class="header-section">
      <h2>The Joke Bible</h2>
      <h3>Daily Laughs for you and yours</h3>
      <div class="search-wrapper">
        <div class="search-section">
          <input type="text" v-model="searchTerm" @keyup.enter="search()" placeholder="Search joke..">
          <img @click="search()" src="./assets/search-icon.svg"/>
        </div>
      </div>
    </section>
    <router-view />
    <footer>
      <span>Got jokes? Get paid for submitting!</span>
      <div>
        <a>Submit Joke </a>
        <img src="./assets/arrow-right.svg">
      </div>
    </footer>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'app',
    data() {
      return { searchTerm: '' }
    },
    methods: {
      ...mapActions({
        getJokes: 'joke/getAllJokes',
        getCategories: 'joke/getCategories',
        searchJokes: 'joke/searchJokes',
      }),
      search() {
        this.searchJokes(this.searchTerm)
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
  // color: #2c3e50;
  background-color: $color-white-two;
}

nav {
  display: flex;
  height: 60px;
  align-items: center;
  background-color: $color-black-two
}

nav img {
  margin-left: 10rem;

  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  /* Styles */
  margin-left: 30px;
  }
}

body {
  margin: 0px;
}

.header-section {
  background: url('./assets/bookshelf.png') center;
  background-size: cover;
  padding: 4rem 2rem;

  h2 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0px;
    font-weight: normal;
    letter-spacing: normal;
    text-align: center;
    color: $color-toupe;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0px;
    font-weight: $almost-bold;
    line-height: 1.45;
    text-align: center;
    color: $color-white;
  }

  .search-wrapper {
      display: flex;
      justify-content: center;
      padding-top: 3rem;
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
