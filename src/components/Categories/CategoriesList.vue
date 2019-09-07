<template>
  <div class='category-container'>
    <div v-for="(category, index) in getAllCategories" :key="index"
      @click="turnCategory(index)"
      v-bind:class="{ active: getSelectedCategories.includes(category) }"
      class='category-card'>
      <p>{{category}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CategoriesList',
  components: { },
  computed: {
    ...mapGetters({
      getAllCategories: 'joke/getAllCategories',
      getSelectedCategories: 'joke/getSelectedCategories',
    }),
  },
  methods: {
    ...mapActions({
      updateCategories: 'joke/updateCategories',
    }),
    turnCategory(index) {
      this.updateCategories(this.getAllCategories[index])
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";
  .category-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
  }

  .active {
    font-weight: bold;
    color: $color-black;
  }

  .category-card {
    width: 206px;
    height: 48px;
    border-radius: 2px;
    border: solid 1px $color-black;
    margin: 8px;
    cursor: pointer;

    p {
      font-size: 1rem;
      width: 200px;
      text-transform: uppercase;
    }
  }
</style>
