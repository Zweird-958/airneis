import { Id } from "./Common"

export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type JwtPayload = {
  id: Id
  role: UserRoles
}
export type RawJwt = {
  iat: number
  exp: number
  payload: JwtPayload
}
