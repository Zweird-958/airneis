export type ApiResponse<T> = {
  result: T
}

export type ImageResponse = ApiResponse<{
  buffer: string
  type: string
}>
