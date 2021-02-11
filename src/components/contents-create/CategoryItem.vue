<template>
  <div 
    class="item-wrapper" 
    :class="{ 'selected-cate': isSelected }"
    @click="onCategorySelect"
  >
    {{ category }}
  </div>
</template>
<script>
export default {
  name: "CategoryItem",
  data: function () {
    return {
      isSelected: false,
    }
  },
  props: {
    category: String,
    selectedCategories: Array,
  },

  methods: {
    onCategorySelect: function () {
      const selectedCategoriesCount = this.selectedCategories.reduce((a, b) => (a + b))
      console.log(selectedCategoriesCount)
      this.$emit('on-cate-select', this.category)
      this.isSelected = !this.isSelected
    }
  }
}
</script>
<style lang="">
  
</style>