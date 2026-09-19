export interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
  provider: 'google' | 'local' | 'github'
  givenName?: string
  familyName?: string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: (notification?: (notification: any) => void) => void
          renderButton: (parent: HTMLElement, options: any) => void
          disableAutoSelect: () => void
        }
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: any) => void
            error_callback?: (error: any) => void
          }) => {
            requestAccessToken: (overrideConfig?: any) => void
          }
          revoke: (accessToken: string, done?: () => void) => void
        }
      }
    }
  }
}

const STORAGE_KEY = 'mirio_auth_user'

export const useAuth = () => {
  const config = useRuntimeConfig()
  const googleClientId = computed(() => (config.public?.googleClientId as string) || '')

  // Cookie for immediate SSR/CSR hydration & middleware detection
  const authCookie = useCookie<AuthUser | null>('mirio_auth_user', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  })

  const user = useState<AuthUser | null>('auth_user', () => authCookie.value || null)
  const isLoading = useState<boolean>('auth_loading', () => false)
  const authError = useState<string | null>('auth_error', () => null)
  const isInitialized = useState<boolean>('auth_initialized', () => false)

  // Initialize and restore session from cookie / localStorage on client
  const initAuth = () => {
    if (isInitialized.value) return

    if (authCookie.value && !user.value) {
      user.value = authCookie.value
    }

    if (import.meta.client && !user.value) {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEY)
        if (savedUser) {
          user.value = JSON.parse(savedUser)
          authCookie.value = user.value
        }
      } catch (e) {
        console.error('Error loading stored auth session:', e)
      }
    }
    isInitialized.value = true
  }

  // Auto-init
  if (!isInitialized.value) {
    initAuth()
  }

  const saveUserSession = (userData: AuthUser) => {
    user.value = userData
    authCookie.value = userData
    authError.value = null
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      } catch (e) {
        console.error('Error persisting auth session:', e)
      }
    }
  }

  // Load the Google Identity Services SDK asynchronously
  const loadGoogleScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return resolve()
      if (window.google?.accounts) {
        return resolve()
      }

      const existingScript = document.getElementById('google-gsi-script')
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve())
        existingScript.addEventListener('error', (e) => reject(e))
        return
      }

      const script = document.createElement('script')
      script.id = 'google-gsi-script'
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = (err) => reject(new Error('No se pudo cargar el SDK de Google Identity: ' + err))
      document.head.appendChild(script)
    })
  }

  /**
   * Register a new user in the persistent database
   */
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    authError.value = null

    try {
      const res: any = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { name, email, password },
      })

      if (res?.success && res?.user) {
        saveUserSession(res.user)
        isLoading.value = false
        return { success: true }
      } else {
        throw new Error(res?.message || 'Error al registrar el usuario')
      }
    } catch (err: any) {
      isLoading.value = false
      const msg = err.data?.statusMessage || err.message || 'Error al registrar usuario'
      authError.value = msg
      return { success: false, error: msg }
    }
  }

  /**
   * Standard login with email + password checking against database
   */
  const loginWithCredentials = async (
    emailVal: string,
    passwordVal: string,
    _rememberMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    isLoading.value = true
    authError.value = null

    try {
      const res: any = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email: emailVal, password: passwordVal },
      })

      if (res?.success && res?.user) {
        saveUserSession(res.user)
        isLoading.value = false
        return { success: true }
      } else {
        throw new Error(res?.message || 'Credenciales inválidas')
      }
    } catch (err: any) {
      isLoading.value = false
      const msg = err.data?.statusMessage || err.message || 'Error al iniciar sesión'
      authError.value = msg
      return { success: false, error: msg }
    }
  }

  /**
   * Start Google OAuth Sign-In flow and persist to database
   */
  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    authError.value = null
    isLoading.value = true

    const clientId = googleClientId.value?.trim()

    if (!clientId) {
      isLoading.value = false
      const msg = 'NO_CLIENT_ID'
      authError.value = msg
      return { success: false, error: msg }
    }

    try {
      await loadGoogleScript()

      if (!window.google?.accounts) {
        throw new Error('El servicio de Google no está disponible.')
      }

      return new Promise((resolve) => {
        try {
          const tokenClient = window.google!.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: 'openid email profile',
            callback: async (tokenResponse: any) => {
              if (tokenResponse.error) {
                isLoading.value = false
                authError.value = tokenResponse.error_description || tokenResponse.error
                resolve({ success: false, error: authError.value || 'Error en Google' })
                return
              }

              try {
                // Fetch profile info from Google Userinfo API
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })

                if (!userInfoRes.ok) {
                  throw new Error('No se pudo obtener la información de perfil de Google')
                }

                const profile = await userInfoRes.json()

                // Save or update Google user in server database
                const dbRes: any = await $fetch('/api/auth/google', {
                  method: 'POST',
                  body: {
                    id: profile.sub,
                    name: profile.name || `${profile.given_name || ''} ${profile.family_name || ''}`.trim() || 'Usuario de Google',
                    email: profile.email,
                    avatar: profile.picture,
                  },
                })

                const authenticatedUser: AuthUser = dbRes.user || {
                  id: profile.sub,
                  name: profile.name,
                  email: profile.email,
                  avatar: profile.picture,
                  provider: 'google',
                }

                saveUserSession(authenticatedUser)
                isLoading.value = false
                resolve({ success: true })
              } catch (err: any) {
                console.error('Error processing Google login:', err)
                isLoading.value = false
                authError.value = err.message || 'Error al procesar datos de Google'
                resolve({ success: false, error: authError.value || 'Error' })
              }
            },
            error_callback: () => {
              isLoading.value = false
              authError.value = 'El inicio de sesión con Google fue cancelado o falló.'
              resolve({ success: false, error: authError.value })
            },
          })

          tokenClient.requestAccessToken({ prompt: 'select_account' })
        } catch (e: any) {
          isLoading.value = false
          authError.value = e.message || 'Error al iniciar cliente de Google'
          resolve({ success: false, error: authError.value || 'Error' })
        }
      })
    } catch (e: any) {
      isLoading.value = false
      authError.value = e.message || 'Error al conectar con Google'
      return { success: false, error: authError.value || 'Error' }
    }
  }

  /**
   * Demo sign in with Google simulation (persisted in database as well)
   */
  const loginWithGoogleDemo = async (customName?: string, customEmail?: string): Promise<boolean> => {
    isLoading.value = true
    authError.value = null

    try {
      const demoData = {
        id: 'google-demo-' + Date.now(),
        name: customName || 'Desarrollador Mirio',
        email: customEmail || 'dev.mirio@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocL8_mirio_sample_avatar=s96-c',
      }

      const res: any = await $fetch('/api/auth/google', {
        method: 'POST',
        body: demoData,
      })

      const demoUser: AuthUser = res?.user || {
        ...demoData,
        provider: 'google',
      }

      saveUserSession(demoUser)
      isLoading.value = false
      return true
    } catch (err: any) {
      console.error('Error saving demo user:', err)
      const fallbackUser: AuthUser = {
        id: 'google-demo-local',
        name: customName || 'Desarrollador Mirio',
        email: customEmail || 'dev.mirio@gmail.com',
        avatar: '',
        provider: 'google',
      }
      saveUserSession(fallbackUser)
      isLoading.value = false
      return true
    }
  }

  /**
   * Sign out and clear stored session & cookie
   */
  const logout = () => {
    user.value = null
    authCookie.value = null
    authError.value = null
    if (import.meta.client) {
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch (e) {
        console.error('Error clearing auth session:', e)
      }
    }
  }

  return {
    user: readonly(user),
    isAuthenticated: computed(() => !!user.value),
    isLoading: readonly(isLoading),
    authError: readonly(authError),
    googleClientId,
    hasGoogleClientId: computed(() => !!googleClientId.value && googleClientId.value.trim().length > 0),
    registerUser,
    loginWithGoogle,
    loginWithGoogleDemo,
    loginWithCredentials,
    logout,
    initAuth,
  }
}
