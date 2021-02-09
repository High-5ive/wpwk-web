<template>
  <div class="category-button" @click="categorySelect"> {{ category }} </div>
</template>
<script>
export default {
  name: "SearchItem",
  data: function () {
    return {
      searchShow: false,
    }
	},
	props: {
		category: String
	},
  methods: {
    categorySelect: function () {
      this.$router.push({name:'main', query: {search: this.category}})
      this.$emit('categorySearchShow', this.searchShow)
    }
  }
}
</script>
<style lang="">
  
</style>