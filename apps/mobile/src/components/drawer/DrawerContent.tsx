import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"

import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {
    translations: { common },
  } = useLocale()
  const { session } = useSession()
  const DRAWER_ITEMS = [
    {
      label: common.home,
      screen: "index",
      visibleOn: "both",
    },
    {
      label: common.signIn,
      screen: "sign-in",
      visibleOn: "unAuth",
    },
  ]
  const visibleHeaderLinks = DRAWER_ITEMS.filter(
    ({ visibleOn }) =>
      visibleOn === "both" ||
      (session ? visibleOn === "auth" : visibleOn === "unAuth"),
  )

  return (
    <DrawerContentScrollView>
      {visibleHeaderLinks.map(({ label, screen }) => (
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
