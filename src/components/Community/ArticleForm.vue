<template>
   <div class="af-container">
      <div class="category-wrapper">
         <v-select model="subject" :items="subjects" dense outlined label="주제" @change="getSubject"></v-select>
      </div>

      <div class="input-wrapper">
         <input type="text" v-model="content" placeholder="글을 작성해주세요." />
      </div>

      <!-- 이미지 추가 -->
      <div class="add-img-btn nf" @click="axiosFileSelect"><v-icon> mdi-image-multiple </v-icon> 사진 추가</div>
      <input type="file" id="fileUpload" ref="files" style="display:none" @change="axiosFileChange" multiple />

      <div class="photo-wrapper">
         <div class="photo-item" v-for="(item, idx) in itemList" :key="idx">
            <ArticlePhotoItem :item="item" :idx="idx" @deleteItem="deleteItem" />
            <button @click="deleteItem(idx)">
               <v-icon>mdi-trash-can</v-icon>
            </button>
         </div>
      </div>

      <div class="af-footer">
         <div class="left-button" @click="closeModal"><v-icon>mdi-close</v-icon></div>
         <div class="middle-button" @click="reset"><v-icon>mdi-eraser</v-icon></div>
         <div class="right-button" @click="createArticle">글 작성</div>
      </div>
   </div>
</template>

<script>
import moment from 'moment';
import ArticlePhotoItem from './ArticlePhotoItem';

export default {
   name: 'ArticleForm',
   data: function() {
      return {
         user: '',
         subject: '',
         itemList: [],
         content: '',
         subjects: ['동네맛집', '동네카페', '아이교육/학원', '살림/청소/정리'],
         subject_final: '',
      };
   },
   components: {
      ArticlePhotoItem,
   },
   methods: {
      axiosFileSelect: function() {
         var elem = document.getElementById('fileUpload');
         elem.click();
      },
      axiosFileChange: function() {
         this.axiosFileUpload();
      },
      axiosFileUpload: function() {
         //   console.log(this.$refs.files.files[0]);

         //  this.files = [...this.files, this.$refs.files.files];
         //  하나의 배열로 넣기
         for (let i = 0; i < this.$refs.files.files.length; i++) {
            // console.log(i + '번 째 -> ' + this.$refs.files.files[i].name);
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
      createItemPhoto: function(p) {
         const newItem = {
            photo: p,
         };
         if (this.itemList.length <= 9) {
            this.itemList.push(newItem);
         } else {
            alert('항목은 최대 10개 까지 넣을 수 있습니다.');
         }
      },
      deleteItem: function(index) {
         this.itemList.splice(index, 1);
      },
      getSubject: function() {
         this.subject_final = this.subject;
      },

      //부모에게 모달 닫으라고 전달
      closeModal() {
         this.$emit('emit-close', false);
      },

      //입력 폼 초기화
      reset() {
         this.content = '';
         this.itemList = [];
         this.subject = ''; //초기화 시 v-select도 초기화되어야 하는데 미동작
      },

      createArticle: function() {
         // 임의의 사용자 이름 설정
         const username = '수진맘';
         const now = moment().format('YYYY-MM-DD HH:mm:ss');

         const article = {
            user: username,
            subject: this.subject_final,
            itemList: this.itemList,
            content: this.content,
            created_at: now,
            likes: 0,
            comments: 0,
         };

         this.$emit('createArticle', article);
         this.content = '';
         this.itemList = [];
      },
   },
};
</script>

<style lang="scss" scoped>
//v-select 했을 때, 세부 선택 박스 하단으로 붙이기
.v-list.v-select-list.v-sheet.theme--light {
   margin-top: 40px;
}

.af-container {
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   // background-color: lightblue;

   .category-wrapper {
      height: 40px; //v-select의 높이 조절
      width: 90% !important;

      .v-input {
         // background-color: red;
         padding: 0px 40px;
         // margin-bottom: 0px !important;
      }
   }

   .input-wrapper {
      // background-color: red;
      min-height: 100px;
      height: 50%;
      width: 80%;
      margin: 20px;
      padding: 20px;
      border: 1px solid rgb(165, 165, 165);
      border-radius: 20px;

      input {
         // background-color: blue;
         width: 100%;
         height: 100%;
         text-align: center;

         font-family: 'Poor Story';
         font-size: 14pt;

         &:focus {
            outline: none;
         }
      }
   }

   .add-img-btn {
      display: inline;
      background-color: white;
      padding: 15px;
      border-radius: 30px;
      box-shadow: 0px 9px 20px 0px #56565629;
   }

   .photo-wrapper {
      width: 100%;
      height: 100%;
      padding: 20px;
      margin-top: 20px;

      white-space: nowrap;
      overflow-x: scroll;

      .photo-item {
         display: inline-block;
         // transform: rotate(-1deg);
         border: 1px solid rgb(223, 223, 223);
         box-shadow: 0px 9px 20px 0px #56565629;

         margin-right: 10px;

         //사진을 감싸고 있는 녀석
         width: 200px;
         height: 200px;
         padding: 10px 10px 30px 10px;

         //삭제 버튼
         button {
            margin-top: 5px;
            margin-right: 2px;
            float: right;

            &:focus {
               outline: none;
            }
         }
      }
   }

   // 최하단 좌우 이동 버튼
   .af-footer {
      // display: flex;
      // flex-direction: column;
      position: fixed;
      z-index: 100;
      left: 50%;
      bottom: -75px;
      transform: translateX(-50%);
      margin-bottom: 25px;
      //    background-color: white;

      height: 100px;
      width: 100%;
      // margin-top: 20px;
      display: flex;

      .left-button {
         height: 50px;
         background-color: #f4b840fa;
         width: 20%;
         padding-top: 12px;
         text-align: center;

         &:hover {
            background-color: #ca9834;
         }
      }

      .middle-button {
         height: 50px;
         background-color: #f4b740;
         width: 20%;
         padding-top: 12px;
         text-align: center;

         &:hover {
            background-color: #ca9834;
         }
      }

      .right-button {
         background-color: #a2d646;
         padding-top: 12px;
         width: 60%;
         text-align: center;

         &:hover {
            background-color: #8dbb3e;
         }
      }
   }
}
</style>
