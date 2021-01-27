<template>
   <div class="text-item-wrapper d-flex justify-center">
      <div class="text" @click="onEdit" v-if="textShow">{{ item.description }}</div>
      <textarea
         cols="12"
         rows="3"
         v-if="fInputShow"
         @keypress.enter="onItemChange"
         @change="onItemChange"
         v-model="description"
         class="decriptionInput"
         maxlength="200"
         placeholder="내용을 적어주세요."
      ></textarea>
      <textarea cols="12" rows="3" v-if="editInput" @keypress.enter="onItemChange" @change="onItemChange" v-model="description" class="decriptionInput" maxlength="200"></textarea>
   </div>
</template>
<script>
export default {
   name: 'ContentsTextItem',
   props: {
      item: Object,
      idx: Number,
   },
   data: function() {
      return {
         description: '',
         textShow: false,
         fInputShow: true,
         editInput: false,
      };
   },
   methods: {
      onItemChange: function() {
         this.$emit('item-change', [this.description, this.idx]);
         this.textShow = true;
         this.fInputShow = false;
         this.editInput = false;
      },
      onEdit: function() {
         this.textShow = false;
         this.editInput = true;
         this.fInputShow = false;
      },
   },
};
</script>
<style>
.decriptionInput {
   padding: 8px;
   box-shadow: 0 4px 4px lightgray;
   resize: none;
   width: 90%;
   font-size: 11px;
}
.text {
   width: 35%;
   max-height: 100px;
   overflow: scroll;
   font-size: 11px;
}
.text::-webkit-scrollbar {
   display: none;
}
</style>
