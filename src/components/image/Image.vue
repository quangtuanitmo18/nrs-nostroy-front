<template>
  <div class="custom-image-container" :style="containerStyle">
    <!-- Loading placeholder -->
    <div v-if="loading && showPlaceholder" class="image-placeholder">
      <v-progress-circular indeterminate color="primary" size="24" />
    </div>

    <!-- Error placeholder -->
    <div v-if="hasError && showPlaceholder" class="image-error">
      <v-icon size="large" color="grey">mdi-image-broken-variant</v-icon>
      <span class="text-caption text-grey">{{ errorText }}</span>
    </div>

    <!-- Actual image -->
    <img
      v-show="!hasError && !loading"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :class="[
        'custom-image',
        rounded && `rounded-${rounded}`,
        { 'image-cover': cover },
        { 'image-contain': !cover },
        { 'image-loaded': !loading && !hasError },
      ]"
      v-bind="$attrs"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: 'auto',
  },
  rounded: {
    type: [String, Boolean],
    default: false,
    validator: val => {
      if (typeof val === 'boolean') return true
      return ['sm', 'md', 'lg', 'xl', 'pill', 'circle'].includes(val)
    },
  },
  cover: {
    type: Boolean,
    default: false,
  },
  fallback: {
    type: String,
    default: '',
  },
  lazy: {
    type: Boolean,
    default: true,
  },
  showPlaceholder: {
    type: Boolean,
    default: true,
  },
  errorText: {
    type: String,
    default: 'Failed to load image',
  },
})

const loading = ref(true)
const hasError = ref(false)

const containerStyle = computed(() => {
  const style = {}

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  return style
})

const onLoad = () => {
  loading.value = false
  hasError.value = false
}

const onError = () => {
  hasError.value = true
  loading.value = false

  // Try fallback image if provided
  if (props.fallback && props.src !== props.fallback) {
    const img = new Image()
    img.src = props.fallback
    img.onload = () => {
      // Replace the original image source with fallback
      const imgElement = document.querySelector('.custom-image')
      if (imgElement) {
        imgElement.src = props.fallback
        hasError.value = false
      }
    }
  }
}

// For lazy loading images
onMounted(() => {
  if (props.lazy) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = props.src
          observer.unobserve(img)
        }
      })
    })

    const imgElement = document.querySelector('.custom-image')
    if (imgElement) {
      observer.observe(imgElement)
    }
  }
})
</script>

<style scoped>
.custom-image-container {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-image {
  transition: opacity 0.3s ease;
}

.image-cover {
  object-fit: cover;
}

.image-contain {
  object-fit: contain;
}

.image-loaded {
  opacity: 1;
}

.image-placeholder,
.image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.image-error {
  gap: 8px;
}
</style>
