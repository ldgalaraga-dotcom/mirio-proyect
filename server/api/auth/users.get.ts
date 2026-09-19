import { getAllUsers } from '../../utils/db'

export default defineEventHandler(() => {
  return {
    success: true,
    total: getAllUsers().length,
    users: getAllUsers(),
  }
})
