<template lang="">
   <div class="eb-wrapper">
      {{ evaluationCal }}
      <div class="btn-group">
         <v-btn outlined rounded @click='eval1' :class="{'selected': ev1}"><span>&#128277;</span>층간 소음이 없어요</v-btn>
         <v-btn outlined rounded @click='eval2' :class="{'selected': ev2}"><span>&#128118;</span>아이가 너무 좋아해요</v-btn>
         <v-btn outlined rounded @click='eval3' :class="{'selected': ev3}"><span>&#128558;</span>유익한 내용이에요</v-btn>
         <v-btn outlined rounded @click='eval4' :class="{'selected': ev4}"><span>&#128176;</span>재료 준비하기 쉬워요</v-btn>
         <v-btn outlined rounded @click='eval5' :class="{'selected': ev5}"><span>&#128525;</span>관련된걸 더 하자고 해요</v-btn>
         <v-btn outlined rounded @click='eval6' :class="{'selected': ev6}"><span>&#127960;</span>어디서든 할 수 있어요</v-btn>
         <v-btn outlined rounded @click='eval7' :class="{'selected': ev7}"><span>&#128079;</span>아이의 호기심이 해결됐어요</v-btn>
         <v-btn outlined rounded @click='eval8' :class="{'selected': ev8}"><span>&#127891;</span>교육적이에요!</v-btn>
         <v-btn outlined rounded @click='eval9' :class="{'selected': ev9}"><span>&#128378;</span>아이가 한참 놀아도 안질려해요</v-btn>
      </div>
      <v-btn outlined rounded @click="evaluation">제출하기</v-btn>
   </div>
</template>
<script>
export default {
   name: "EvalButtons",
   data: function () {
      return {
         ev1: false,
         ev2: false,
         ev3: false,
         ev4: false,
         ev5: false,
         ev6: false,
         ev7: false,
         ev8: false,
         ev9: false,
         fun: 0,
         access: 0,
         education: 0,
         evaluationCal: {}
      }
   },
   methods: {
      eval1: function () {
         this.ev1 = !this.ev1
      },
      eval2: function () {
         this.ev2 = !this.ev2
      },
      eval3: function () {
         this.ev3 = !this.ev3
      },
      eval4: function () {
         this.ev4 = !this.ev4
      },
      eval5: function () {
         this.ev5 = !this.ev5
      },
      eval6: function () {
         this.ev6 = !this.ev6
      },
      eval7: function () {
         this.ev7 = !this.ev7
      },
      eval8: function () {
         this.ev8 = !this.ev8
      },
      eval9: function () {
         this.ev9 = !this.ev9
      },
      evaluation: function () {
         this.fun = this.ev2 + this.ev5 + this.ev9
         this.access = this.ev1 + this.ev4 + this.ev6
         this.education = this.ev3 + this.ev7 + this.ev8
         const evaluation = {
            fun: this.fun,
            access: this.access,
            education: this.education
         }
         this.evaluationCal = evaluation
      }
   }
};
</script>
<style lang="scss">
.selected {
   border: #a2d646 5px solid;
}
</style>
