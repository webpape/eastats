<template>
   <q-page>
      <div class="row items-center q-mt-lg">
         <div class="col">
            <q-input outlined v-model="theSearch" type="text" label="Recherche" class="q-mx-xl"
                     :loading="theLoading" clearable :debounce="500" />
         </div>
      </div>
      <div class="row q-mt-md">
         <div class="col">
            <SearchResult :clubs="theClubs" @item-click="onItemClick" />
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
import { defineComponent, WritableComputedRef, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'

import SearchResult from 'components/search-result.vue'
import Details from 'components/details.vue'

import { url } from 'boot/axios'

export default defineComponent({
   name: 'Search',
   components: {
      SearchResult,
      Details
   },
   setup() {
      const store = useStore()

      const theLoading = ref(false)
      const theClub = ref()
      const theDialog = ref(false)

      const theSearch: WritableComputedRef<string> = computed({
         get(): string {
            return store.getters['search']
         },
         set(value: string): void {
            store.commit('SET_SEARCH', value)
         }
      })

      const theClubs: WritableComputedRef<string> = computed({
         get(): string {
            return store.getters['searchList']
         },
         set(value: string): void {
            store.commit('SET_SEARCH_LIST', value)
         }
      })

      function onSearch() {
         theLoading.value = true

         void fetch(url + '/api/nhl/clubs/search?clubName=' + theSearch.value + '&platform=ps4', {
            headers: {
               'Access-Control-Allow-Credentials': 'true'
            },
            credentials: 'include',
            mode: 'cors'
         })
            .then((res) => res.json())
            .then((data) => {
               // Object.assign(clubs.value, data)
               store.commit('SET_SEARCH_LIST', data)
               theLoading.value = false
            })
            .catch((err) => {
               console.log(err)
            })
            .finally(() => {
               theLoading.value = false
            })
      }

      function onItemClick(club: any) {
         theClub.value = club
         theDialog.value = true
      }

      watch(
         () => theSearch.value,
         () => {
            if (theSearch.value != '' || theSearch.value != null) {
               onSearch()
            }
         }
      )

      return {
         theSearch,
         theLoading,
         theDialog,
         theClubs,
         theClub,

         onSearch,
         onItemClick
      }
   }
})
</script>