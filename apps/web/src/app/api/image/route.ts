import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const buffer = Buffer.from(await file.arrayBuffer()).toString("base64")

  return NextResponse.json({ result: { buffer, type: file.type } })
}
