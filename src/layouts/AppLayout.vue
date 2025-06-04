<template>
  <div class="container container--fluid">
    <v-app class="content">
      <AppHeader />
      <v-main class="main">
        <router-view v-slot="{ Component }">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
// @ts-ignore
import AppHeader from './AppHeader.vue'

const route = useRoute()

// Cached all list for table
const cachedViews = []
</script>

<style lang="scss">
.content {
  position: relative;
  flex: 1;
}
.main {
  background-color: #f1f4f6;
  padding: 20px;
  min-height: calc(100vh - 60px);
}
</style>
