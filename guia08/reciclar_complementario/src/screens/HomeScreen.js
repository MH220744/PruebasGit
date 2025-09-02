import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DATA = [
  {
    id: 'rechazar',
    titulo: 'Rechazar',
    breve: 'Evita productos de un solo uso.',
    detalle:
      'Rechaza plásticos y empaques innecesarios; prefiere opciones reutilizables o a granel.',
    icon: 'block-helper',
    color: '#1B5E20',
  },
  {
    id: 'reducir',
    titulo: 'Reducir',
    breve: 'Consume solo lo necesario.',
    detalle:
      'Compra con conciencia, planifica tus comidas y evita el despilfarro para minimizar residuos.',
    icon: 'leaf',
    color: '#2E7D32',
  },
  {
    id: 'reutilizar',
    titulo: 'Reutilizar',
    breve: 'Da segunda vida a objetos.',
    detalle:
      'Repara, dona o transforma. Los envases de vidrio y textiles pueden tener múltiples usos.',
    icon: 'refresh',
    color: '#388E3C',
  },
  {
    id: 'reciclar',
    titulo: 'Reciclar',
    breve: 'Clasifica correctamente.',
    detalle:
      'Separa papel/cartón, plásticos, vidrios y metales. Lava envases y sigue la norma local.',
    icon: 'recycle',
    color: '#43A047',
  },
  {
    id: 'recuperar',
    titulo: 'Recuperar',
    breve: 'Aprovecha la energía.',
    detalle:
      'Recuperación energética y compostaje: lo que no se reutiliza/recicla aún puede aprovecharse.',
    icon: 'fire',
    color: '#4CAF50',
  },
];

export default function HomeScreen() {
  const [seleccion, setSeleccion] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { borderColor: item.color }]}
            onPress={() => setSeleccion(item)}
            activeOpacity={0.85}
          >
            <View style={[styles.iconWrap, { backgroundColor: item.color }]}>
              <MaterialCommunityIcons name={item.icon} size={28} color="#E8F5E9" />
            </View>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.desc}>{item.breve}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!seleccion}
        transparent
        animationType="fade"
        onRequestClose={() => setSeleccion(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {seleccion && (
              <>
                <View
                  style={[
                    styles.modalIconWrap,
                    { backgroundColor: seleccion.color },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={seleccion.icon}
                    size={30}
                    color="#E8F5E9"
                  />
                </View>
                <Text style={styles.modalTitle}>{seleccion.titulo}</Text>
                <Text style={styles.modalText}>{seleccion.detalle}</Text>
                <Pressable
                  style={styles.modalBtn}
                  onPress={() => setSeleccion(null)}
                >
                  <Text style={styles.modalBtnText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const CARD_BG = '#F1F8E9';
const TEXT_DARK = '#1B1B1B';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9' },
  row: { gap: 12 },
  card: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderWidth: 2,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: TEXT_DARK,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  desc: {
    color: '#2F3B2F',
    fontSize: 13.5,
    lineHeight: 18,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.28)',
    justifyContent: 'center',
    padding: 22,
  },
  modalCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 18,
  },
  modalIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    color: '#1B5E20',
  },
  modalText: {
    fontSize: 15.5,
    color: '#263238',
    lineHeight: 22,
    marginBottom: 14,
  },
  modalBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalBtnText: { color: '#E8F5E9', fontWeight: '700' },
});
