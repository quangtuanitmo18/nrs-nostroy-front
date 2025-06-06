<template>
  <div class="error-page">
    <div class="error-container">
      <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
      <h1>{{ title }}</h1>
      <p class="text-body-1 mb-16">{{ message }}</p>
      <div class="d-flex justify-space-between gap-3">
        <v-btn color="primary" @click="goHome">На главную</v-btn>
        <v-btn variant="outlined" @click="goBack">Назад</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  code: {
    type: Number,
    default: 500,
  },
  message: {
    type: String,
    default: 'Произошла ошибка при загрузке страницы',
  },
  error: {
    type: Object,
    default: () => ({}),
  },
})

const router = useRouter()

const title = computed(() => {
  if (props.code === 404) return 'Страница не найдена'
  return 'Ошибка'
})

function goHome() {
  router.push({ path: '/' })
}

function goBack() {
  router.go(-1)
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-blue-light);
}

.error-container {
  text-align: center;
  max-width: fit-content;
  padding: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  margin-inline: 20px;
  @media screen and (min-width: 600px) {
    padding: 24px;
  }
  & h1 {
    font-size: 24px;
    line-height: 1;
    margin-bottom: 8px;
    @media screen and (min-width: 600px) {
      font-size: 40px;
    }
  }
}
</style>
