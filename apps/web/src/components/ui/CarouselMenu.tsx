import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react"
import React, { ButtonHTMLAttributes } from "react"

import { Image } from "@airneis/types"

import { cn } from "@/utils/cn"

type SideButtonProps = {
  Icon: LucideIcon
  direction: "left" | "right"
} & ButtonHTMLAttributes<HTMLButtonElement>

const SideButton = ({
  Icon,
  direction,
  onClick,
  ...props
}: SideButtonProps) => (
  <button
    className={cn(
      "absolute top-1/2 transform -translate-y-1/2 bg-card rounded-full text-black hover:ring hover:ring-primary active:ring-0 transition duration-150 ease-out p-1.5 md:p-2",
      direction === "left" ? "left-4" : "right-4",
    )}
    onClick={onClick}
    {...props}
  >
    <Icon className="w-4 h-4" />
  </button>
)

type BulletButtonProps = {
  active: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const BulletButton = ({ active, onClick, ...props }: BulletButtonProps) => (
  <button
    className={cn(
      "w-4 h-4 rounded-full border-2 border-primary",
      active ? "bg-primary" : "bg-card",
    )}
    onClick={onClick}
    {...props}
  />
)

type CarouselMenuProps = {
  images: Image[]
  currentImageIndex: number
  handleDotClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handlePrevious: () => void
  handleNext: () => void
}

const CarouselMenu = ({
  images,
  currentImageIndex,
  handleDotClick,
  handlePrevious,
  handleNext,
}: CarouselMenuProps) => (
  <>
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      {images.map(({ id }, index) => (
        <BulletButton
          key={id}
          active={currentImageIndex === index}
          onClick={handleDotClick}
          data-index={index}
        />
      ))}
    </div>
    <SideButton Icon={ChevronLeft} direction="left" onClick={handlePrevious} />
    <SideButton Icon={ChevronRight} direction="right" onClick={handleNext} />
  </>
)

export default CarouselMenu
