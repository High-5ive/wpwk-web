<template>
    <div>
        <p> {{ subject }} </p>
        <v-card class="mx-auto" max-width="400">
            <v-card-subtitle class="pb-0">
                {{ user }}
            </v-card-subtitle>
            
            <div v-if="this.itemList.length">
                <div v-for="(item, idx) in itemList" :key="idx">
                    <ArticleDetailPhoto :item="item" :idx="idx" class="photo"/>
                </div>
            </div>

            <v-card-text class="text--primary">
                <div> {{ content }} </div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="orange" text @click="like"> 좋아요 </v-btn>
                <v-btn color="orange" text> 댓글 </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import ArticleDetailPhoto from '@/components/Community/ArticleDetailPhoto'

export default {
    name: 'ArticleDetail',
    props: {
        // article의 모든 값 받아오기(추후에는 articleId값만 받아오면 됨)
        // articleId: Number,
        article: Object
    },
    components: {
        ArticleDetailPhoto
    },
    data: function () {
        return {
            user: '',
            subject: '',
            itemList: [],
            content: ''
        }
    },
    methods: {
        getArticle: function () {
            this.user = this.$route.params.article.user
            this.subject = this.$route.params.article.subject
            this.content = this.$route.params.article.content
            if(this.$route.params.article.itemList.length) {
                for(var i=0; i<this.$route.params.article.itemList.length; i++) {
                    this.itemList.push(this.$route.params.article.itemList[i])
                }
            }
        },
        like: function () {

        }
    },
    created: function () {
        this.getArticle()
    }
}
</script>

<style scoped>
</style>