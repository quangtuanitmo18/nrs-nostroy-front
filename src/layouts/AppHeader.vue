<template>
  <div>
    <!-- Main header -->
    <div class="header">
      <v-row no-gutters align="center" justify="space-between">
        <!-- Logo and Title Section -->
        <v-col cols="auto" class="d-flex align-center ga-4" sm="6">
          <Image :src="logo_head" width="170" cover alt="НОСТРОЙ" class="flex-shrink-0" />
          <div class="d-flex flex-column">
            <h1 class="header__title--primary">Национальный реестр специалистов</h1>
            <span class="header__title--secondary"> в области строительства </span>
          </div>
        </v-col>

        <!-- <v-spacer></v-spacer> -->

        <!-- Notification Request Button -->
        <v-col cols="auto" sm="6" class="d-flex justify-end">
          <v-btn
            v-if="$route.name == path.home.name"
            class="header__btn"
            variant="elevated"
            prepend-icon="mdi-email-alert-outline"
            size="large"
            @click="handleNavigateToNotification"
          >
            Запрос уведомления
          </v-btn>
          <v-btn
            v-if="$route.name !== path.home.name"
            class="header__btn"
            variant="elevated"
            prepend-icon="mdi-arrow-left"
            size="large"
            @click="handleNavigateToNotification"
          >
            Вернуться к реестру
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { logo_head } from '@/assets/images/index'
import Image from '@/components/image/Image.vue'
import { path } from '@/configs/path'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNavigateToNotification = () => {
  router.push({ name: path.notification.name })
}
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--color-blue-light);
  position: sticky;
  top: 0;
  z-index: 10;
  padding-inline: 16px;
  padding-block: 20px;
}

.header__title--primary {
  padding: 0 16px;
  font-weight: 500;
  font-size: 36px;
  margin-bottom: 12px;
}
.header__title--secondary {
  font-size: 20px;
  margin-left: 250px;
}
.header__btn {
  background-color: var(--color-blue-dark-2);
  color: var(--color-blue-light);
}
</style>
