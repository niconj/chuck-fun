<template>
  <div class="card" :class="$mq">
    <h3># {{joke.number}}</h3>
    <div class="joke">
      <p :class="$mq">{{joke.value}}</p>
    </div>
    <div class="stats">
      <span>SEE STATS</span>
      <img src="../../assets/arrow-right.svg">
    </div>
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
    margin: 7px 7.5px;
    background-color: $color-white;
    &.mobile {
      margin: 12px 0px;
      padding: 10px;
    }
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 $color-black-two;
  }

  h3 {
    margin: 0px;
    display: flex;
    color: $color-toupe;
  }

  .joke {
    height: 85%;
  }

  .joke p {
    font-size: 14px;
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
    font-size: 14px;
    margin-right: 5px;
    font-weight: bold;
    text-decoration: none;
    color: $color-toupe;
  }
</style>
