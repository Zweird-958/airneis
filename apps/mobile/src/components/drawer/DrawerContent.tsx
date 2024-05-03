import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"

import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"
import { headerLink } from "@/utils/layout/headerLink"

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {
    translations: { common },
  } = useLocale()
  const { session } = useSession()
  const visibleHeaderLinks = headerLink.filter(
    ({ visibleOn }) =>
      visibleOn === "both" ||
      (session ? visibleOn === "auth" : visibleOn === "unAuth"),
  )

  return (
    <DrawerContentScrollView>
      {visibleHeaderLinks.map(({ label, screen }) => (
        <DrawerItem
          key={label}
          label={common[label as keyof typeof common]}
          onPress={() => props.navigation.navigate(screen)}
        />
      ))}
    </DrawerContentScrollView>
  )
}
export default DrawerContent
