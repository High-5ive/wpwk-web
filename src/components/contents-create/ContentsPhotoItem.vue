<template lang="">
   <div class="d-flex align-center justify-space-around">
      <img :src="item.photo.preview" />
      <span class="text" @click="onEdit" v-if="textShow">{{ item.description }}</span>
      <textarea 
         cols="12" 
         rows="3"
         v-if="fInputShow"
         @keypress.enter="onItemChange"
         @change="onItemChange"
         v-model="description"
         class="decriptionInput"
         maxlength="200"
         placeholder="사진에 대한 설명을 적어주세요"
      ></textarea>
      <textarea 
         cols="12" 
         rows="3"
         v-if="editInput"
         @keypress.enter="onItemChange" 
         @change="onItemChange"
         v-model="description"
         class="decriptionInput"
         maxlength="200"
      ></textarea>
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
         textShow: false,
         fInputShow: true,
         editInput: false
      }
   },
   methods: {
      onItemChange: function () {
         this.$emit('item-change', [this.description, this.idx])
         this.textShow = true
         this.fInputShow = false
         this.editInput = false
      },
      onEdit: function () {
         this.textShow = false
         this.fInputShow = false
         this.editInput = true
      }
   },
};
</script>
<style scoped>
img {
   width: 40%;
   height: 40%; 
}
.decriptionInput {
  padding: 8px;
  box-shadow: 0 4px 4px lightgray;
  resize: none;
  width: 35%;
  font-size: 11px;
}
.text {
  width: 35%;
  max-height: 100px;
  overflow: scroll;
  font-size: 11px;
}
.text::-webkit-scrollbar {
  display: none
}
</style>
