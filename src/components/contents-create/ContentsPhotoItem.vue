<template lang="">
   <div class="photo-wrapper">
      Page{{ idx + 1 }} - <img :src="item.photo.preview" />
       - <span @click="onEdit" v-if="editInput==false">{{ item.description }}</span>
      <input 
         style="border: black solid 1px" 
         v-if="item.description==false" 
         @change="onItemChange" 
         v-model="description" 
         type="text" 
         placeholder="사진에 대한 설명을 적어주세요"
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
   name: 'ContentsPhotoItem',
   props: {
     item: Object,
     idx: Number,
  },
   data: () => {
      return {
         description: '',
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
      }
   },
};
</script>
<style scoped>
img {
   position: relative;
   /* width: 190px; */
   height: 150px;
   z-index: 10;
}
</style>
