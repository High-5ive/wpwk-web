<template>
    <div>
        <div class="d-flex justify-content-between">
            <v-icon :disabled="pageNum === 1" @click="prevPage">
            mdi-arrow-left-circle-outline
        </v-icon>
        <Card :card="paginatedData" />
        <v-icon :disabled="pageNum >= this.cards.length" @click="nextPage">
            mdi-arrow-right-circle-outline
        </v-icon>
        </div>
        <span class="page-count">{{ pageNum }} / {{ this.cards.length }} 페이지</span>
        <div class="text-center">
            <v-pagination
                v-model="pageNum"
                :length="this.cards.length"
                circle
            ></v-pagination>
  </div>
        <br>
        {{ this.cards[pageNum - 1] }}
    </div>
</template>

<script>
import Card from './Card'

export default {
    name: 'CardList',
    data: function () {
        return {
            pageNum: 1,
        }
    },
    methods: {
        nextPage () {
            this.pageNum += 1
            },
        prevPage () {
            this.pageNum -= 1
            }
    },
    components: {
        Card,
    },
    props: {
        cards: Array,
    },
    computed: {
        paginatedData () {
            return this.cards[this.pageNum]
        },
    }
}
</script>