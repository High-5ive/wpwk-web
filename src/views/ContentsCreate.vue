<template>
  <div class="container">
      <draggable :list="itemList" :options="{animation:300}">
        <div 
          v-for="(item, idx) in itemList"
          :key="idx"
        >
          <contents-youtube-item
            v-if="item.type=='youtube'"
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
          />

          <contents-photo-item 
            v-else-if="item.type=='photo'"
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
          />

          <contents-text-item
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
        <v-btn tile color="success" @click="axiosFileSelect">
            <v-icon left>
               mdi-image-multiple
            </v-icon>
            사진 추가
         </v-btn>
         <input type="file" id="fileUpload" ref="files" style="display:none" @change="axiosFileChange" multiple />
      </div>
      
   </div>
</template>

<script>
import draggable from 'vuedraggable'
import YoutubeCreate from '../components/contents-create/YoutubeCreate.vue'
import ContentsYoutubeItem from '@/components/contents-create/ContentsYoutubeItem.vue'
import ContentsTextItem from '@/components/contents-create/ContentsTextItem.vue'
import ContentsPhotoItem from '@/components/contents-create/ContentsPhotoItem.vue';

export default {
   name: 'ContentsCreate',
   components: {
      draggable,
      YoutubeCreate,
      ContentsYoutubeItem,
      ContentsTextItem,
      ContentsPhotoItem,
   },
   data: function() {
      return {
        itemList: [],
      }
   },
   methods: {
     axiosFileSelect: function() {
         var elem = document.getElementById('fileUpload');
         elem.click();
      },

      axiosFileChange: function() {
         this.axiosFileUpload();
      },

      // 파일 업로드 기능 + 업로드 되자마자 item 만들기
      axiosFileUpload: function() {
         console.log('axiosFileUpload : ', this.$refs.files.files);

         // this.files = [...this.files, this.$refs.files.files];
         //하나의 배열로 넣기
         for (let i = 0; i < this.$refs.files.files.length; i++) {
            console.log(i + '번 째 -> ' + this.$refs.files.files[i].name);
            const photoFile = {
               //실제 파일
               file: this.$refs.files.files[i],
               //이미지 프리뷰
               preview: URL.createObjectURL(this.$refs.files.files[i]),
            };
            // num = i;
            this.createItemPhoto(photoFile);
         }
      },

      // 사진 업로드 시 itemList에 넣기
      createItemPhoto: function(p) {
         const newItem = {
            type: 'photo',
            youtube: {},
            photo: p,
            video: '',
            description: '',
         };
         this.itemList.push(newItem);
      },

      deleteItem: function (index) {
        this.itemList.splice(index, 1)
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
        this.itemList.push(newItem)
      },
      createTextItem: function () {
        const newItem = {
          type: 'text',
          youtube: {},
          photo: {},
          video: '',
          description: '',
        }
        this.itemList.push(newItem)
      },

      onItemChange: function (itemInfo) {
        this.itemList[itemInfo[1]].description = itemInfo[0]
      }
   },
}
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
}
.item-wrapper {
   border: 1px solid black;
   width: 100%;
   height: 300px;
   margin-bottom: 10px;
   background-color: aliceblue;
}   
</style>
