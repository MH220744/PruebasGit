import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function DetalleScreen({ route }) {
  const { receta } = route.params;

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{receta.nombre}</Text>
      <Image source={{ uri: receta.imagen }} style={{ width: '100%', height: 200, marginBottom: 10, borderRadius: 5 }} />

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Ingredientes:</Text>
      {receta.ingredientes.map((i, index) => (
        <Text key={index}>- {i.cantidad} de {i.ingrediente}</Text>
      ))}

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>Instrucciones:</Text>
      {receta.instrucciones.map((inst, index) => (
        <Text key={index}>{index + 1}. {inst}</Text>
      ))}
    </ScrollView>
  );
}
