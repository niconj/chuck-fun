<template>
  <div>
    <section class="loading" v-if="categoriesLoading && !categoriesLoadingError">
      <vcl-code :primary="'#cfb995'"></vcl-code>
    </section>
    <ErrorMessage @retry="getCategories" v-if="categoriesLoadingError"></ErrorMessage>
    <div v-if="!categoriesLoading && !categoriesLoadingError" class='category-container' :class="$mq">
      <div v-for="(category, index) in getAllCategories" :key="index"
        @click="turnCategory(index)"
        v-bind:class="{ active: getSelectedCategories.includes(category) }"
        class='category-card'>
        <p>{{category}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VclCode } from 'vue-content-loading';
import ErrorMessage from '../Shared/ErrorMessage'

export default {
  name: 'CategoriesList',
  components: { VclCode, ErrorMessage },
  computed: {
    ...mapGetters({
      getAllCategories: 'joke/getAllCategories',
      getSelectedCategories: 'joke/getSelectedCategories',
      categoriesLoading: 'joke/categoriesLoading',
      categoriesLoadingError: 'joke/categoriesLoadingError',
    }),
  },
  methods: {
    ...mapActions({
      getCategories: 'joke/getCategories',
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

  .loading {
    max-width: 700px;
    margin: 5px auto;
  }

  .category-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2.5rem;
    &.mobile { display: none }
  }

  .active {
    font-weight: bold;
    color: $color-black-two;
  }

  .category-card {
    width: 206px;
    height: 48px;
    border-radius: 2px;
    border: solid 1px $color-black-two;
    margin: 8px;
    cursor: pointer;

    p {
      font-size: 1rem;
      width: 200px;
      text-transform: uppercase;
    }
  }
</style>
