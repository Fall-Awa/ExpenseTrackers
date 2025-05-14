import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDepenses, saveDepenses } from "../app/utils/storage";

export default function Ajouter() {
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");
  const router = useRouter();

  const ajouterDepense = async () => {
    if (!nom || !montant) {
      Alert.alert("Erreur", "Veuillez remplir les deux champs");
      return;
    }

    const nouvelleDepense = {
      id: Date.now(),
      nom,
      montant: parseFloat(montant),
    };

    const ancienneListe = await getDepenses();
    const nouvelleListe = [...ancienneListe, nouvelleDepense];
    await saveDepenses(nouvelleListe);

    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>
        Ajouter une dépense
      </Text>

      <TextInput
        placeholder="Nom de la dépense"
        value={nom}
        onChangeText={setNom}
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TextInput
        placeholder="Montant"
        value={montant}
        onChangeText={setMontant}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        style={{ backgroundColor: "#007BFF", padding: 10, borderRadius: 10 }}
        onPress={ajouterDepense}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Ajouter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
