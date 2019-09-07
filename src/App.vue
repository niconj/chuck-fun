<template>
  <div id="app">
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
  color: #2c3e50;
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
    font-weight: 600;
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
</style>
