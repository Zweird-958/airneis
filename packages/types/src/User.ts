import { UserRoles } from "@airneis/db"

export type Id = `${string}-${string}-${string}-${string}-${string}`
export type RawJwtBase<TPayload> = {
  iat: number
  exp: number
  payload: TPayload
}
export type JwtPayload = {
  user: {
    id: Id
    role: UserRoles
  }
}
export type RawJwt = RawJwtBase<JwtPayload>
export type CookieRawJwt = RawJwtBase<string>
export type ValidationAccountJwt = RawJwtBase<{ user: { id: Id } }>
