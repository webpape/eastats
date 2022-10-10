<template>
   <q-page>
      <div class="row q-mt-md">
         <div class="col">
            <SearchResult :clubs="theFavoriteClubs" @item-click="onItemClick" />
         </div>
      </div>
      <q-dialog v-model="theDialog"
                persistent
                :maximized="true"
                transition-show="slide-up"
                transition-hide="slide-down">
         <Details :club="theClub"></Details>
      </q-dialog>
   </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

import SearchResult from 'components/search-result.vue'
import Details from 'components/details.vue'

export default defineComponent({
   name: 'FavoriteList',
   components: {
      SearchResult,
      Details
   },
   setup() {
      const store = useStore()

      const theFavoriteClubs = computed(() => {
         return store.getters.favoriteList
      })

      const theLoading = ref(false)
      const theDialog = ref(false)
      const theClub = ref()

      function onItemClick(club: any) {
         theClub.value = club
         theDialog.value = true
      }

      return {
         theLoading,
         theDialog,
         theFavoriteClubs,
         theClub,

         onItemClick
      }
   }
})
</script>