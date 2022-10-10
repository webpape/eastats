<template>
   <q-list separator>
      <q-item v-for="club in clubs" :key="club.clubId" clickable v-ripple @click="onClick(club)">
         <q-item-section avatar>
            <q-img :src="'https://media.contentapi.ea.com/content/dam/eacom/nhl/pro-clubs/custom-crests/'+club.clubInfo.customKit.crestAssetId+'.png'"
                   :ratio="1"
                   spinner-color="primary"
                   spinner-size="20px" />
         </q-item-section>
         <q-item-section>
            <q-item-label lines="1">{{ club.name }}</q-item-label>
            <q-item-label caption>{{ club.wins }} - {{ club.losses }} - {{ club.otl }}</q-item-label>
         </q-item-section>
      </q-item>
      
   </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
   name: 'SearchResult',
   props: {
      clubs: {
         type: Object as PropType<any>,
         required: true
      }
   },
   emits: ['item-click'],
   setup(props, { emit }) {
      function onClick(club: any) {
         emit('item-click', club)
      }

      return {
         onClick
      }
   }
})
</script>