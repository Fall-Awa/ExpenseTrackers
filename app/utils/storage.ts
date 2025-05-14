import AsyncStorage from "@react-native-async-storage/async-storage";

const DEPENSES_KEY = "depense";

export async function getDepenses() {
  try {
    const data = await AsyncStorage.getItem(DEPENSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Erreur de chargement :", err);
    return [];
  } 
}

export async function saveDepenses(depenses: any[]) {
  try {
    await AsyncStorage.setItem(DEPENSES_KEY, JSON.stringify(depenses));
  } catch (err) {
    console.error("Erreur de sauvegarde :", err);
  }
}
