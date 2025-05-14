import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Depense = {
  id: number;
  nom: string;
  montant: number;
};

export default function Index() {
  const [nomDepense, setNomDepense] = useState("");
  const [depense, setDepense] = useState<Depense[]>([]);
  const [montant, SetMontant] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); // <- 👈 nouveau

  const ajouterDepense = () => {
    if (nomDepense && montant) {
      const nouvelleDepense = {
        id: Date.now(),
        nom: nomDepense,
        montant: parseFloat(montant),
      };
      setDepense([...depense, nouvelleDepense]);
      setNomDepense("");
      SetMontant("");
    } else {
      alert("veillez montrez les 2 champs");
    }
  };

  const supprimerDepense = (id: number) => {
    const nouvelleList = depense.filter((item) => item.id !== id);
    setDepense(nouvelleList);
  };

  const total = depense.reduce((acc, item) => acc + item.montant, 0);

  // Sauvegarder les dépenses à chaque modification :

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedDepenses = await AsyncStorage.getItem("depense");
        if (storedDepenses !== null) {
          setDepense(JSON.parse(storedDepenses));
        }
        setIsLoaded(true);
      } catch (error) {
        console.log("Erreur lors du chargement des depenses", error);
      }
    };
    loadExpenses();
  }, []);
  useEffect(() => {
    const saveDepenses = async () => {
      if (isLoaded) {
        try {
          await AsyncStorage.setItem("depense", JSON.stringify(depense));
        } catch (error) {
          console.log("Erreur lors de la sauvegarde des depenses", error);
        }
      }
    };
    saveDepenses();
  }, [depense, isLoaded]);

  // Charger les dépenses au démarrage de l’app

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            display: "flex",

            padding: 18,
            justifyContent: "center",
            gap: 10,
            marginTop: 30,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Bienvenue dans ton Expense Tracker 💸
          </Text>
          <TextInput
            placeholder="Nom de la depense"
            style={{
              borderWidth: 1,
              padding: 10,
              marginTop: 20,
              borderRadius: 10,
            }}
            value={nomDepense}
            onChangeText={setNomDepense}
          />

          <TextInput
            placeholder="Le montant"
            value={montant}
            onChangeText={SetMontant}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              padding: 10,
              marginTop: 20,
              borderRadius: 10,
            }}
          />

          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 10,
           
              borderColor:"red",
             backgroundColor:"red",
             
              
            }}
            onPress={ajouterDepense}
          >
           <Text style={{textAlign:"center", color: "white"}}> Ajouetr la depense</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            La Liste des depense
          </Text>
          {depense.map((item) => (
            <View
              key={item.id}
              style={{
                marginTop: 10,
                padding: 1,
                backgroundColor: "#eee",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View>
                <Text>Nom:{item.nom}</Text>
                <Text>Montant:{item.montant} MRU</Text>
              </View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 50,
                  marginLeft: 10,
                }}
                onPress={() => supprimerDepense(item.id)}
              >
                <AntDesign name="delete" size={18} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginTop: 30,
                textAlign: "center",
              }}
            >
              Total:{total.toFixed(2)}MRU
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
