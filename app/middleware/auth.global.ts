export default defineNuxtRouteMiddleware((to) => {
  // Ignorar rutas internas o llamadas a la API
  if (to.path.startsWith('/api') || to.path.startsWith('/_nuxt')) {
    return
  }

  const authCookie = useCookie('mirio_auth_user')
  const auth = useAuth()

  const isAuthenticated = !!authCookie.value || auth.isAuthenticated.value

  // Si no está autenticado y no está en la página de login, redirigir inmediatamente a /login
  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Si ya inició sesión y visita /login, enviarlo al dashboard principal
  if (isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})
