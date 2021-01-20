<template>
  <div class="container">
      <draggable :list="items" :options="{animation:300}">
        <div 
          v-for="(item, idx) in items"
          :key="idx"
        >
          <ContentsYoutubeItem
            v-if="item.type=='youtube'"
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
          />

          <ContentsTextItem
            v-else
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
          />
        </div>
        
      </draggable>
      <div>
      </div>
      <div class="d-flex footer"> 
        <YoutubeCreate 
          @select-video="onSelectVideo"
        />
        <v-btn @click="createTextItem" color="secondary" dark>텍스트 항목 추가</v-btn>
      </div>
      
   </div>
</template>

<script>
import draggable from 'vuedraggable'
import YoutubeCreate from '../components/contents-create/YoutubeCreate.vue'
import ContentsYoutubeItem from '@/components/contents-create/ContentsYoutubeItem.vue'
import ContentsTextItem from '@/components/contents-create/ContentsTextItem.vue'

export default {
   name: 'ContentsCreate',
   components: {
      draggable,
      YoutubeCreate,
      ContentsYoutubeItem,
      ContentsTextItem
   },
   data: function () {
      return {
        items: [],
      }
   },
   methods: {
      deleteItem: function (index) {
        this.items.splice(index, 1)
      },
      onSelectVideo: function (video) {
        // 새 아이템 생성
        const newItem = {
          type: 'youtube',
          youtube: video,
          photo: '',
          video: '',
          description: '',
        }
        this.items.push(newItem)
      },
      createTextItem: function () {
        const newItem = {
          type: 'text',
          youtube: {},
          photo: {},
          video: '',
          description: '',
        }
        this.items.push(newItem)
      },

      onItemChange: function (itemInfo) {
        this.items[itemInfo[1]].description = itemInfo[0]
      }
   },
}
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
}   
</style>