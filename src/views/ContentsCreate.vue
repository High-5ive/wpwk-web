<template>
  <div >
    <!-- 노리 제작 헤더 -->
    <div
      dense
      class="d-flex justify-space-between align-center contentHeader"
    > 
      <v-icon 
        @click="createCancel"
      >mdi-close</v-icon>
      <span style="font-size: 150%">노리 만들기</span>
      <div 
        class="d-flex align-center"
        style="margin-right: 10px"
      >
        <guideline 
          style="margin-right: 10px"
        />
        <category-and-time-info :title="title" :itemList="itemList"/>
      </div>
    </div>
    <div class="container">
      <v-text-field
        v-model="title"
        label="제목"
        hint="ex) [11세]집에서 할 수 있는 축구게임"
        outlined
        style="margin-top: 25px;"
      ></v-text-field>
      <v-divider></v-divider>
      <!-- 노리의 항목들 -->
      <draggable 
        :list="itemList" 
        :options="{animation:300, handle:'.handle'}"
      >
        <div 
          v-for="(item, idx) in itemList"
          :key="idx"
          class="item-wrapper d-flex align-center justify-space-between"
          
        >
          <!-- 노리의 유튜브 항목 -->
          <div class="d-flex align-center">
            <span class="handle">
              <v-icon>
                mdi-menu
              </v-icon>
            </span>
            <p style="font-size: 12px; margin-top: 15px; color:gray;">PAGE {{ idx + 1 }}</p>            
          </div>
          
          <contents-youtube-item
            v-if="item.type=='youtube'"
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
            style="width: 70%;"
          />
          <!-- 노리의 사진항목 -->
          <contents-photo-item 
            v-else-if="item.type=='photo'"
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
            style="width: 70%;"
          />
          <!-- 노리의 텍스트 항목 -->
          <contents-text-item
            v-else
            :item="item"
            :idx="idx"
            @delete-item="deleteItem"
            @item-change="onItemChange"
            style="width: 70%;"
          />
          <button 
            @click="deleteItem(idx)"
            style="margin-top: 0"
          >
          <v-icon>mdi-trash-can</v-icon>
          </button>
        </div>
        
      </draggable>
      <!-- 항목 추가 위한 버튼들 -->
      <div class="d-flex footer align-center">
        <YoutubeCreate
          :isAdded="youtubeAdded" 
          @select-video="onSelectVideo"
          class="footerButtons"
        />
        <v-icon 
          @click="axiosFileSelect"
          class="footerButtons"
        >
            mdi-image-multiple
        </v-icon>
        <v-icon 
          @click="createTextItem"
          class="footerButtons"
        >mdi-note-text-outline</v-icon>        
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
        uploadPercentage: 0,
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
        //  console.log('axiosFileUpload : ', this.$refs.files.files);

         // this.files = [...this.files, this.$refs.files.files];
         //하나의 배열로 넣기
         for (let i = 0; i < this.$refs.files.files.length; i++) {
            // console.log(i + '번 째 -> ' + this.$refs.files.files[i].name);
            const photoFile = {
               //실제 파일
               file: this.$refs.files.files[i],
               //이미지 프리뷰
               preview: URL.createObjectURL(this.$refs.files.files[i]),
               
            };
            // num = i;
            this.uploadPercentage = parseInt( Math.round((ProgressEvent.loded / ProgressEvent.total) * 100))
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
.contentHeader {
  padding: 5px;
  box-shadow: 0 3px 5px lightgray;
  background-color: #F2F1F2;
  margin-top: 10px; 
}
.footer {
  position: absolute;
  bottom: 10px;
}
.footerButtons {
  margin-left: 20px;
  margin-right: 20px;
}
.item-wrapper {
   border: 1px solid gray;
   width: 100%;
   height: 150px;
   padding: 20px;
   margin-top: 15px;
   margin-bottom: 15px;
   border-radius: 3px;
   box-shadow: 0 4px 4px lightgray;
}
.sortable-chosen {
  opacity: 0.7;
  background-color:#dcdcdc;
}

.sortable-ghost {
  background-color:#dcdcdc;
}   
</style>
