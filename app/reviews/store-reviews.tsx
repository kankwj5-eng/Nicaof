import { ScrollView, Text, View, Pressable, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ProfessionalIcon } from "@/components/ui/professional-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Juan García",
    rating: 5,
    comment: "Excelente servicio y productos de calidad. Muy recomendado.",
    date: "Hace 2 días",
    helpful: 24,
  },
  {
    id: 2,
    author: "María López",
    rating: 4,
    comment: "Buena variedad de productos. El envío fue rápido.",
    date: "Hace 1 semana",
    helpful: 18,
  },
  {
    id: 3,
    author: "Carlos Rodríguez",
    rating: 5,
    comment: "El mejor precio que encontré. Asesor muy atento.",
    date: "Hace 2 semanas",
    helpful: 32,
  },
];

export default function StoreReviewsScreen() {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    if (rating === 0 || !comment.trim()) return;

    const newReview: Review = {
      id: reviews.length + 1,
      author: "Mi Nombre",
      rating,
      comment,
      date: "Ahora",
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
    setShowReviewForm(false);
  };

  const renderStars = (count: number, interactive = false, onPress?: (value: number) => void) => {
    return (
      <View className="flex-row gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => interactive && onPress?.(star)}
            disabled={!interactive}
          >
            <ProfessionalIcon
              name="star"
              size={interactive ? 28 : 16}
              color={star <= count ? "#baff5c" : "#687076"}
            />
          </Pressable>
        ))}
      </View>
    );
  };

  const renderReview = ({ item }: { item: Review }) => (
    <Animated.View entering={FadeInUp.duration(400)} className="bg-surface rounded-xl p-4 mb-3">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-foreground font-semibold">{item.author}</Text>
          <Text className="text-muted text-xs mt-1">{item.date}</Text>
        </View>
        <View className="items-end">
          {renderStars(item.rating)}
        </View>
      </View>

      <Text className="text-foreground text-sm leading-relaxed my-3">{item.comment}</Text>

      <View className="flex-row items-center gap-4 pt-3 border-t border-border">
        <Pressable className="flex-row items-center gap-1">
          <ProfessionalIcon name="heart" size={16} color="#1eb37e" />
          <Text className="text-muted text-xs">{item.helpful}</Text>
        </Pressable>
        <Pressable className="flex-row items-center gap-1">
          <ProfessionalIcon name="share" size={16} color="#1eb37e" />
          <Text className="text-muted text-xs">Compartir</Text>
        </Pressable>
      </View>
    </Animated.View>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(600)} className="bg-primary px-4 py-6">
          <View className="items-center mb-4">
            <Text className="text-3xl font-bold text-background">4.8</Text>
            <View className="flex-row gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <ProfessionalIcon
                  key={star}
                  name="star"
                  size={20}
                  color={star <= 4 ? "#baff5c" : "#90a89c"}
                />
              ))}
            </View>
            <Text className="text-background opacity-90 mt-2">Basado en 245 reseñas</Text>
          </View>

          {/* Rating Distribution */}
          <View className="gap-2 mt-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <View key={rating} className="flex-row items-center gap-2">
                <Text className="text-background text-sm w-6">{rating}★</Text>
                <View className="flex-1 h-2 bg-background bg-opacity-30 rounded-full">
                  <View
                    className="h-full bg-baff5c rounded-full"
                    style={{ width: `${rating * 20}%` }}
                  />
                </View>
                <Text className="text-background text-xs opacity-70 w-8 text-right">
                  {Math.floor(rating * 49)}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Write Review Button */}
        {!showReviewForm && (
          <Pressable
            onPress={() => setShowReviewForm(true)}
            className="mx-4 mt-4 bg-primary rounded-xl px-6 py-4 items-center"
          >
            <Text className="text-background font-bold">Escribe una Reseña</Text>
          </Pressable>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <Animated.View entering={FadeInUp.duration(400)} className="mx-4 mt-4 bg-surface rounded-xl p-4 mb-4">
            <Text className="text-foreground font-semibold mb-3">Tu Calificación</Text>

            {renderStars(rating, true, setRating)}

            <TextInput
              className="bg-background border border-border rounded-xl px-4 py-3 text-foreground mt-4 h-24"
              placeholder="Comparte tu experiencia..."
              placeholderTextColor="#90a89c"
              value={comment}
              onChangeText={setComment}
              multiline
              textAlignVertical="top"
            />

            <View className="flex-row gap-2 mt-4">
              <Pressable
                onPress={() => setShowReviewForm(false)}
                className="flex-1 bg-muted rounded-lg px-4 py-2 items-center"
              >
                <Text className="text-background font-semibold">Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={handleSubmitReview}
                disabled={rating === 0 || !comment.trim()}
                className="flex-1 bg-primary rounded-lg px-4 py-2 items-center"
              >
                <Text className="text-background font-semibold">Enviar Reseña</Text>
              </Pressable>
            </View>
          </Animated.View>
        )}

        {/* Reviews List */}
        <View className="px-4 mt-6 mb-8">
          <Text className="text-xl font-bold text-foreground mb-3">Reseñas Recientes</Text>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderReview}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
