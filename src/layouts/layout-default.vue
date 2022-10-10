<template>
   <q-layout view="hHh lpR fFf">
      
      <q-header elevated class="bg-primary text-white" height-hint="98">
         <q-toolbar>
            <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
            
            <q-toolbar-title>EA Stats</q-toolbar-title>
         </q-toolbar>
      </q-header>
      
      <q-drawer v-model="leftDrawerOpen" side="left" bordered>
         <!-- drawer content -->
      </q-drawer>
      
      <q-page-container>
         <router-view v-slot="{ Component }">
            <transition enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                        appear
                        :duration="300">
               <component :is="Component" />
            </transition>
         </router-view>
      </q-page-container>
      
      <q-footer elevated class="bg-primary text-white">
         <q-tabs align="left" keep-alive>
            <q-route-tab to="/search" label="Recherche" />
            <q-route-tab to="/favorites" label="Favoris" />
            <q-route-tab to="/blacklist" label="Black List" />
         </q-tabs>
      </q-footer>
      
   </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
   setup() {
      const leftDrawerOpen = ref(false)

      return {
         leftDrawerOpen,
         toggleLeftDrawer() {
            leftDrawerOpen.value = !leftDrawerOpen.value
         }
      }
   }
}
</script>