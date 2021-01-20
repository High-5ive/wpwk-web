<template>
<div class="container">
  <div>
      <CardList :cards="cards" />
  </div>
</div>
</template>

<script>
import CardList from '@/components/ContentsView/CardList'

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
        CardList
    },
    data: function () {
        return {
            cards: [],
        }
    },
    methods: {
        getCards: function () {
            this.cards = data
        }
    },
    created: function () {
        this.getCards()
    }
}

</script>