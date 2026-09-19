import { updateGoogleUser } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { id, name, email, avatar } = body || {}

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El correo electrónico de Google es requerido.',
      })
    }

    const user = updateGoogleUser({
      id,
      name: name || email.split('@')[0],
      email,
      avatar,
    })

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: 'google',
      },
      message: 'Usuario sincronizado con Google exitosamente.',
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      statusMessage: error.message || error.statusMessage || 'Error al procesar usuario de Google',
    })
  }
})
