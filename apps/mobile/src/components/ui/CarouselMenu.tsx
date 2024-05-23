import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react-native"
import { Pressable, PressableProps, View } from "react-native"

import { Image } from "@airneis/types"
import { cn } from "@airneis/utils"

type SideButtonProps = {
  Icon: LucideIcon
  direction: "left" | "right"
} & PressableProps

const SideButton = ({
  Icon,
  direction,
  onPress,
  ...props
}: SideButtonProps) => (
  <Pressable
    className={cn(
      "absolute top-1/2 transform -translate-y-1/2 bg-card p-1.5 rounded-full",
      direction === "left" ? "left-4" : "right-4",
    )}
    onPress={onPress}
    {...props}
  >
    <Icon color="hsl(0 0% 0%)" size={16} />
  </Pressable>
)

type BulletButtonProps = {
  active: boolean
} & PressableProps

const BulletButton = ({ active, onPress, ...props }: BulletButtonProps) => (
  <Pressable
    className={cn(
      "w-4 h-4 rounded-full border-2 border-primary",
      active ? "bg-primary" : "bg-card",
    )}
    onPress={onPress}
    {...props}
  />
)

type CarouselMenuProps = {
  images: Image[]
  currentImageIndex: number
  handleDotClick: (index: number) => () => void
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
    <View className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-row gap-2">
      {images.map(({ id }, index) => (
        <BulletButton
          key={id}
          active={currentImageIndex === index}
          onPress={handleDotClick(index)}
        />
      ))}
    </View>
    <SideButton Icon={ChevronLeft} direction="left" onPress={handlePrevious} />
    <SideButton Icon={ChevronRight} direction="right" onPress={handleNext} />
  </>
)

export default CarouselMenu
