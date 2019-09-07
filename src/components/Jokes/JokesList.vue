<template>
  <div>
    <div class="pill-container">
      <div class="pill"
        v-for="(category, index) in selectedCategories" :key="index"
        @click="turnCategory(index)">
        {{category}}
      </div>
    </div>
    <div class="card-container">
      <div v-for="(joke) in currentJokes" :key="joke.id">
        <router-link :to="{
          name: 'joke',
          params: { id: joke.id, }}">
          <JokeCard :joke="joke"></JokeCard>
          </router-link>
      </div>
      <div class="view-more" @click="loadMoreJokes()">
        <span>VIEW MORE</span>
        <img src="../../assets/right-arrow.svg"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import JokeCard from './JokeCard'

export default {
  name: 'JokesList',
  components: {
    JokeCard
  },
  computed: {
    ...mapGetters({
      currentJokes: 'joke/getCurrentJokes',
      allCategories: 'joke/getAllCategories',
      selectedCategories: 'joke/getSelectedCategories'
    }),
  },
  methods: {
    ...mapActions({
      loadMoreJokes: 'joke/loadMoreJokes',
      updateCategories: 'joke/updateCategories',
    }),
    turnCategory(index) {
      const selectedIndex = this.selectedCategories[index]
      const categoryIndex = this.allCategories.indexOf(selectedIndex)
      this.updateCategories(this.allCategories[categoryIndex])
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";

  a {  text-decoration: none; }

  .pill-container {
    display: flex;

    .pill {
      text-transform: uppercase;
      margin: 3px;
      border: solid 1px;
      border-radius: 15px;
      padding: 2px 10px;
      font-size: 12px;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .view-more{
    display: flex;
    font-size: 14px;
    padding: 14px;
    width: 206px;
    border-radius: 2px;
    border: solid 1px $color-toupe;
    color: $color-toupe;
    font-weight: bold;
    transition: 0.5ms;
    cursor: pointer;
  }

  .view-more:hover {
    border: solid 2px $color-toupe;
  }

  .view-more span {
    width: 100%;
  }

  .view-more img{
    transform: rotate(90deg)
  }
</style>
