import { createUser } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { name, email, password } = body || {}

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El nombre debe tener al menos 2 caracteres.',
      })
    }

    if (!email || typeof email !== 'string' || !/.+@.+\..+/.test(email.trim())) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Ingresa un correo electrónico válido.',
      })
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      throw createError({
        statusCode: 400,
        statusMessage: 'La contraseña debe tener al menos 6 caracteres.',
      })
    }

    const newUser = createUser({
      name: name.trim(),
      email: email.trim(),
      password,
      provider: 'local',
    })

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        provider: newUser.provider,
      },
      message: '¡Usuario registrado con éxito!',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      statusMessage: error.message || error.statusMessage || 'Error al registrar usuario',
    })
  }
})
