import React, { useState } from "react"
import { Image, View } from "react-native"

import { Image as ImageType } from "@airneis/types"

import CarouselMenu from "@/components/ui/CarouselMenu"

type Props = {
  images: ImageType[]
}

const Carousel = ({ images }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const handleDotClick = (index: number) => () => {
    if (index === currentImageIndex) {
      return
    }

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
    <View className="w-full h-72 relative">
      <Image
        src={images[currentImageIndex].url}
        alt={`image_${images[currentImageIndex].id}`}
        className="object-cover rounded-default flex-1"
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
    </View>
  )
}

export default Carousel
