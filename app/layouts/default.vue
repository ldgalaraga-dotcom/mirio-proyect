<template>
  <v-app theme="mirioDark">
    <v-main class="mirio-main">
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped>
.mirio-main {
  background: #020d21;
  min-height: 100vh;
}
</style>
