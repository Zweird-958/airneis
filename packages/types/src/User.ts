export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type id = `${string}-${string}-${string}-${string}-${string}`
export type JwtPayload = {
  user: {
    id: id
    role: UserRoles
  }
}
export type RawJwt<TPayload = JwtPayload> = {
  iat: number
  exp: number
  payload: TPayload
}
export type CookieRawJwt = RawJwt<string>
export type ValidationAccountJwt = {
  iat: number
  exp: number
  payload: {
    user: {
      id: id
    }
  }
}
