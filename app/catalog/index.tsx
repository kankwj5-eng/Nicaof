import { ScrollView, Text, View, TextInput, Pressable, FlatList } from "react-native";
import { useState, useMemo } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ProfessionalIcon } from "@/components/ui/professional-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  store: string;
  image: string;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1399,
    rating: 4.9,
    store: "TechStore Pro",
    image: "📱",
    category: "Smartphones",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 899,
    rating: 4.8,
    store: "CellMax",
    image: "📱",
    category: "Smartphones",
  },
  {
    id: 3,
    name: "iPad Pro 12.9",
    price: 1099,
    rating: 4.7,
    store: "Mobile Plus",
    image: "📲",
    category: "Tablets",
  },
  {
    id: 4,
    name: "AirPods Pro",
    price: 249,
    rating: 4.6,
    store: "TechStore Pro",
    image: "🎧",
    category: "Accesorios",
  },
];

const CATEGORIES = ["Todos", "Smartphones", "Tablets", "Accesorios"];

export default function CatalogScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating">("rating");

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.store.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const renderProduct = ({ item }: { item: Product }) => (
    <Animated.View entering={FadeInDown.duration(400)} className="bg-surface rounded-xl p-3 mb-3">
      <View className="flex-row gap-3">
        <View className="w-24 h-24 bg-primary rounded-lg items-center justify-center">
          <Text className="text-5xl">{item.image}</Text>
        </View>
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-foreground font-semibold text-sm">{item.name}</Text>
            <Text className="text-muted text-xs mt-1">{item.store}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-accent font-bold">${item.price}</Text>
              {item.originalPrice && (
                <Text className="text-muted text-xs line-through">${item.originalPrice}</Text>
              )}
            </View>
            <View className="flex-row items-center gap-1">
              <ProfessionalIcon name="star" size={14} color="#baff5c" />
              <Text className="text-foreground text-xs font-semibold">{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="px-4 pt-4 pb-4">
          <View className="flex-row items-center gap-2 bg-surface border border-border rounded-full px-4 py-3">
            <ProfessionalIcon name="search" size={20} color="#1eb37e" />
            <TextInput
              className="flex-1 text-foreground"
              placeholder="Buscar productos o tiendas..."
              placeholderTextColor="#90a89c"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categories */}
        <View className="px-4 pb-4">
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedCategory(item)}
                className={`mr-2 px-4 py-2 rounded-full border ${
                  selectedCategory === item
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedCategory === item ? "text-background" : "text-foreground"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        {/* Sort Options */}
        <View className="px-4 pb-4 flex-row gap-2">
          <Pressable
            onPress={() => setSortBy("price-low")}
            className={`flex-1 py-2 px-3 rounded-lg border ${
              sortBy === "price-low" ? "bg-primary border-primary" : "bg-surface border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                sortBy === "price-low" ? "text-background" : "text-foreground"
              }`}
            >
              Menor Precio
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSortBy("price-high")}
            className={`flex-1 py-2 px-3 rounded-lg border ${
              sortBy === "price-high" ? "bg-primary border-primary" : "bg-surface border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                sortBy === "price-high" ? "text-background" : "text-foreground"
              }`}
            >
              Mayor Precio
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSortBy("rating")}
            className={`flex-1 py-2 px-3 rounded-lg border ${
              sortBy === "rating" ? "bg-primary border-primary" : "bg-surface border-border"
            }`}
          >
            <Text
              className={`text-center text-sm font-semibold ${
                sortBy === "rating" ? "text-background" : "text-foreground"
              }`}
            >
              Mejor Valorado
            </Text>
          </Pressable>
        </View>

        {/* Products */}
        <View className="px-4 mb-8">
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProduct}
              scrollEnabled={false}
            />
          ) : (
            <View className="items-center justify-center py-12">
              <ProfessionalIcon name="search" size={48} color="#687076" />
              <Text className="text-muted mt-4 text-center">
                No se encontraron productos que coincidan con tu búsqueda
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
