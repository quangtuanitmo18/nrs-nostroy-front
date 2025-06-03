<template>
  <header class="header">
    <div class="header-wrapper">
      <v-container>
        <v-row no-gutters class="">
          <v-col cols="12" sm="6">
            <v-responsive class="border pa-4"></v-responsive>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  background-color: var(--color-blue-light);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-wrapper {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}
.header-menu-title {
  padding: 0 16px;
  font-weight: 500;
  color: var(--text-secondary);
}
.header-menu-item {
  color: rgb(var(--color-primary)) !important;
}

.header__login {
  display: flex;
  align-items: center;
  column-gap: 10px;

  &-info {
    display: flex;
    flex-direction: column;
    color: white;
    align-items: end;

    &-type {
      font-size: 14px;
      opacity: 0.6;
    }
  }
}
</style>
