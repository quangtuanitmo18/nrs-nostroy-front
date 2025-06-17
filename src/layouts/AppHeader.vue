<template>
  <div>
    <div class="header">
      <v-row no-gutters align="center" justify="space-between">
        <!-- Logo and Title Section -->
        <v-col cols="12" md="2" class="d-flex align-center flex-column flex-sm-row">
          <div @click="handleNavigateToHome" class="cursor-pointer">
            <v-img :src="logo_head" :width="180" aspect-ratio="16/9" cover></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="10" lg="7">
          <div class="d-flex flex-column justify-center align-center text-center">
            <h1 class="header__title--primary">
              Национальный реестр специалистов в области строительства
            </h1>
          </div>
        </v-col>

        <!-- Button Section -->
        <v-col cols="12" md="12" lg="3" class="d-flex justify-center justify-sm-end mt-4 mt-sm-0">
          <BtnPrimary
            v-if="$route.name == path.home.name"
            size="large"
            :prepend-icon="'mdi-email-outline'"
            @click="handleNavigateToNotification"
          >
            <span class="header__btn--text"> Запрос уведомления </span>
          </BtnPrimary>
          <BtnPrimary
            v-if="$route.name !== path.home.name"
            :prepend-icon="'mdi-arrow-left'"
            size="large"
            @click="handleNavigateToHome"
          >
            <span class="header__btn--text"> Вернуться к реестру </span>
          </BtnPrimary>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { logo_head } from '@/assets/images/index'
import BtnPrimary from '@/components/button/BtnPrimary.vue'
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
  background-color: var(--color-white);
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 12px;

  border-bottom: 3px solid var(--color-white-secondary);
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
      line-height: 30px;
    }
  }

  &--secondary {
    font-size: 16px;

    @media (min-width: 992px) {
      font-size: 20px;
    }
  }
}
</style>
