import { ScrollView, Text, View, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ProfessionalIcon } from "@/components/ui/professional-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function AddProductScreen() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [promotionalPrice, setPromotionalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Smartphones");
  const [condition, setCondition] = useState<"new" | "used">("new");
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Smartphones", "Tablets", "Accesorios", "Otros"];

  const handleAddImage = () => {
    // Simular agregar imagen
    setImages([...images, `📱${images.length + 1}`]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log("Producto agregado:", {
        productName,
        description,
        price,
        promotionalPrice,
        stock,
        category,
        condition,
        images,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(600)} className="px-4 pt-4 pb-4">
          <Text className="text-2xl font-bold text-foreground">Agregar Producto</Text>
          <Text className="text-muted text-sm mt-1">Completa los detalles de tu producto</Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInUp.duration(600).delay(200)} className="px-4 pb-8">
          {/* Images Section */}
          <View className="mb-6">
            <Text className="text-foreground font-semibold mb-3">Fotos del Producto</Text>
            <View className="flex-row flex-wrap gap-2 mb-3">
              {images.map((image, index) => (
                <View
                  key={index}
                  className="w-20 h-20 bg-surface rounded-lg items-center justify-center relative"
                >
                  <Text className="text-3xl">{image}</Text>
                  <Pressable
                    onPress={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-error rounded-full p-1"
                  >
                    <ProfessionalIcon name="close" size={14} color="#fff" />
                  </Pressable>
                </View>
              ))}
              {images.length < 5 && (
                <Pressable
                  onPress={handleAddImage}
                  className="w-20 h-20 bg-surface border-2 border-dashed border-primary rounded-lg items-center justify-center"
                >
                  <ProfessionalIcon name="add" size={24} color="#1eb37e" />
                </Pressable>
              )}
            </View>
            <View className="flex-row gap-2">
              <Pressable className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 flex-row items-center justify-center gap-2">
                <ProfessionalIcon name="camera" size={18} color="#1eb37e" />
                <Text className="text-foreground font-semibold text-sm">Cámara</Text>
              </Pressable>
              <Pressable className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 flex-row items-center justify-center gap-2">
                <ProfessionalIcon name="gallery" size={18} color="#1eb37e" />
                <Text className="text-foreground font-semibold text-sm">Galería</Text>
              </Pressable>
            </View>
          </View>

          {/* Product Name */}
          <View className="mb-4">
            <Text className="text-foreground font-semibold mb-2">Nombre del Producto</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="ej: iPhone 15 Pro"
              placeholderTextColor="#90a89c"
              value={productName}
              onChangeText={setProductName}
              editable={!isLoading}
            />
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="text-foreground font-semibold mb-2">Descripción</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground h-24"
              placeholder="Describe tu producto..."
              placeholderTextColor="#90a89c"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              editable={!isLoading}
            />
          </View>

          {/* Price Section */}
          <View className="mb-4 flex-row gap-3">
            <View className="flex-1">
              <Text className="text-foreground font-semibold mb-2">Precio</Text>
              <TextInput
                className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
                placeholder="0.00"
                placeholderTextColor="#90a89c"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                editable={!isLoading}
              />
            </View>
            <View className="flex-1">
              <Text className="text-foreground font-semibold mb-2">Precio Oferta</Text>
              <TextInput
                className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
                placeholder="0.00"
                placeholderTextColor="#90a89c"
                value={promotionalPrice}
                onChangeText={setPromotionalPrice}
                keyboardType="decimal-pad"
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Stock */}
          <View className="mb-4">
            <Text className="text-foreground font-semibold mb-2">Stock</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="Cantidad disponible"
              placeholderTextColor="#90a89c"
              value={stock}
              onChangeText={setStock}
              keyboardType="number-pad"
              editable={!isLoading}
            />
          </View>

          {/* Category */}
          <View className="mb-4">
            <Text className="text-foreground font-semibold mb-2">Categoría</Text>
            <View className="flex-row flex-wrap gap-2">
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg border ${
                    category === cat
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold text-sm ${
                      category === cat ? "text-background" : "text-foreground"
                    }`}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Condition */}
          <View className="mb-6">
            <Text className="text-foreground font-semibold mb-2">Condición</Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setCondition("new")}
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  condition === "new"
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    condition === "new" ? "text-background" : "text-foreground"
                  }`}
                >
                  Nuevo
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setCondition("used")}
                className={`flex-1 px-4 py-3 rounded-lg border ${
                  condition === "used"
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    condition === "used" ? "text-background" : "text-foreground"
                  }`}
                >
                  Usado
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={handleSubmit}
            disabled={isLoading}
            className="bg-primary rounded-xl px-6 py-4 items-center flex-row justify-center gap-2"
          >
            {isLoading && <ActivityIndicator color="#fff" size="small" />}
            <Text className="text-background font-bold text-lg">
              {isLoading ? "Agregando..." : "Agregar Producto"}
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </ScreenContainer>
  );
}
