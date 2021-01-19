<template>
  <div class="container">
      <draggable :list="items" :options="{animation:300}">
        <div
          v-for="(item, idx) in items"
          :key="idx"
        >
				Page{{ idx + 1 }} - {{ item }}
        <button @click="deleteItem(item.index)">X</button>
				</div>
      </draggable>

      <div>
         <input type="text" v-model="description" @keypress.enter="createItem">
         <input type="button" value="add" @click="createItem">
      </div>
   </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
   name: 'ContentsCreate',
   components: {
			draggable
   },
   data: function () {
      return {
        items: [],
        link: '',
        photo: '',
        video: '',
        description: '',
        index: 0,
      }
   },
   methods: {
      createItem: function () {
        const newItem = {
          link: this.link,
          photo: this.photo,
          video: this.video,
          description: this.description,
          index: this.index
        }
        this.items.push(newItem)
        this.description = ''
        this.index = this.index + 1
      },
      deleteItem: function (index) {
        console.log(index)
      }
   },
   mounted() {}
}
</script>

<style scoped>
   
</style>