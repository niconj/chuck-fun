<template>
  <div class="details-container">
    <section class="joke-details">
      <section class="details-header">
        <CategoriesPills :categories="joke.categories"></CategoriesPills>
        <span v-bind:class="{ chestnut:  this.joke.dislikes > this.joke.likes}">
          {{popularity}}
        </span>
      </section>
      <span>Joke #{{joke.number}}</span>
      <div class="joke-text">
        <span>{{joke.value}}</span>
      </div>
    </section>
    <section class="voting-details">
      <div class="up-vote">
        <button type="button" @click="upVote()">
          <img src="../../assets/hand.svg">
        </button>
        <span>{{joke.likes}}</span>
      </div>
      <div class="down-vote">
        <button type="button" @click="downVote()">
          <img src="../../assets/hand.svg">
        </button>
        <span>{{joke.dislikes}}</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CategoriesPills from '../Categories/CategoriesPills'

export default {
  name: 'JokeCardDetails',
  props: [ 'joke' ],
  components: { CategoriesPills },
  computed: {
    popularity() {
      return this.joke.dislikes > this.joke.likes ? "CHESTNUT"
        : this.joke.likes <= 50 ? "NEW IN TOWN"
        : this.joke.likes <= 100 ? "TRENDING"
        : "HALL OF FAME"
    }
  },
  methods: {
    ...mapActions({ upVoteJoke: 'joke/upVote', downVoteJoke: 'joke/downVote' }),

    upVote() { this.upVoteJoke(this.joke) },
    downVote() { this.downVoteJoke(this.joke) },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";
  .joke-details {
    background: $color-white;

    border-radius: 4px;
    border: solid 1px $color-white-three;

    padding: 16px;
    max-width: 730px;
    min-height: 200px;
    text-align: left;

    .details-header {
      display: flex;
      align-items: center;

      div {
        flex-grow: 1;
      }

      span {
        font-size: 0.875rem;
        line-height: 1.71;
        font-weight: $almost-bold;
        color: $color-macaroni-and-cheese;
      }

      .chestnut {
        background: $color-black;
      }
    }

    span {
      font-size: 40px;
      font-weight: $almost-bold;
      line-height: 1.5;
      color: $color-toupe;
    }

    .joke-text {
      display: flex;
      height: 8rem;
      align-items: center;

      span {
        display: block;
        font-size: 15px;
        line-height: 1.47;
        color: $color-black-three;
        font-weight: normal;
      }
    }
  }
  .voting-details {
    display: flex;

    div {
      max-width: 40px;
      margin: 17px 15px;
    }

    button {
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 50%;
      cursor: pointer;
    }

    span {
      font-size: 12px;
      font-weight: $almost-bold;
    }
  }

  .up-vote {
    color: $color-tea;
    button {
      background: $color-tea;
    }
  }

  .down-vote {
    color: $color-lightish-red;
    button {
      background: $color-lightish-red;
    }
  }
</style>
