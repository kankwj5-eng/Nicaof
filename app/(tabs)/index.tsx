import { ScrollView, Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const CATEGORIES = [
  { id: 1, name: "Smartphones", icon: "📱" },
  { id: 2, name: "Tablets", icon: "📲" },
  { id: 3, name: "Accesorios", icon: "🎧" },
  { id: 4, name: "Promociones", icon: "🎁" },
];

const FEATURED_STORES = [
  { id: 1, name: "TechStore Pro", rating: 4.8, reviews: 245, image: "🏪" },
  { id: 2, name: "CellMax", rating: 4.6, reviews: 189, image: "🏬" },
  { id: 3, name: "Mobile Plus", rating: 4.9, reviews: 312, image: "🏢" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryPress = (categoryName: string) => {
    // Navigate to catalog - will implement this screen
    console.log("Navigate to catalog:", categoryName);
  };

  const handleStorePress = (storeId: number) => {
    // Navigate to store detail - will implement this screen
    console.log("Navigate to store:", storeId);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-3xl font-bold text-foreground">NicaOfisel</Text>
            <TouchableOpacity onPress={() => console.log("Profile pressed")}>
              <View className="w-10 h-10 rounded-full bg-primary items-center justify-center">
                <Text className="text-lg">👤</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <Pressable
            onPress={() => console.log("Search pressed")}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View className="bg-surface rounded-full px-4 py-3 flex-row items-center border border-border">
              <Text className="mr-3 text-lg">🔍</Text>
              <Text className="text-muted flex-1">Buscar celulares...</Text>
            </View>
          </Pressable>
        </View>

        {/* Welcome Message */}
        {isAuthenticated && (
          <View className="px-4 py-3 bg-emerald rounded-xl mx-4 mt-4 mb-4">
            <Text className="text-foreground font-semibold">¡Bienvenido, {user?.name || "Usuario"}!</Text>
            <Text className="text-muted text-sm mt-1">Explora las mejores ofertas de celulares en Nicaragua</Text>
          </View>
        )}

        {/* Categories */}
        <View className="px-4 mt-6 mb-4">
          <Text className="text-xl font-bold text-foreground mb-3">Categorías</Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => handleCategoryPress(category.name)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className="bg-surface rounded-xl px-4 py-3 border border-border flex-row items-center gap-2">
                  <Text className="text-lg">{category.icon}</Text>
                  <Text className="text-foreground text-sm font-medium">{category.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Featured Stores */}
        <View className="px-4 mt-6 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-bold text-foreground">Tiendas Destacadas</Text>
            <Pressable onPress={() => console.log("View all stores")}>
              <Text className="text-accent font-semibold">Ver todas →</Text>
            </Pressable>
          </View>
          <FlatList
            data={FEATURED_STORES}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleStorePress(item.id)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <View className="bg-surface rounded-xl p-4 mr-3 w-40 border border-border">
                  <View className="w-full h-20 bg-emerald rounded-lg items-center justify-center mb-2">
                    <Text className="text-4xl">{item.image}</Text>
                  </View>
                  <Text className="text-foreground font-semibold text-sm">{item.name}</Text>
                  <View className="flex-row items-center mt-2">
                    <Text className="text-accent text-sm font-bold">{item.rating}</Text>
                    <Text className="text-muted text-xs ml-1">⭐ ({item.reviews})</Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* Quick Actions */}
        <View className="px-4 mt-6 mb-8">
          <Text className="text-xl font-bold text-foreground mb-3">Acciones Rápidas</Text>
          <Pressable
            onPress={() => console.log("Explore catalog")}
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
          >
            <View className="bg-primary rounded-xl px-6 py-4 items-center">
              <Text className="text-background font-bold text-lg">Explorar Catálogo Completo</Text>
            </View>
          </Pressable>
          {!isAuthenticated && (
            <Pressable
              onPress={() => console.log("Login pressed")}
              style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
            >
              <View className="bg-accent rounded-xl px-6 py-4 items-center mt-3">
                <Text className="text-background font-bold text-lg">Iniciar Sesión</Text>
              </View>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
