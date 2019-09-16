<template>
  <section @click="retry">
    <div class="error-message">
      <img src="../../assets/warning-icon.svg">
      <span>There was an problem, retry!</span>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ErrorMessage',
    methods: {
      retry () { this.$emit('retry') }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";

  .error-message {
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: $color-white;
    cursor: pointer;
    padding: 5px;

    img {
      width: 60px;
      margin: auto;
    }
    span {
      margin: 5px;
      color: $color-toupe;
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

</style>
