<template>
  <div class="select-button" @click="buttonSelect"> {{ selectValue }} </div>
</template>
<script>
export default {
  name: "SearchItem",
  data: function () {
    return {
			searchShow: false,
			categories: ['언어지능', '논리수학지능', '공간지능', '개인내지능', '음악지능', '신체운동지능', '자연지능', '대인지능'],
			wait: true
    }
	},
	props: {
		selectValue: String,
	},
  methods: {
    buttonSelect: function () {
			for(var i;i<this.categories.length;i++) {
				if(this.selectValue === this.categories[i]) {
					this.$router.push({name:'main', query: {category: this.selectValue}})
					this.wait = false
				}
			}
			if(this.wait) {
				this.$router.push({name:'main', query: {search: this.selectValue}})
			}
      this.$emit('categorySearchShow', this.searchShow)
		},
	}
}
</script>
<style lang="">
  
</style>