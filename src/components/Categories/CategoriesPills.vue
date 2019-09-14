<template>
    <div class="pill-container">
      <div class="pill" :class="[{ clickable: !readonly }, $mq]"
        v-for="(category, index) in categories" :key="index"
        @click="turnCategory(index)">
        {{category}}
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CategoriesPills',
  props: {
    categories: Array,
    readonly: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapGetters({
      allCategories: 'joke/getAllCategories',
      selectedCategories: 'joke/getSelectedCategories'
    }),
  },
  methods: {
    ...mapActions({ updateCategories: 'joke/updateCategories', }),

    turnCategory(index) {
      if (!this.readonly) {
        const selectedIndex = this.selectedCategories[index]
        const categoryIndex = this.allCategories.indexOf(selectedIndex)
        this.updateCategories(this.allCategories[categoryIndex])
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/_variables.scss";

  .pill-container {
    display: flex;

    .pill {
      text-transform: uppercase;
      margin: 3px;
      border: solid 1px;
      border-radius: 15px;
      padding: 2px 10px;
      font-size: 0.75rem;
      font-weight: bold;
      &.mobile {
        margin: 0px;
        font-size: 0.5rem;
      }
    }

    .clickable {
      cursor: pointer;
    }
  }
</style>
