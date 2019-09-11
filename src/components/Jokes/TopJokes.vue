<template>
  <div class="content">
    <span class="title">THE TOP 10 JOKES THIS WEEK</span>
    <div class="joke-list">
      <ul style="list-style: none;">
        <li v-for="(joke) in topJokes" :key="joke.id">
          <router-link :to="{ name: 'joke', params: { id: joke.id, }}">
          # {{joke.number}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopJokes',
  computed: {
    ...mapGetters({
      topJokes: 'joke/getTopJokes',
    }),
  },
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";

  .content {
    text-align: left;
    background: $color-white-two;
    border-radius: 4px;
    border: solid 1px $color-white-three;
    padding: 32px;
    max-width: 300px;
  }

  .title {
    font-size: 15px;
    font-weight: $almost-bold;
    line-height: 1.6;
    color: $color-black-two;
  }

  .joke-list {
    display: flex;
    flex-direction: column;

    a {
      color: $color-black-two;
    }
  }

</style>
