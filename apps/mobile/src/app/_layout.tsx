import { DrawerActions } from "@react-navigation/native"
import { useNavigation } from "expo-router"
import { Drawer } from "expo-router/drawer"
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "lucide-react-native"
import { TouchableOpacity, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import Providers from "@/app/providers"
import DrawerContent from "@/components/drawer/DrawerContent"
import ForegroundIcon from "@/components/ui/ForegroundIcon"

import "../globals.css"

const RootLayout = () => {
  const navigation = useNavigation()
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <Providers>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            drawerPosition: "right",
            headerTitle: "Àirneis",
            headerTitleAlign: "left",
            headerLeft: () => null,
            headerRight: () => (
              <View className="flex-row gap-3 px-4">
                <TouchableOpacity>
                  <ForegroundIcon as={SearchIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ForegroundIcon as={ShoppingCartIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openDrawer}>
                  <ForegroundIcon as={MenuIcon} />
                </TouchableOpacity>
              </View>
            ),
          }}
          drawerContent={(props) => <DrawerContent {...props} />}
        />
      </GestureHandlerRootView>
    </Providers>
  )
}

export default RootLayout
