import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: true }} >

      <Stack.Screen name="index" options={{ title: "Nos depense" }} />
      <Stack.Screen name="ajouter" options={{ title: "Ajouter une depense" }} />
   </Stack>;
}
