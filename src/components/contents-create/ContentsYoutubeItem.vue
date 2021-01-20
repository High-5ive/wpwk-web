<template>
  <div>
    Page{{ idx + 1 }} - <img :src="item.youtube.thumbnailSrc" alt=""> - <span @click="onEdit" v-if="editInput==false">{{ item.description }}</span>    
    <input 
      style="border: black solid 1px" 
      v-if="item.description==false" 
      @change="onItemChange" 
      type="text" 
      v-model="description" 
      placeholder="내용을 적어주세요."
    >
    <input 
      style="border: black solid 1px" 
      v-if="editInput" 
      @change="onItemChange" 
      type="text" 
      v-model="description"
      :placeholder="item.description"
    >
    <button @click="deleteItem">X</button>
  </div>
</template>
<script>
export default {
  name: 'ContentsYoutubeItem',
  props: {
    item: Object,
    idx: Number,
    
  },
  data: function () {
    return {
      description: '',
      fInputShow: true,
      editInput: false
    }
  },
  methods: {
    deleteItem: function () {
      this.$emit('delete-item', this.idx)
    },
    onItemChange: function () {
      this.$emit('item-change', [this.description, this.idx])
      this.fInputShow = false
      this.editInput = false
    },
    onEdit: function () {
      this.editInput = true
      this.fInputShow = false
    }
  }
  
}
</script>
<style>
  
</style>