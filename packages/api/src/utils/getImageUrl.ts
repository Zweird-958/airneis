import env from "../env"

const getImageUrl = (image: string) => `${env.S3_URL}/${env.S3_BUCKET}/${image}`

export default getImageUrl
