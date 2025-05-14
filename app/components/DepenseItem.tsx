import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Depense = {
  id: number;
  nom: string;
  montant: number;
};

export default function DepenseItem({
  item,
  onDelete,
}: {
  item: Depense;
  onDelete: (id: number) => void;
}) {
  return (
    <View
      style={{
        backgroundColor: "#eee",
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text>Nom: {item.nom}</Text>
        <Text>Montant: {item.montant} MRU</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <AntDesign name="delete" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}
