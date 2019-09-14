<template>
  <div class="details-container">
    <section class="joke-details" :class="$mq">
      <section class="details-header" :class="$mq">
        <CategoriesPills :categories="joke.categories" :readonly="true"></CategoriesPills>
        <span v-bind:class="{ chestnut:  this.joke.dislikes > this.joke.likes}">
          {{popularity}}
        </span>
      </section>
      <span :class="$mq">Joke #{{joke.number}}</span>
      <div class="joke-text" :class="$mq">
        <span :class="$mq">{{joke.value}}</span>
      </div>
    </section>
    <section class="details-footer" :class="$mq">
      <div class="voting-details" :class="$mq">
        <div class="up-vote">
          <button type="button" @click="upVote()">
            <img src="../../assets/hand.svg">
          </button>
          <span :class="$mq">{{joke.likes}}</span>
        </div>
        <div class="down-vote">
          <button type="button" @click="downVote()">
            <img src="../../assets/hand.svg">
          </button>
          <span :class="$mq">{{joke.dislikes}}</span>
        </div>
      </div>
      <section class="paginator" :class="$mq">
        <router-link :to="{ name: 'joke', params: { id: this.previousId, }}">
          <img :class="$mq" src="../../assets/chevron-left.svg"/>
          <span :class="$mq">PREV. JOKE</span>
        </router-link>
        <router-link :to="{ name: 'joke', params: { id: this.nextId , }}">
          <span :class="$mq">NEXT JOKE</span>
          <img :class="$mq" src="../../assets/chevron-right.svg"/>
        </router-link>
      </section>
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
    height: 230px;
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

      &.mobile { justify-content: flex-end; }
    }

    span {
      font-size: 40px;
      font-weight: $almost-bold;
      line-height: 1.5;
      color: $color-toupe;
      &.mobile {
        font-size: 30px;
        display: block;
        margin: 15px 0px;
      }
    }

    .joke-text {
      display: flex;
      height: 8rem;
      align-items: center;
      &.mobile {
        display: block;
        overflow-y: scroll;
      }

      span {
        display: block;
        font-size: 15px;
        line-height: 1.47;
        color: $color-black-three;
        font-weight: normal;
        &.mobile {
          font-size: 12px;
          line-height: 1.7;
        }
      }
    }
  }

  .details-footer {
    display: flex;
    &.mobile { display: block;}
  }

  .voting-details {
    display: flex;
    flex: 1;
    &.mobile {
      justify-content: space-around;
    }

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
      &.mobile { font-size: 15px; }
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
    img {
      transform: scaleX(-1) rotate(180deg);
      padding-bottom: 5px;
    }
  }

  .paginator {
    display: flex;
    align-items: flex-end;
    &.mobile {
      margin: 10px 0px;
      justify-content: center;
    }

    a {
      display: flex;
      padding: 10px 16px;
      margin: 0px 4px;
      border-radius: 2px;
      border: solid 1px $color-white-three;
      background-color: $color-white-two;
      text-decoration: none;
      &.mobile {
        padding: 8px 5px;
        border:solid 2px $color-white-three;
      }

      img {
         &.mobile { height: 15px; }
      }
    }

    span {
      padding: 0px 8px;
      font-size: 14px;
      font-weight: $almost-bold;
      line-height: 1.43;
      color: $color-toupe;
      &.mobile { font-size: 11px; }
    }
  }
</style>
