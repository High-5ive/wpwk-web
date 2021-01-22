<template>
  <div>
    <!-- 노리 제작 헤더 -->
    <v-app-bar
      dense
    > 
      <v-icon @click="createCancel">mdi-close</v-icon>
      <span class="display-1">노리 만들기</span>
      <guideline />
      <category-and-time-info :title="title" :itemList="itemList"/>
    </v-app-bar>
    <div class="container">
      <v-text-field
        v-model="title"
        label="제목"
        hint="ex) [11세]집에서 할 수 있는 신체활동"
        outlined
      ></v-text-field>
      <!-- 노리의 항목들 -->
      <draggable :list="itemList" :options="{animation:300}">
        <div 
          v-for="(item, idx) in itemList"
          :key="idx"
        >
          <!-- 노리의 유튜브 항목 -->
          <contents-youtube-item
            v-if="item.type=='youtube'"
            :item="item"
            :idx="idx"
            
            @delete-item="deleteItem"
            @item-change="onItemChange"
          />
          <!-- 노리의 사진항목 -->
          <contents-photo-item 
            v-else-if="item.type=='photo'"
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
          />
          <!-- 노리의 텍스트 항목 -->
          <contents-text-item
            v-else
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
          />
        </div>
        
      </draggable>
      <!-- 항목 추가 위한 버튼들 -->
      <div class="d-flex footer">
        <YoutubeCreate
          :isAdded="youtubeAdded" 
          @select-video="onSelectVideo"
        />
        <v-btn @click="createTextItem" color="secondary" dark>
          <v-icon>mdi-note-text-outline</v-icon>
        </v-btn>
        <v-btn tile color="success" @click="axiosFileSelect">
            <v-icon left>
                mdi-image-multiple
            </v-icon>
        </v-btn>
        <input type="file" id="fileUpload" ref="files" style="display:none" @change="axiosFileChange" multiple />
      </div>
        
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import YoutubeCreate from '../components/contents-create/YoutubeCreate.vue'
import ContentsYoutubeItem from '@/components/contents-create/ContentsYoutubeItem.vue'
import ContentsTextItem from '@/components/contents-create/ContentsTextItem.vue'
import ContentsPhotoItem from '@/components/contents-create/ContentsPhotoItem.vue'
import Guideline from '../components/contents-create/Guideline.vue'
import CategoryAndTimeInfo from '../components/contents-create/CategoryAndTimeInfo.vue'

export default {
   name: 'ContentsCreate',
   components: {
      draggable,
      YoutubeCreate,
      ContentsYoutubeItem,
      ContentsTextItem,
      ContentsPhotoItem,
      Guideline,
      CategoryAndTimeInfo,
   },
   data: function () {
      return {
        title: '',
        itemList: [],
        youtubeAdded: false,
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
        if (this.itemList.length <= 9) {
          this.itemList.push(newItem);
        } else {
          alert('항목은 최대 10개 까지 넣을 수 있습니다.')
        }
      },
      // 항목 삭제
      deleteItem: function (index) {
        if (this.itemList[index].type=='youtube') {
          this.youtubeAdded = false
          this.itemList.splice(index, 1)
        }
        this.itemList.splice(index, 1)
      },
      // 유튜브 추가
      onSelectVideo: function (video) {
        // 새 아이템 생성
        const newItem = {
          type: 'youtube',
          youtube: video,
          photo: {},
          video: '',
          description: '',
        }
        if (this.itemList.length <= 9) {
          this.itemList.push(newItem);
          this.youtubeAdded = true
        } else {
          alert('항목은 최대 10개 까지 넣을 수 있습니다.')
        }
      },
      // 텍스트 추가
      createTextItem: function () {
        const newItem = {
          type: 'text',
          youtube: {},
          photo: {},
          video: '',
          description: '',
        }
        if (this.itemList.length <= 9) {
          this.itemList.push(newItem);
        } else {
          alert('항목은 최대 10개 까지 넣을 수 있습니다.')
        }
      },
      // 유튜브나 사진 설명 및 텍스트 내용 바뀌면 적용
      onItemChange: function (itemInfo) {
        this.itemList[itemInfo[1]].description = itemInfo[0]
      },
      createCancel: function () {
        this.$router.push({ name: 'Main'})
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
