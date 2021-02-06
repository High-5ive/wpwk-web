<template>
  <div class="d-flex align-items-center justify-content-center mt-5 font">
    <div>
      <v-select
        v-model="subject"
        :items="subjects"
        dense
        outlined
        hide-details
        class="ma-2"
        label="subject"
        @change ="getSubject"
      ></v-select>
      <div v-for="(item, idx) in itemList" :key="idx">
        <ArticlePhotoItem :item="item" :idx="idx" @deleteItem="deleteItem" class="photo"/>
        <button @click="deleteItem(idx)">
          <v-icon>mdi-trash-can</v-icon>
        </button>
      </div>
    </div>

    <input class="form-control input" type="text" v-model="content" placeholder="글을 작성해주세요.">

    <!-- 이미지 추가 -->
    <v-icon @click="axiosFileSelect"> mdi-image-multiple </v-icon>
    <input type="file" id="fileUpload" ref="files" style="display:none" @change="axiosFileChange" multiple />

    <button @click="createArticle" class="btn btn-primary ml-3">글 등록</button>
  </div>
</template>

<script>
import moment from 'moment'
import ArticlePhotoItem from './ArticlePhotoItem'

export default {
  name: 'ArticleForm',
  data: function () {
    return {
      user: '',
      subject: '',
      itemList: [],
      content: '',
      subjects: ['동네맛집', '동네카페', '아이교육/학원', '살림/청소/정리'],
      subject_final: '',
    }
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
           photo: p
         }
         if (this.itemList.length <= 9) {
            this.itemList.push(newItem);
         } else {
            alert('항목은 최대 10개 까지 넣을 수 있습니다.');
         }
      },
    deleteItem: function(index) {
      this.itemList.splice(index, 1);
      },
    getSubject: function () {
      this.subject_final = this.subject
    },
    createArticle: function () {
        // 임의의 사용자 이름 설정
        const username = "수진맘"
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        const article = {
          user: username,
          subject: this.subject_final,
          itemList: this.itemList,
          content: this.content,
          created_at: now,
          likeList: [],
          comments: []
        }
        this.$emit('createArticle', article)
        this.content = ''
        this.itemList = []
    },
  }
}
</script>

<style scoped>
.photo {
  border: 1px solid gray
}
</style>