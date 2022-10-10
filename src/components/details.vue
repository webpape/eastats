<template>
   <q-card class="bg-primary text-white q-pb-xl">
      
      <q-card-section class="bg-grey-9 q-py-lg">
         <q-btn color="grey-7" icon="close" size="md" flat round dense v-close-popup class="absolute" style="top: 8px; right: 8px; z-index: 100000" />
         <q-btn :color="isBlackListed ? 'red' : 'grey-7'" icon="pan_tool" size="md" flat round dense class="absolute" style="top: 8px; left: 8px; z-index: 100000" @click="onToggleBlackList" />
         
         <q-img :src="'https://media.contentapi.ea.com/content/dam/eacom/nhl/pro-clubs/custom-crests/' + theClub.clubInfo.customKit.crestAssetId + '.png'"
                fit="scale-down" height="120px" />
      </q-card-section>
      
      <q-card-section>
         <q-btn fab
                :color="isFavorite ? 'yellow' : 'white'"
                icon="star"
                :text-color="isFavorite ? 'black' : 'grey-7'"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
                @click="onToggleFavorite" />
         
         <div class="row items-center">
            <div class="col-12 text-h6 ellipsis">
               {{ theClub.name }} <q-chip size="md" dense outline color="white">{{ theClub.currentDivision }}</q-chip>
               
            </div>
            <div class="col-12 ellipsis text-grey-4" style="font-weight: 400; font-size: 14px;">
               {{ theClub.wins }} - {{ theClub.losses }} - {{ theClub.otl }}
            </div>
         </div>
      </q-card-section>
      
      <q-card-section class="q-pt-none">
         <template v-if="theDetails">
            <q-markup-table dense separator="horizontal" dark flat bordered square style="background: none">
               <thead>
                  <tr>
                     <th class="text-left"></th>
                     <th class="text-right">Buts</th>
                     <th class="text-right">Passes</th>
                     <th class="text-right">Points</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="member in theDetails.members" :key="member.name" @click="onShowPlayerDetails(member)">
                     <td class="text-left">{{ member.name }}</td>
                     <td class="text-right">{{ member.goals }}</td>
                     <td class="text-right">{{ member.assists }}</td>
                     <td class="text-right">{{ member.points }} PTS</td>
                  </tr>
               </tbody>
            </q-markup-table>
         </template>
      </q-card-section>
      
      <q-card-section class="q-pt-none">
         <div class="text-h6" style="font-size: 18px; font-weight: 400; opacity: 0.6">Derniers matchs</div>
         <div class="text-white">
            <q-list separator dark :padding="false">
               
               <template v-if="theMatchHistory">
                  <q-item v-for="history in theMatchHistory" :key="history.matchId" clickable v-ripple>
                     
                     <q-item-section>
                        <div class="row">
                           <div class="col-12 text-center">
                              <q-img :src="'https://media.contentapi.ea.com/content/dam/eacom/nhl/pro-clubs/custom-crests/' + history.clubs[Object.keys(history.clubs)[0]].details.customKit.crestAssetId + '.png'"
                                     :ratio="1"
                                     spinner-color="primary"
                                     spinner-size="20px"
                                     style="height: 40px; max-width: 40px"
                                     @click="onShowClub(history.clubs[Object.keys(history.clubs)[0]])" />
                           </div>
                           <div class="col-12 text-center" style="text-transform: uppercase; font-size: 11px">{{ history.clubs[Object.keys(history.clubs)[0]].details.name }}</div>
                        </div>
                     </q-item-section>
                     
                     <q-item-section>
                        <div class="row">
                           <div class="col-12">
                              <q-item-label lines="1" class="text-center text-h4">{{ history.clubs[Object.keys(history.clubs)[0]].score }} - {{ history.clubs[Object.keys(history.clubs)[1]].score }}</q-item-label>
                           </div>
                        </div>
                     </q-item-section>
                     
                     <q-item-section>
                        <div class="row">
                           <div class="col-12 text-center">
                              <q-img :src="'https://media.contentapi.ea.com/content/dam/eacom/nhl/pro-clubs/custom-crests/' + history.clubs[Object.keys(history.clubs)[1]].details.customKit.crestAssetId + '.png'"
                                     :ratio="1"
                                     spinner-color="primary"
                                     spinner-size="20px"
                                     style="height: 40px; max-width: 40px"
                                     @click="onShowClub(history.clubs[Object.keys(history.clubs)[1]])" />
                           </div>
                           <div class="col-12 text-center" style="text-transform: uppercase; font-size: 11px">{{ history.clubs[Object.keys(history.clubs)[1]].details.name }}</div>
                        </div>
                     </q-item-section>
                  </q-item>
               </template>
               
            </q-list>
         </div>
      </q-card-section>
      
      <q-btn color="grey=7" icon="keyboard_arrow_down" flat class="full-width fixed q-py-lg" v-close-popup style="bottom:0px; z-index: 10000;" />
      
   </q-card>
   
   <q-dialog v-model="thePlayerStatsDialog" full-width full-height>
      <q-card>
         <q-card-section class="row">
            <div class="text-h5 text-center">{{ thePlayerStats.name }}</div>
         </q-card-section>
         <q-card-section class="row">
            <q-markup-table dense square flat :bordered="false" style="max-width:100%;">
               <tbody>
                  <template v-for="(stats, key, index) in thePlayerStats" :key="index">
                     <tr v-if="key != 'name' && key != 'favoritePosition'">
                        <td class="text-right">{{ key }}</td>
                        <td class="text-left">{{ stats }}</td>
                     </tr>
                  </template>
               </tbody>
            </q-markup-table>
         </q-card-section>
      </q-card>
   </q-dialog>
   
   <q-dialog v-model="theDialogHistory"
             persistent
             :maximized="true"
             transition-show="slide-up"
             transition-hide="slide-down">
      <Details :club="theClubHistory"></Details>
   </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
   name: 'Details',
   props: {
      club: {
         type: Object as PropType<any>,
         required: true
      }
   },
   setup(props) {
      const store = useStore()

      const theDialogHistory = ref(false)
      const theClub: any = ref(props.club)
      const theDetails = ref()
      const theMatchHistory = ref()
      const theClubHistory = ref()

      const thePlayerStatsDialog = ref(false)
      const thePlayerStats = ref()

      const isFavorite = ref(false)
      const isBlackListed = ref(false)

      function onLoad() {
         isFavorite.value = getFavorite(theClub.value.clubId)
         isBlackListed.value = getBlackListed(theClub.value.clubId)

         void fetch('/api/nhl/members/stats?clubId=' + theClub.value.clubId + '&platform=ps4')
            .then((res) => res.json())
            .then((data) => {
               theDetails.value = data
            })
         void fetch('/api/nhl/clubs/matches?matchType=gameType5&clubIds=' + theClub.value.clubId + '&platform=ps4')
            .then((res) => res.json())
            .then((data) => {
               theMatchHistory.value = data
            })
      }

      function onShowPlayerDetails(member: any) {
         thePlayerStats.value = member
         thePlayerStatsDialog.value = true
      }

      function onShowClub(club: any) {
         console.log(club)
         // theClubHistory.value = club
         // theDialogHistory.value = true
      }

      function getFavorite(clubId: number) {
         if (store.getters['favoriteList'][clubId]) return true
         else return false
      }

      function getBlackListed(clubId: number) {
         if (store.getters['blackList'][clubId]) return true
         else return false
      }

      function setFavorite(club: any) {
         let favoriteList: any = {}

         if (store.getters['favoriteList']) {
            favoriteList = Object.assign(favoriteList, store.getters['favoriteList'])
         }

         if (favoriteList[club.clubId]) {
            delete favoriteList[club.clubId]
         } else {
            favoriteList[club.clubId] = club
         }
         store.commit('SET_FAVORITE_LIST', favoriteList)
      }

      function setBlackListed(club: any) {
         let blackList: any = {}

         if (store.getters['favoriteList']) {
            blackList = Object.assign(blackList, store.getters['blackList'])
         }

         if (blackList[club.clubId]) {
            delete blackList[club.clubId]
         } else {
            blackList[club.clubId] = club
         }
         store.commit('SET_BLACK_LIST', blackList)
      }

      function onToggleFavorite() {
         isFavorite.value = !isFavorite.value
         setFavorite(theClub.value)
      }

      function onToggleBlackList() {
         isBlackListed.value = !isBlackListed.value
         setBlackListed(theClub.value)
      }

      onLoad()

      return {
         theClub,
         theDetails,
         theMatchHistory,
         theDialogHistory,
         theClubHistory,

         thePlayerStatsDialog,
         thePlayerStats,

         isFavorite,
         isBlackListed,

         onShowPlayerDetails,
         onShowClub,
         onToggleFavorite,
         onToggleBlackList
      }
   }
})
</script>