"use client"

import Image from "next/image"
import React, { useState } from "react"

import { Image as ImageType } from "@airneis/types"
import { cn } from "@airneis/utils"

import CarouselMenu from "@/components/ui/CarouselMenu"

type Props = {
  images: ImageType[]
  className?: string
}

const Carousel = ({ images, className }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const handleDotClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(event.currentTarget.dataset.index || "0", 10)
    setCurrentImageIndex(index)
  }
  const handlePrevious = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length,
    )
  }
  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length)
  }

  return (
    <div
      className={cn(
        "w-full aspect-square md:max-h-[700px] relative",
        className,
      )}
    >
      <Image
        src={images[currentImageIndex].url}
        alt={`image_${images[currentImageIndex].id}`}
        className="object-cover rounded-default"
        fill
        priority
      />

      {images.length > 1 && (
        <CarouselMenu
          images={images}
          currentImageIndex={currentImageIndex}
          handleDotClick={handleDotClick}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      )}
    </div>
  )
}

export default Carousel
