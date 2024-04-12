"use client"

import Image from "next/image"
import { useState } from "react"

import { Image as ImageType } from "@airneis/types"

import CarouselMenu from "@/components/ui/CarouselMenu"
import { cn } from "@/utils/cn"

type CarouselProps = {
  images: ImageType[]
  className?: string
}

const Carousel = ({ images, className }: CarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const handleDotClick = (index: number) => () => {
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
