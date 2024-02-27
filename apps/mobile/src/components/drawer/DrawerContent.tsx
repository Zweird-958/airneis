import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"

const DrawerContent = (props: DrawerContentComponentProps) => {
  const DRAWER_ITEMS = [
    {
      label: "Home",
      screen: "index",
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
