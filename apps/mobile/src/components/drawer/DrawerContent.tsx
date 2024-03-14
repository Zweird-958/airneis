import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"

import useLocale from "@/hooks/useLocale"

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {
    translations: { common },
  } = useLocale()
  const DRAWER_ITEMS = [
    {
      label: common.home,
      screen: "index",
    },
    {
      label: common.signIn,
      screen: "sign-in",
    },
  ]

  return (
    <DrawerContentScrollView>
      {DRAWER_ITEMS.map(({ label, screen }) => (
        <DrawerItem
          key={label}
          label={label}
          onPress={() => props.navigation.navigate(screen)}
        />
      ))}
    </DrawerContentScrollView>
  )
}
export default DrawerContent
