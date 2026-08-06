import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ProfessionalIcon } from "@/components/ui/professional-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  store: string;
  image: string;
  rating: number;
  type: "product" | "store";
}

const FAVORITES: FavoriteItem[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    store: "TechStore Pro",
    image: "📱",
    rating: 4.9,
    type: "product",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 899,
    store: "CellMax",
    image: "📱",
    rating: 4.8,
    type: "product",
  },
  {
    id: 3,
    name: "TechStore Pro",
    price: 0,
    store: "Tienda",
    image: "🏪",
    rating: 4.8,
    type: "store",
  },
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(FAVORITES);
  const [filterType, setFilterType] = useState<"all" | "products" | "stores">("all");

  const filteredFavorites = favorites.filter((item) => {
    if (filterType === "all") return true;
    if (filterType === "products") return item.type === "product";
    if (filterType === "stores") return item.type === "store";
    return true;
  });

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const renderFavorite = ({ item }: { item: FavoriteItem }) => (
    <Animated.View entering={FadeInDown.duration(400)} className="bg-surface rounded-xl p-4 mb-3">
      <View className="flex-row gap-4">
        <View className="w-20 h-20 bg-primary rounded-lg items-center justify-center">
          <Text className="text-4xl">{item.image}</Text>
        </View>
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-foreground font-semibold">{item.name}</Text>
            <Text className="text-muted text-xs mt-1">{item.store}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            {item.type === "product" && <Text className="text-accent font-bold">${item.price}</Text>}
            <View className="flex-row items-center gap-1">
              <ProfessionalIcon name="star" size={14} color="#baff5c" />
              <Text className="text-foreground text-xs font-semibold">{item.rating}</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => handleRemoveFavorite(item.id)}
          className="justify-center"
        >
          <ProfessionalIcon name="close" size={20} color="#EF4444" />
        </Pressable>
      </View>
    </Animated.View>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-4">
          <Text className="text-2xl font-bold text-foreground">Mis Favoritos</Text>
          <Text className="text-muted text-sm mt-1">{filteredFavorites.length} elementos</Text>
        </View>

        {/* Filter Tabs */}
        <View className="px-4 pb-4 flex-row gap-2">
          <Pressable
            onPress={() => setFilterType("all")}
            className={`flex-1 py-2 px-3 rounded-lg border ${
              filterType === "all" ? "bg-primary border-primary" : "bg-surface border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                filterType === "all" ? "text-background" : "text-foreground"
              }`}
            >
              Todos
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterType("products")}
            className={`flex-1 py-2 px-3 rounded-lg border ${
              filterType === "products" ? "bg-primary border-primary" : "bg-surface border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                filterType === "products" ? "text-background" : "text-foreground"
              }`}
            >
              Productos
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterType("stores")}
            className={`flex-1 py-2 px-3 rounded-lg border ${
              filterType === "stores" ? "bg-primary border-primary" : "bg-surface border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                filterType === "stores" ? "text-background" : "text-foreground"
              }`}
            >
              Tiendas
            </Text>
          </Pressable>
        </View>

        {/* Favorites List */}
        <View className="px-4 mb-8">
          {filteredFavorites.length > 0 ? (
            <FlatList
              data={filteredFavorites}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderFavorite}
              scrollEnabled={false}
            />
          ) : (
            <View className="items-center justify-center py-12">
              <ProfessionalIcon name="heart" size={48} color="#687076" />
              <Text className="text-muted mt-4 text-center">
                No tienes favoritos en esta categoría
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
