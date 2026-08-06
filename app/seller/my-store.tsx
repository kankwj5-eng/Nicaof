import { ScrollView, Text, View, Pressable, FlatList, Image } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ProfessionalIcon } from "@/components/ui/professional-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "iPhone 15 Pro", price: 999, image: "📱", stock: 5 },
  { id: 2, name: "Samsung Galaxy S24", price: 899, image: "📱", stock: 3 },
  { id: 3, name: "Funda Premium", price: 25, image: "🛡️", stock: 20 },
];

export default function MyStoreScreen() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [storeInfo] = useState({
    name: "Mi Tienda Tech",
    rating: 4.8,
    reviews: 245,
    whatsapp: "+505 8888 8888",
  });

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Store Header */}
        <Animated.View entering={FadeInDown.duration(600)} className="bg-primary px-4 py-6">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-background">{storeInfo.name}</Text>
              <View className="flex-row items-center mt-2">
                <ProfessionalIcon name="star" size={16} color="#baff5c" />
                <Text className="text-background ml-1 font-semibold">{storeInfo.rating}</Text>
                <Text className="text-background ml-1 opacity-80">({storeInfo.reviews} reseñas)</Text>
              </View>
            </View>
            <Pressable className="bg-background rounded-full p-3">
              <ProfessionalIcon name="edit" size={20} color="#1eb37e" />
            </Pressable>
          </View>

          {/* WhatsApp Contact */}
          <Pressable className="flex-row items-center bg-background bg-opacity-20 rounded-lg px-3 py-2">
            <ProfessionalIcon name="whatsapp" size={18} color="#baff5c" />
            <Text className="text-background ml-2 font-semibold">{storeInfo.whatsapp}</Text>
          </Pressable>
        </Animated.View>

        {/* Stats */}
        <View className="flex-row px-4 py-4 gap-3">
          <View className="flex-1 bg-surface rounded-xl p-4 items-center">
            <Text className="text-muted text-sm">Productos</Text>
            <Text className="text-2xl font-bold text-foreground mt-1">{products.length}</Text>
          </View>
          <View className="flex-1 bg-surface rounded-xl p-4 items-center">
            <Text className="text-muted text-sm">Visitas</Text>
            <Text className="text-2xl font-bold text-foreground mt-1">1.2K</Text>
          </View>
          <View className="flex-1 bg-surface rounded-xl p-4 items-center">
            <Text className="text-muted text-sm">Ventas</Text>
            <Text className="text-2xl font-bold text-foreground mt-1">48</Text>
          </View>
        </View>

        {/* Products Section */}
        <View className="px-4 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-bold text-foreground">Mis Productos</Text>
            <Pressable className="bg-primary rounded-lg px-3 py-2 flex-row items-center gap-1">
              <ProfessionalIcon name="add" size={18} color="#fff" />
              <Text className="text-background font-semibold text-sm">Agregar</Text>
            </Pressable>
          </View>

          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-surface rounded-xl p-3 mb-3 flex-row gap-3">
                <View className="w-20 h-20 bg-primary rounded-lg items-center justify-center">
                  <Text className="text-4xl">{item.image}</Text>
                </View>
                <View className="flex-1 justify-between">
                  <View>
                    <Text className="text-foreground font-semibold">{item.name}</Text>
                    <Text className="text-accent font-bold mt-1">${item.price}</Text>
                  </View>
                  <Text className="text-muted text-xs">Stock: {item.stock} unidades</Text>
                </View>
                <View className="justify-between">
                  <Pressable className="p-2">
                    <ProfessionalIcon name="edit" size={18} color="#1eb37e" />
                  </Pressable>
                  <Pressable className="p-2">
                    <ProfessionalIcon name="delete" size={18} color="#EF4444" />
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>

        {/* Promotions Section */}
        <View className="px-4 mb-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-bold text-foreground">Promociones Activas</Text>
            <Pressable className="text-accent">
              <Text className="text-accent font-semibold text-sm">Ver todas →</Text>
            </Pressable>
          </View>

          <View className="bg-gradient-to-r from-primary to-accent rounded-xl p-4">
            <Text className="text-background font-bold text-lg mb-2">Descuento 20%</Text>
            <Text className="text-background opacity-90 text-sm mb-3">
              En todos los accesorios este fin de semana
            </Text>
            <Pressable className="bg-background rounded-lg px-3 py-2 self-start">
              <Text className="text-primary font-semibold text-sm">Editar Promoción</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
