<template>
   <div class="container">
      <draggable :list="items" :options="{ animation: 300 }">
         <div class="item-wrapper" v-for="(item, idx) in items" :key="idx">
            <button @click="deleteItem(item.index)">X</button>
            <br />
            Page{{ idx + 1 }}
            <p>
               {{ item.index }}
            </p>
            <div class="else-title">
               <div class="photo" v-if="item.photo != ''">
                  <img :src="item.photo[item.index].preview" />
               </div>
               <div class="link" v-else-if="item.link != ''">
                  유튜브 링크
               </div>
               <div class="text" v-else>
                  사진, 영상 둘다 없음
               </div>
            </div>
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
      <p v-for="(iii, ix) in items" :key="ix" style="color: red">
         {{ iii }}
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

export default {
   name: 'ContentsCreate',
   components: {
      draggable,
   },
   data: function() {
      return {
         items: [
            // {
            //    index: '',
            //    link: '',
            //    photo: {
            //       file: '',
            //       preview: '',
            //    },
            //    video: '',
            //    description: '',
            // },
         ],

         link: '',
         photo: '',
         video: '',
         description: '',
         index: 0,

         files: [], //업로드용 파일
         //  filesPreview: [],
         uploadImageIndex: 0, // 이미지 업로드를 위한 변수
      };
   },
   methods: {
      createItem: function() {
         const newItem = {
            link: this.link,
            photo: this.photo,
            video: this.video,
            description: this.description,
            index: this.index,
         };
         this.items.push(newItem);
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

      // 파일 업로드 기능
      axiosFileUpload: function() {
         console.log('axiosFileUpload : ', this.$refs.files.files);

         // this.files = [...this.files, this.$refs.files.files];
         //하나의 배열로 넣기
         let num = -1;
         for (let i = 0; i < this.$refs.files.files.length; i++) {
            this.files = [
               ...this.files,
               //이미지 업로드
               {
                  //실제 파일
                  file: this.$refs.files.files[i],
                  //이미지 프리뷰
                  preview: URL.createObjectURL(this.$refs.files.files[i]),
                  //삭제및 관리를 위한 number
                  number: i,
               },
            ];
            num = i;
            this.createItemPhoto(this.files);
            console.log(this.files);
         }
         this.uploadImageIndex = num + 1; //이미지 index의 마지막 값 + 1 저장
         console.log('LAST : ', this.files);
         //  console.log('LAST : ', this.filesPreview);
         console.log('LAST : ', this.uploadImageIndex);
      },

      // 사진 업로드 시 items에 넣기
      createItemPhoto: function(p) {
         const newItem = {
            link: this.link,
            photo: p,
            video: this.video,
            description: this.description,
            index: this.index,
         };
         this.items.push(newItem);
         this.description = '';
         this.index = this.index + 1;
      },
   },
   mounted() {},
};
</script>

<style scoped>
.else-title .photo > img {
   position: relative;
   /* width: 190px; */
   height: 100px;
   z-index: 10;
}

.item-wrapper {
   border: 1px solid black;
   width: 100%;
   height: 200px;
   margin-bottom: 10px;
   background-color: aliceblue;
}
</style>
