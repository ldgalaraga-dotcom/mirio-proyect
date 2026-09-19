import { getUserByEmail, hashPasswordWithSalt, updateLastLogin } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body || {}

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Por favor ingresa correo electrónico y contraseña.',
      })
    }

    const user = getUserByEmail(email)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Credenciales inválidas. Usuario no encontrado.',
      })
    }

    if (user.provider === 'google' && !user.passwordHash) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Esta cuenta fue registrada con Google. Por favor inicia sesión con Google.',
      })
    }

    if (user.passwordHash && user.salt) {
      const calculatedHash = hashPasswordWithSalt(password, user.salt)
      if (calculatedHash !== user.passwordHash) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Contraseña incorrecta. Inténtalo de nuevo.',
        })
      }
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Error de autenticación.',
      })
    }

    updateLastLogin(user.id)

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
      },
      message: 'Inicio de sesión exitoso',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      statusMessage: error.message || error.statusMessage || 'Error al iniciar sesión',
    })
  }
})
