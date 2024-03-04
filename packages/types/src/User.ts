export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type JwtPayload = {
  id: number
  role: UserRoles
}
export type RawJwt = {
  iat: number
  exp: number
  payload: JwtPayload
}
