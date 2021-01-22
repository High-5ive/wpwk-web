<template>
<div class="container">
  <div v-if="evaluationValue">
    <v-icon @click="back">
        mdi-backup-restore
    </v-icon>
    <Evaluations />
  </div>
  <div v-else>
    <CardList :cards="cards" @evaluationPage="evaluation" />
  </div>  
  <br>
  
  <!-- 댓글창 전체 모달 -->
  <div>
    <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="success" dark v-bind="attrs" v-on="on"> mdi-comment-text-multiple-outline </v-icon>
      </template>

      <v-card>
        <v-toolbar dark color="success">
        <!-- 닫기 버튼 -->
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>댓글</v-toolbar-title>
        </v-toolbar>

        <CommentList :comments="this.comments" @deleteComment="deleteComment" />
        <CommentForm @createComment="createComment" />

      </v-card>
    </v-dialog>
    </v-row>
  </div>
</div>
</template>

<script>
import CardList from '@/components/ContentsView/CardList'
import Evaluations from '@/components/ContentsView/Evaluations'
import CommentList from '@/components/ContentsView/CommentList'
import CommentForm from '@/components/ContentsView/CommentForm'

// img, description은 제공받는 데이터에서 가져옴(임의의 값 설정)
const data = [
    {img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    description: 'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.'},
    {img: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    description: 'an intimate setting with 12 indoor seats plus patio seating.'},
    ]

export default {
    name: 'ContentsView',
    components: {
        CardList,
        Evaluations,
        CommentList,
        CommentForm
    },
    data: function () {
        return {
            cards: [],
            evaluationValue: false,
            dialog: false,
            comments: [],
        }
    },
    methods: {
        //card, comment 임의의 값 입력
        getCards: function () {
            this.cards = data
        },
        evaluation(value) {
            this.evaluationValue = value
        },
        back: function () {
            this.evaluationValue = false
            this.$router.go(this.$router.currentRoute)
        },
        deleteComment: function (comment) {
            const deleteId = this.comments.indexOf(comment)
            this.comments.splice(deleteId, 1)
        },
        createComment: function (comment) { 
            this.comments.push(comment)
        },
    },
    created: function () {
        this.getCards()
    }
}

</script>