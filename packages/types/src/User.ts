import { User } from "@airneis/db"

export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type Id = Pick<User, "id">["id"]
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
