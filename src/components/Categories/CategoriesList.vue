<template>
  <div>
    <section class="loading" v-if="categoriesLoading && !categoriesLoadingError">
      <vcl-code :primary="'#cfb995'"></vcl-code>
    </section>
    <ErrorMessage @retry="getCategories" v-if="categoriesLoadingError"></ErrorMessage>
    <div v-if="!categoriesLoading && !categoriesLoadingError">
      <input id="collapsible" class="toggle" type="checkbox">
      <label for="collapsible" class="lbl-toggle">Categories</label>
        <div class="collapsible-content">
          <div class='category-container' :class="$mq">
            <div v-for="(category, index) in getAllCategories" :key="index"
              @click="turnCategory(category)"
              v-bind:class="{ active: getSelectedCategories.includes(category) }"
              :style="{ background: category.color }"
              class='category-card'>
              <p>{{category.name}}</p>
            </div>
          </div>
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
      turnCategory(selectedCategory) {
        this.updateCategories(selectedCategory)//this.getAllCategories[index])
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

  input[type='checkbox'] {
    display: none;
  }

  .lbl-toggle {
    display: block;
    font-size: 1rem;
    text-transform: uppercase;
    text-align: left;
    padding: 1rem;
    color: $color-toupe;
    background: $color-white;
    cursor: pointer;

    border-radius: 7px;
    transition: all 0.25s ease-out;
  }

  .lbl-toggle:hover {
    font-weight: bold;
  }

  .toggle:checked + .lbl-toggle + .collapsible-content {
    max-height: 300px;
  }

  .toggle:checked + .lbl-toggle::after {
    transform: rotate(180deg) translateY(2px);
  }

  .toggle:checked + .lbl-toggle {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .lbl-toggle::after {
    content: ' ';
    display: inline-block;

    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 5px solid currentColor;

    vertical-align: middle;
    margin-left: .7rem;
    transform: translateY(-2px);

    transition: transform .2s ease-out;
  }

  .category-container {
    display: flex;
    flex-wrap: wrap;
    background: $color-white;
    &.mobile { justify-content: center; }
  }

  .collapsible-content {
    max-height: 0px;
    overflow: hidden;
    overflow-y: scroll;
    margin-bottom: 15px;
    transition: max-height .25s ease-in-out;
  }

  .category-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 28px;
    border-radius: 2px;
    opacity: 0.7;
    border: solid 1px $color-black-two;
    margin: 8px;
    cursor: pointer;

    &.active {
      font-weight: bold;
      color: $color-black-two;
      opacity: 1;
      margin: 9px;
      border: solid 2px $color-black-two;
      box-sizing: border-box;
    }

    p {
      font-size: 1rem;
      width: 200px;
      text-transform: uppercase;
    }
  }
</style>
