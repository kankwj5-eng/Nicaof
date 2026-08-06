import { ScrollView, Text, View, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"buyer" | "seller">("buyer");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      console.log("Register:", { name, email, password, userType });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(600)} className="px-4 pt-8 pb-6">
          <View className="items-center mb-6">
            <Text className="text-4xl font-bold text-foreground">Crear Cuenta</Text>
            <Text className="text-muted text-base mt-2">Únete a NicaOfisel</Text>
          </View>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInUp.duration(600).delay(200)} className="px-4 flex-1">
          {/* Name Input */}
          <View className="mb-4">
            <Text className="text-foreground font-semibold mb-2">Nombre Completo</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="Tu nombre"
              placeholderTextColor="#90a89c"
              value={name}
              onChangeText={setName}
              editable={!isLoading}
            />
          </View>

          {/* Email Input */}
          <View className="mb-4">
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
          <View className="mb-4">
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

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-foreground font-semibold mb-2">Confirmar Contraseña</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-foreground"
              placeholder="••••••••"
              placeholderTextColor="#90a89c"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>

          {/* User Type Selection */}
          <View className="mb-8">
            <Text className="text-foreground font-semibold mb-3">¿Eres comprador o vendedor?</Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setUserType("buyer")}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                className="flex-1"
              >
                <View
                  className={`rounded-xl px-4 py-3 items-center border-2 ${
                    userType === "buyer"
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      userType === "buyer" ? "text-background" : "text-foreground"
                    }`}
                  >
                    Comprador
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setUserType("seller")}
                style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                className="flex-1"
              >
                <View
                  className={`rounded-xl px-4 py-3 items-center border-2 ${
                    userType === "seller"
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      userType === "seller" ? "text-background" : "text-foreground"
                    }`}
                  >
                    Vendedor
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Register Button */}
          <Pressable
            onPress={handleRegister}
            disabled={isLoading}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View className="bg-primary rounded-xl px-6 py-4 items-center flex-row justify-center gap-2 mb-4">
              {isLoading && <ActivityIndicator color="#fff" size="small" />}
              <Text className="text-background font-bold text-lg">
                {isLoading ? "Registrando..." : "Crear Cuenta"}
              </Text>
            </View>
          </Pressable>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-muted">¿Ya tienes cuenta? </Text>
            <Pressable>
              <Text className="text-accent font-semibold">Inicia sesión</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </ScreenContainer>
  );
}
