import { NextRequest, NextResponse } from "next/server"

import { createCaller, createTRPCContext } from "@airneis/api"
import { sharedConfig } from "@airneis/config"

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const buffer = Buffer.from(await file.arrayBuffer())
  const caller = createCaller(await createTRPCContext(sharedConfig.fallbackLng))
  const imageUrl = await caller.images.create({
    buffer,
    type: file.type,
  })

  return NextResponse.json({ result: imageUrl })
}
