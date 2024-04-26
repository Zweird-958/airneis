export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type id = `${string}-${string}-${string}-${string}-${string}`
export type RawJwtBase<TPayload> = {
  iat: number
  exp: number
  payload: TPayload
}
export type JwtPayload = {
  user: {
    id: id
    role: UserRoles
  }
}
export type RawJwt = RawJwtBase<JwtPayload>
export type CookieRawJwt = RawJwtBase<string>
export type ValidationAccountJwt = RawJwtBase<{ user: { id: id } }>
