import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Reserva = ({ item, eliminarReserva }) => {
  return (
    <View style={styles.reserva}>
      <Text style={styles.texto}>{item.nombre}</Text>
      <Text style={styles.texto}>{item.fecha} ⏰ {item.hora}</Text>
      <Text style={styles.texto}>{item.personas} personas</Text>
      <Text style={styles.texto}>Sección: {item.seccion}</Text>
      <Button title="Eliminar" onPress={() => eliminarReserva(item.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  reserva: {
    backgroundColor: '#e0f7fa',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  texto: {
    marginBottom: 5,
    fontSize: 16,
  },
});

export default Reserva;
