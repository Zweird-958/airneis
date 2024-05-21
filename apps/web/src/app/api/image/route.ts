import { NextRequest, NextResponse } from "next/server"

import { createCaller, createTRPCContext } from "@airneis/api"
import { sharedConfig } from "@airneis/config"

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const file = formData.get("file") as File
  const folderName = formData.get("folderName") as string
  const buffer = Buffer.from(await file.arrayBuffer())
  const caller = createCaller(createTRPCContext(req, sharedConfig.fallbackLng))
  const imageUrl = await caller.images.create({
    buffer,
    type: file.type,
    folderName,
  })

  return NextResponse.json({ result: imageUrl })
}
