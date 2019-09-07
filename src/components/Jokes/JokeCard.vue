<template>
  <div class="card">
    <h3># {{joke.number}}</h3>
    <div class="joke">
      <p>{{joke.value}}</p>
    </div>
    <div class="stats">
      <span>see stats</span>
      <img src="../../assets/right-arrow.svg">
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
    box-shadow: 0 2px 5px 0 $color-black;
    transition: 0.2s;
    margin: 19px 7.5px;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 $color-black;
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
    color: $color-black;
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
    text-transform: uppercase;
  }
</style>
