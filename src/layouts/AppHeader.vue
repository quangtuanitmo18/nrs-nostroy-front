<template>
  <div>
    <div class="header">
      <v-row no-gutters align="center" justify="space-between">
        <!-- Logo and Title Section -->
        <v-col cols="12" md="2" class="d-flex align-center flex-column flex-sm-row">
          <div @click="handleNavigateToHome" class="cursor-pointer">
            <v-img :src="logo_head" :width="170" aspect-ratio="16/9" cover></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="10" lg="7">
          <div class="d-flex flex-column justify-center align-center">
            <h1 class="header__title--primary">
              Саморегулируемые организации в области строительства, реконструкции,
            </h1>
            <span class="header__title--secondary"
              >капитального ремонта, сноса объектов капитального строительства</span
            >
          </div>
        </v-col>

        <!-- Button Section -->
        <v-col cols="12" md="12" lg="3" class="d-flex justify-center justify-sm-end mt-4 mt-sm-0">
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
            @click="handleNavigateToHome"
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
import { path } from '@/configs/path'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleNavigateToNotification = () => {
  router.push({ name: path.notification.name })
}

const handleNavigateToHome = () => {
  router.push({ name: path.home.name })
}
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--color-blue-light);
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 12px;

  @media (min-width: 600px) {
    padding: 20px 16px;
  }
}

.header__title {
  &--primary {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;

    @media (min-width: 992px) {
      font-size: 20px;
    }
  }

  &--secondary {
    font-size: 16px;

    @media (min-width: 992px) {
      font-size: 20px;
    }
  }
}

.header__btn {
  background-color: var(--color-blue-dark-2);
  color: var(--color-blue-light);
}
</style>
