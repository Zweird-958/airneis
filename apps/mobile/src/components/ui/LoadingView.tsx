import { LoaderCircle } from "lucide-react-native"
import { View } from "react-native"

type Props = {
  size?: number
}

const LoadingView = ({ size = 48 }: Props) => (
  <View className="flex-1 items-center justify-center animate-spin">
    <LoaderCircle size={size} />
  </View>
)

export default LoadingView
