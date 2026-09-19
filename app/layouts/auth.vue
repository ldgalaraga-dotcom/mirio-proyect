<template>
  <v-app theme="mirioDark">
    <v-main class="auth-main">
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped>
.auth-main {
  background: #050B1A;
  min-height: 100vh;
}
</style>
