<template>
    <div>
        <div class="d-flex justify-content-between">
            <div>
                <v-icon :disabled="pageNum === 1" @click="prevPage">
                    mdi-arrow-left-circle-outline
                </v-icon>
            </div>
            <Card :card="card" :pageNum="pageNum"/>
            <div v-if="pageNum === this.cards.length">
                <v-icon @click="evaluationValue" x-large>
                    mdi-send
                </v-icon>
            </div>
            <div v-else>
                <v-icon :disabled="pageNum >= this.cards.length" @click="nextPage">
                    mdi-arrow-right-circle-outline
                </v-icon>
            </div>
        </div>

        <span class="page-count">{{ pageNum }} / {{ this.cards.length }} 페이지</span>
        <div class="text-center">
            <v-pagination
                v-model="pageNum"
                :length="this.cards.length"
                circle>
            </v-pagination>
        </div>
    </div>
</template>

<script>
import Card from './Card'

export default {
    name: 'CardList',
    data: function () {
        return {
            pageNum: 1,
            evaluation: false,
            card: {}
        }
    },
    methods: {
        nextPage () {
            this.pageNum += 1
            },
        prevPage () {
            this.pageNum -= 1
            },
        evaluationValue () {
            this.evaluation = true
            this.$emit('evaluationPage', this.evaluation)
        },
        getCard() {
            this.card = this.cards[this.pageNum - 1]
        }
    },
    components: {
        Card,
    },
    props: {
        cards: Array,
    },
    created: function () {
        this.getCard()
    },
    watch: {
        pageNum: function () {
            this.getCard()
        }
    }
}
</script>