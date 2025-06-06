<template>
  <div>
    <template v-if="error">
      <div class="error-boundary">
        <div class="error-content">
          <v-icon size="x-large" color="error" class="mb-4">mdi-alert-circle</v-icon>
          <h2 class="text-h5 mb-3">Произошла ошибка</h2>
          <p class="text-body-1 mb-4">{{ errorMessage }}</p>
          <v-btn color="primary" @click="resetError">Попробовать снова</v-btn>
        </div>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'

const error = ref(null)
const errorMessage = ref('Что-то пошло не так. Пожалуйста, попробуйте еще раз.')

// Обработчик ошибок компонентов
function errorCaptured(err, instance, info) {
  console.error('Перехвачена ошибка:', err)
  console.error('Компонент вызвавший ошибку:', instance)
  console.error('Информация об ошибке:', info)

  error.value = err

  if (err?.message) {
    errorMessage.value = `Произошла ошибка: ${err.message}`
  }

  // Предотвращаем распространение ошибки дальше
  return false
}

// Сбрасываем ошибку и перезагружаем компонент
function resetError() {
  error.value = null
  window.location.reload()
}

// Предоставляем функцию сброса ошибки для вложенных компонентов
provide('resetError', resetError)
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
}

.error-content {
  text-align: center;
  max-width: 500px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
