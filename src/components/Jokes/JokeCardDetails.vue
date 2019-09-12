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
    <section class="details-footer">
      <div class="voting-details">
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
      </div>
      <div class="paginator">
        <router-link :to="{ name: 'joke', params: { id: this.previousId, }}">
          <img src="../../assets/arrow-left.svg"/>
          <span>PREV. JOKE</span>
        </router-link>
        <router-link :to="{ name: 'joke', params: { id: this.nextId , }}">
          <span>NEXT JOKE</span>
          <img src="../../assets/arrow-right.svg"/>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { POPULARITY } from '../../shared/constants'
import CategoriesPills from '../Categories/CategoriesPills'

export default {
  name: 'JokeCardDetails',
  props: [ 'joke' ],
  components: { CategoriesPills },
  computed: {
    ...mapGetters({
      getNextJokeId: 'joke/getNextJokeId',
      getPreviousJokeId: 'joke/getPreviousJokeId',
    }),
    nextId () {
      return this.getNextJokeId(this.joke.id)
    },
    previousId () {
      return this.getPreviousJokeId(this.joke.id)
    },
    popularity() {
      return this.joke.dislikes > this.joke.likes ? POPULARITY.BAD_REPUTATION
        : this.joke.likes <= 50 ? POPULARITY.LOW
        : this.joke.likes <= 100 ? POPULARITY.MEDIUM
        : POPULARITY.HIGH
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

  .details-container {
    max-width: 730px;
  }

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

  .details-footer {
    display: flex;
  }

  .voting-details {
    display: flex;
    flex: 1;

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

  .paginator {
    display: flex;
    align-items: flex-end;


    a {
      display: flex;
      padding: 10px 16px;
      margin: 0px 4px;
      border-radius: 2px;
      border: solid 1px $color-white-three;
      background-color: $color-white-two;
      text-decoration: none;
    }

    span {
      padding: 0px 8px;
      font-size: 14px;
      font-weight: $almost-bold;
      line-height: 1.43;
      color: $color-toupe;
    }
  }
</style>
