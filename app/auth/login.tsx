import { ScrollView, Text, View, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function LoginScreen() {
  const { isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Aquí irá la lógica de login
      console.log("Login:", email, password);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer className="bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#1eb37e" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(600)} className="px-4 pt-12 pb-8">
          <View className="items-center mb-8">
            <Text className="text-5xl font-bold text-foreground">NicaOfisel</Text>
            <Text className="text-muted text-base mt-2">Bienvenido de vuelta</Text>
          </View>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInUp.duration(600).delay(200)} className="px-4 flex-1 justify-center">
          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-foreground font-semibold mb-2">Correo Electrónico</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="tu@email.com"
              placeholderTextColor="#90a89c"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>

          {/* Password Input */}
          <View className="mb-8">
            <Text className="text-foreground font-semibold mb-2">Contraseña</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="••••••••"
              placeholderTextColor="#90a89c"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>

          {/* Forgot Password */}
          <Pressable className="mb-8">
            <Text className="text-accent text-sm font-semibold">¿Olvidaste tu contraseña?</Text>
          </Pressable>

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View className="bg-primary rounded-xl px-6 py-4 items-center flex-row justify-center gap-2">
              {isLoading && <ActivityIndicator color="#fff" size="small" />}
              <Text className="text-background font-bold text-lg">
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </Text>
            </View>
          </Pressable>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-border" />
            <Text className="text-muted mx-3 text-sm">O</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Social Login */}
          <View className="gap-3 mb-8">
            <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
              <View className="bg-surface border border-border rounded-xl px-6 py-3 items-center flex-row justify-center">
                <Text className="text-2xl mr-2">g</Text>
                <Text className="text-foreground font-semibold">Google</Text>
              </View>
            </Pressable>

            <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
              <View className="bg-surface border border-border rounded-xl px-6 py-3 items-center flex-row justify-center">
                <Text className="text-2xl mr-2">f</Text>
                <Text className="text-foreground font-semibold">Facebook</Text>
              </View>
            </Pressable>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-muted">¿No tienes cuenta? </Text>
            <Pressable>
              <Text className="text-accent font-semibold">Regístrate aquí</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </ScreenContainer>
  );
}
