import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { getRecetas } from './api';

export default function ExplorarScreen({ navigation }) {
  const [recetas, setRecetas] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getRecetas().then(data => setRecetas(data));
  }, []);

  const filteredRecetas = recetas.filter(r =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.ingredientes.some(i => i.ingrediente.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Buscar receta..."
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, borderRadius: 5, padding: 5, marginBottom: 10 }}
      />

      <FlatList
        data={filteredRecetas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detalle', { receta: item })}>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
              <Image source={{ uri: item.imagen }} style={{ width: 80, height: 80, marginRight: 10, borderRadius: 5 }} />
              <Text style={{ fontSize: 16 }}>{item.nombre}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
