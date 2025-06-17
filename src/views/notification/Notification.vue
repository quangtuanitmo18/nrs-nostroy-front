<template>
  <div>
    <!-- Menu Tabs -->
    <div class="notification__wrapper">
      <div class="d-flex">
        <BtnPrimary
          :variant="activeTab === 'snils' ? 'tonal' : 'flat'"
          class="rounded-0"
          :class="{ 'active-tab': activeTab === 'snils' }"
          @click="switchTab('snils')"
        >
          по номеру СНИЛС
        </BtnPrimary>
        <BtnPrimary
          :variant="activeTab === 'fio' ? 'tonal' : 'flat'"
          class="rounded-0"
          :class="{ 'active-tab': activeTab === 'fio' }"
          @click="switchTab('fio')"
        >
          по ФИО
        </BtnPrimary>
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
import NotificationByFio from './NotificationByFio.vue'
import NotificationBySnils from './NotificationBySnils.vue'
import BtnPrimary from '@/components/button/BtnPrimary.vue'

const activeTab = ref('snils') // Default active tab

const switchTab = tab => {
  activeTab.value = tab
}
</script>

<style scoped>
.notification__wrapper {
  margin-block: 24px;
  width: 100%;
  border-bottom: 2px solid var(--color-white-secondary);
}
.active-tab {
  font-weight: bold;
  border-bottom: 2px solid var(--color-primary);
}
</style>
