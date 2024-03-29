import { NextRequest, NextResponse } from "next/server"

import { createCaller, createTRPCContext } from "@airneis/api"

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const buffer = Buffer.from(await file.arrayBuffer())
  const caller = createCaller(createTRPCContext())
  const imageUrl = await caller.images.create({
    buffer,
    type: file.type,
  })

  return NextResponse.json({ result: imageUrl })
}
