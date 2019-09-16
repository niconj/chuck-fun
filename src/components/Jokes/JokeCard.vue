<template>
  <div class="card" :class="$mq">
    <section class="header">
      <img src="../../assets/lightning.svg">
      <h3>Joke # {{joke.number}}</h3>
    </section>
    <div class="joke">
      <p :class="$mq">{{joke.value}}</p>
    </div>
    <section class="stats">
      <span>SEE STATS</span>
      <img src="../../assets/arrow-right.svg">
    </section>
  </div>
</template>

<script>
  export default {
    name: 'JokeCard',
    props: [ 'joke' ],
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";

  .card {
    display: flex;
    flex-direction: column;
    max-width: 360px;
    height: 230px;
    padding: 16px;
    border: solid 1px $color-white-three;
    box-shadow: 0 2px 5px 0 $color-black-two;
    transition: 0.2s;
    margin: 20px 7.5px;
    background-color: $color-white;
    &.mobile {
      margin: 12px 0px;
      padding: 10px;
    }
    &.tablet {
      margin: 5px 5px;
      padding: 10px;
    }
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 $color-black-two;
  }

  .header {
    display: flex;

    h3 {
      margin: 0px 15px;
      color: $color-toupe;
    }
  }

  .joke {
    height: 85%;
  }

  .joke p {
    font-size: 0.875rem;
    width: 20rem;
    margin: 0px;
    padding-top: 26px;
    line-height: 1.57;
    text-align: left;
    color: $color-black-two;
    &.mobile { width: auto; }
  }

  .stats {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .stats span {
    font-size: 0.875rem;
    margin-right: 5px;
    font-weight: bold;
    text-decoration: none;
    color: $color-toupe;
  }
</style>
