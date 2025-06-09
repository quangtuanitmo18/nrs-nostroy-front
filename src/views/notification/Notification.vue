<template>
  <div>
    <!-- Menu Tabs -->
    <div class="notification__wrapper">
      <div class="d-flex">
        <v-btn
          color="primary"
          :variant="activeTab === 'snils' ? 'flat' : 'tonal'"
          class="rounded-0"
          :class="{ 'active-tab': activeTab === 'snils' }"
          @click="switchTab('snils')"
        >
          по номеру СНИЛС
        </v-btn>
        <v-btn
          color="primary"
          :variant="activeTab === 'fio' ? 'flat' : 'tonal'"
          class="rounded-0"
          :class="{ 'active-tab': activeTab === 'fio' }"
          @click="switchTab('fio')"
        >
          по ФИО
        </v-btn>
      </div>
    </div>

    <!-- Form Container -->
    <div>
      <NotificationBySnils v-if="activeTab === 'snils'" />
      <NotificationByFio v-else-if="activeTab === 'fio'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NotificationBySnils from './NotificationBySnils.vue'
import NotificationByFio from './NotificationByFio.vue'

const activeTab = ref('snils') // Default active tab

const switchTab = tab => {
  activeTab.value = tab
}
</script>

<style scoped>
.notification__wrapper {
  margin-block: 24px;
  width: 100%;
  border-bottom: 1px solid var(--color-blue-dark);
}
.active-tab {
  font-weight: bold;
  border-bottom: 2px solid var(--color-primary);
}
</style>
