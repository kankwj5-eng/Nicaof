import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { ReactNode } from "react";

export type IconName =
  | "home"
  | "search"
  | "favorites"
  | "profile"
  | "store"
  | "products"
  | "reviews"
  | "chat"
  | "settings"
  | "logout"
  | "add"
  | "edit"
  | "delete"
  | "camera"
  | "gallery"
  | "star"
  | "heart"
  | "share"
  | "whatsapp"
  | "phone"
  | "location"
  | "clock"
  | "cart"
  | "filter"
  | "sort"
  | "back"
  | "close"
  | "menu"
  | "notification"
  | "success"
  | "error"
  | "warning"
  | "info";

interface ProfessionalIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function ProfessionalIcon({ name, size = 24, color = "#1eb37e" }: ProfessionalIconProps) {
  const iconProps = { size, color };

  const iconMap: Record<IconName, ReactNode> = {
    home: <MaterialIcons name="home" {...iconProps} />,
    search: <MaterialIcons name="search" {...iconProps} />,
    favorites: <MaterialIcons name="favorite" {...iconProps} />,
    profile: <MaterialIcons name="person" {...iconProps} />,
    store: <MaterialIcons name="store" {...iconProps} />,
    products: <MaterialIcons name="inventory-2" {...iconProps} />,
    reviews: <MaterialIcons name="rate-review" {...iconProps} />,
    chat: <MaterialIcons name="chat" {...iconProps} />,
    settings: <MaterialIcons name="settings" {...iconProps} />,
    logout: <MaterialIcons name="logout" {...iconProps} />,
    add: <MaterialIcons name="add-circle" {...iconProps} />,
    edit: <MaterialIcons name="edit" {...iconProps} />,
    delete: <MaterialIcons name="delete" {...iconProps} />,
    camera: <MaterialIcons name="camera-alt" {...iconProps} />,
    gallery: <MaterialIcons name="image" {...iconProps} />,
    star: <MaterialIcons name="star" {...iconProps} />,
    heart: <MaterialIcons name="favorite-border" {...iconProps} />,
    share: <MaterialIcons name="share" {...iconProps} />,
    whatsapp: <FontAwesome6 name="whatsapp" {...iconProps} />,
    phone: <MaterialIcons name="phone" {...iconProps} />,
    location: <MaterialIcons name="location-on" {...iconProps} />,
    clock: <MaterialIcons name="schedule" {...iconProps} />,
    cart: <MaterialIcons name="shopping-cart" {...iconProps} />,
    filter: <MaterialIcons name="filter-list" {...iconProps} />,
    sort: <MaterialIcons name="sort" {...iconProps} />,
    back: <MaterialIcons name="arrow-back" {...iconProps} />,
    close: <MaterialIcons name="close" {...iconProps} />,
    menu: <MaterialIcons name="menu" {...iconProps} />,
    notification: <MaterialIcons name="notifications" {...iconProps} />,
    success: <MaterialIcons name="check-circle" {...iconProps} />,
    error: <MaterialIcons name="error" {...iconProps} />,
    warning: <MaterialIcons name="warning" {...iconProps} />,
    info: <MaterialIcons name="info" {...iconProps} />,
  };

  return iconMap[name] || <MaterialIcons name="help" {...iconProps} />;
}

export function IconButton({
  name,
  onPress,
  size = 24,
  color = "#1eb37e",
  label,
}: ProfessionalIconProps & { onPress?: () => void; label?: string }) {
  return (
    <View className="items-center">
      <View
        className="p-2 rounded-full active:bg-surface"
        style={{ cursor: "pointer" }}
        onTouchEnd={onPress}
      >
        <ProfessionalIcon name={name} size={size} color={color} />
      </View>
      {label && <Text className="text-xs text-muted mt-1">{label}</Text>}
    </View>
  );
}
