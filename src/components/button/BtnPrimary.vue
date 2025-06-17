<template>
  <v-btn class="btn-primary" color="primary" v-bind="$attrs">
    <slot />
  </v-btn>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
})
</script>

<style scoped lang="scss">
.btn-primary {
  outline: none;

  font-size: 14px;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px !important;
  border: none;
}
</style>
