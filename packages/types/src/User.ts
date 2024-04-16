import { User } from "@airneis/db"

export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type id = `${string}-${string}-${string}-${string}-${string}`
export type JwtPayload = {
  role: UserRoles
} & Pick<User, "id">
export type RawJwt = {
  iat: number
  exp: number
  payload: JwtPayload
}
export type ValidationAccountJwt = {
  iat: number
  exp: number
  payload: {
    user: {
      id: id
    }
  }
}
