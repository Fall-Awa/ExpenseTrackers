import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getDepenses, saveDepenses } from "../app/utils/storage";
import DepenseItem from "../app/components/DepenseItem"

type Depense = {
  id: number;
  nom: string;
  montant: number;
};

export default function Index() {
  const [depense, setDepense] = useState<Depense[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadExpenses = async () => {
      const stored = await getDepenses();
      setDepense(stored);
    };
    loadExpenses();
  }, []);

  useEffect(() => {
    saveDepenses(depense);
  }, [depense]);

  const supprimerDepense = (id: number) => {
    const nouvelleListe = depense.filter((item) => item.id !== id);
    setDepense(nouvelleListe);
  };

  const total = depense.reduce((acc, item) => acc + item.montant, 0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center" }}>
          Mes Dépenses 
        </Text>

        <TouchableOpacity
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#007BFF",
            borderRadius: 10,
          }}
          onPress={() => router.push("/ajouter")}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            ➕ Ajouter une dépense
          </Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 30, fontWeight: "bold", textAlign: "center" }}>
          Liste des dépenses
        </Text>

        {depense.map((item) => (
          <DepenseItem key={item.id} item={item} onDelete={supprimerDepense} />
        ))}

        <Text
          style={{
            marginTop: 30,
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Total : {total.toFixed(2)} MRU
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
