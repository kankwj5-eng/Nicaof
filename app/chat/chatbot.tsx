import { ScrollView, Text, View, TextInput, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ProfessionalIcon } from "@/components/ui/professional-icons";
import Animated, { FadeInUp, SlideInUp } from "react-native-reanimated";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatbotScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "¡Hola! Bienvenido a TechStore Pro. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "Busco un iPhone 15 Pro",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "Excelente elección. Tenemos el iPhone 15 Pro disponible en todas las capacidades. ¿Cuál es tu preferencia de almacenamiento?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: messages.length + 2,
        text: "Gracias por tu pregunta. Estoy procesando tu solicitud. ¿Hay algo más en lo que pueda ayudarte?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.sender === "user";

    return (
      <Animated.View
        entering={SlideInUp.duration(300)}
        className={`px-4 py-2 ${isUser ? "items-end" : "items-start"}`}
      >
        <View
          className={`rounded-2xl px-4 py-3 max-w-xs ${
            isUser
              ? "bg-primary rounded-br-none"
              : "bg-surface border border-border rounded-bl-none"
          }`}
        >
          <Text className={`${isUser ? "text-background" : "text-foreground"}`}>
            {item.text}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      {/* Header */}
      <View className="bg-primary px-4 py-4 flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xl font-bold text-background">TechStore Pro</Text>
          <View className="flex-row items-center mt-1">
            <View className="w-2 h-2 bg-emerald rounded-full mr-2" />
            <Text className="text-background text-xs opacity-80">En línea ahora</Text>
          </View>
        </View>
        <Pressable className="p-2">
          <ProfessionalIcon name="info" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingVertical: 16 }}
        scrollEnabled={true}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <View className="px-4 py-2 items-start">
          <View className="bg-surface border border-border rounded-2xl rounded-bl-none px-4 py-3 flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#1eb37e" />
            <Text className="text-muted text-sm">El asesor está escribiendo...</Text>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      {messages.length === 1 && (
        <View className="px-4 py-3 gap-2">
          <Pressable
            onPress={() => setInputText("¿Cuáles son tus horarios?")}
            className="bg-surface border border-border rounded-lg px-3 py-2"
          >
            <Text className="text-foreground text-sm">¿Cuáles son tus horarios?</Text>
          </Pressable>
          <Pressable
            onPress={() => setInputText("¿Aceptan tarjeta de crédito?")}
            className="bg-surface border border-border rounded-lg px-3 py-2"
          >
            <Text className="text-foreground text-sm">¿Aceptan tarjeta de crédito?</Text>
          </Pressable>
          <Pressable
            onPress={() => setInputText("¿Hacen envíos?")}
            className="bg-surface border border-border rounded-lg px-3 py-2"
          >
            <Text className="text-foreground text-sm">¿Hacen envíos?</Text>
          </Pressable>
        </View>
      )}

      {/* Input Area */}
      <View className="px-4 py-4 border-t border-border">
        <View className="flex-row items-center gap-2">
          <Pressable className="p-2">
            <ProfessionalIcon name="gallery" size={20} color="#1eb37e" />
          </Pressable>

          <TextInput
            className="flex-1 bg-surface border border-border rounded-full px-4 py-3 text-foreground"
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#90a89c"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />

          <Pressable
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`p-2 rounded-full ${inputText.trim() ? "bg-primary" : "bg-muted"}`}
          >
            <ProfessionalIcon
              name="chat"
              size={20}
              color={inputText.trim() ? "#fff" : "#687076"}
            />
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}
