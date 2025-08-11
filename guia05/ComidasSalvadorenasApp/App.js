import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, Image } from 'react-native-elements';

const comidasTipicas = [
  {
    id: '1',
    nombre: 'Pupusas',
    calorias: 200,
    imagen: require('./src/img/pupusas.jpg'),
  },
  {
    id: '2',
    nombre: 'Yuca frita con chicharrón',
    calorias: 350,
    imagen: require('./src/img/yuca.jpg'),
  },
  {
    id: '3',
    nombre: 'Atol de elote',
    calorias: 180,
    imagen: require('./src/img/atol.jpg'),
  },
];

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {comidasTipicas.map((comida) => (
        <Card key={comida.id}>
          <Card.Title>{comida.nombre}</Card.Title>
          <Card.Divider />
          <Image
            source={comida.imagen}
            style={{ width: '100%', height: 150 }}
            resizeMode="cover"
          />
          <View style={styles.caloriasContainer}>
            <Text style={styles.caloriasText}>Calorías: {comida.calorias} kcal</Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  caloriasContainer: {
    marginTop: 10,
  },
  caloriasText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});
