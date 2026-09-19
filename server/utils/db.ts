import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

export interface StoredUser {
  id: string
  name: string
  email: string
  passwordHash?: string
  salt?: string
  avatar?: string
  provider: 'local' | 'google'
  createdAt: string
  lastLoginAt: string
}

interface DatabaseSchema {
  users: StoredUser[]
}

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data')
const DB_FILE = path.join(DATA_DIR, 'users.json')

function ensureDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialData: DatabaseSchema = {
        users: [
          {
            id: 'admin-001',
            name: 'Administrador Mirio',
            email: 'admin@mirio.com',
            passwordHash: hashPasswordWithSalt('admin123', 'mirio-salt-123'),
            salt: 'mirio-salt-123',
            avatar: '',
            provider: 'local',
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
          },
        ],
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8')
      return initialData
    }

    const raw = fs.readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(raw) as DatabaseSchema
  } catch (error) {
    console.error('Error reading/initializing user database:', error)
    return { users: [] }
  }
}

function saveDatabase(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving user database:', error)
    throw new Error('No se pudo guardar la información en la base de datos.')
  }
}

export function hashPasswordWithSalt(password: string, salt: string): string {
  return crypto.createHash('sha256').update(password + salt).digest('hex')
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex')
}

export function getUserByEmail(email: string): StoredUser | undefined {
  const db = ensureDatabase()
  const cleanEmail = email.trim().toLowerCase()
  return db.users.find((u) => u.email.toLowerCase() === cleanEmail)
}

export function getUserById(id: string): StoredUser | undefined {
  const db = ensureDatabase()
  return db.users.find((u) => u.id === id)
}

export function createUser(userData: {
  name: string
  email: string
  password?: string
  avatar?: string
  provider: 'local' | 'google'
}): StoredUser {
  const db = ensureDatabase()
  const cleanEmail = userData.email.trim().toLowerCase()

  const existing = db.users.find((u) => u.email.toLowerCase() === cleanEmail)
  if (existing) {
    throw new Error('Ya existe un usuario registrado con este correo electrónico.')
  }

  const salt = userData.password ? generateSalt() : undefined
  const passwordHash = userData.password && salt ? hashPasswordWithSalt(userData.password, salt) : undefined

  const newUser: StoredUser = {
    id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: userData.name.trim(),
    email: cleanEmail,
    passwordHash,
    salt,
    avatar: userData.avatar || '',
    provider: userData.provider,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  }

  db.users.push(newUser)
  saveDatabase(db)
  return newUser
}

export function updateGoogleUser(profile: {
  id?: string
  name: string
  email: string
  avatar?: string
}): StoredUser {
  const db = ensureDatabase()
  const cleanEmail = profile.email.trim().toLowerCase()

  let user = db.users.find((u) => u.email.toLowerCase() === cleanEmail)

  if (user) {
    user.name = profile.name || user.name
    if (profile.avatar) user.avatar = profile.avatar
    user.lastLoginAt = new Date().toISOString()
  } else {
    user = {
      id: profile.id || 'usr_google_' + Date.now(),
      name: profile.name,
      email: cleanEmail,
      avatar: profile.avatar || '',
      provider: 'google',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    }
    db.users.push(user)
  }

  saveDatabase(db)
  return user
}

export function updateLastLogin(userId: string): void {
  const db = ensureDatabase()
  const user = db.users.find((u) => u.id === userId)
  if (user) {
    user.lastLoginAt = new Date().toISOString()
    saveDatabase(db)
  }
}

export function getAllUsers(): Omit<StoredUser, 'passwordHash' | 'salt'>[] {
  const db = ensureDatabase()
  return db.users.map(({ passwordHash, salt, ...rest }) => rest)
}
