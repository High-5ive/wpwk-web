<template>
  <div 
    class="item-wrapper" 
    :class="{ 'selected': isSelected}"
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
  },
  methods: {
    onCategorySelect: function () {
      this.$emit('on-cate-select', this.category)
      this.isSelected = !this.isSelected
    }
  }
}
</script>
<style lang="">
  
</style>