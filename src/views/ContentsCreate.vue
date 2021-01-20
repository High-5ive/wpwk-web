<template>
   <div class="container">
      <draggable :list="itemList" :options="{ animation: 300 }">
         <div class="item-wrapper" v-for="(item, idx) in itemList" :key="idx">
            {{ idx }}
            <photo-item :sendPhoto="item"></photo-item>
            <p>
               {{ item.description }}
            </p>
         </div>
      </draggable>
      <br />
      <br />
      <div>
         <input type="text" v-model="description" @keypress.enter="createItem" />
         <input type="button" value="add" @click="createItem" />
      </div>
      <p v-for="(iii, ix) in itemList" :key="ix" style="color: red">
         {{ iii }}
         <br />
         <!-- 추가 : {{ iii.photo.file.name }} -->
      </p>
      <br />
      <br />
      <div class="footer">
         <v-btn tile color="success">
            <v-icon left>
               mdi-youtube
            </v-icon>
            유튜브 검색
         </v-btn>
         <br /><br />
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
import draggable from 'vuedraggable';
import PhotoItem from '@/components/contents-create/PhotoItem.vue';

export default {
   name: 'ContentsCreate',
   components: {
      draggable,
      PhotoItem,
   },
   data: function() {
      return {
         itemList: [
            // {
            //    index: '',
            //    youtube: {},
            //    photo: {
            //       file: '',
            //       preview: '',
            //    },
            //    video: '',
            //    description: '',
            // },
         ],

         youtube: '',
         photo: '',
         video: '',
         description: '',
         index: 0,
      };
   },
   methods: {
      createItem: function() {
         const newItem = {
            youtube: this.youtube,
            photo: this.photo,
            video: this.video,
            description: this.description,
            index: this.index,
         };
         this.itemList.push(newItem);
         this.description = '';
         this.index = this.index + 1;
      },
      deleteItem: function(index) {
         console.log(index);
      },

      // 사진 버튼 클릭 시 -> 파일 선택 창 호출
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
            youtube: this.youtube,
            photo: p,
            video: this.video,
            description: this.description,
            index: this.index,
         };
         this.itemList.push(newItem);
         this.description = '';
         this.index = this.index + 1;
      },
   },
   mounted() {},
};
</script>

<style scoped>
.item-wrapper {
   border: 1px solid black;
   width: 100%;
   height: 300px;
   margin-bottom: 10px;
   background-color: aliceblue;
}
</style>
