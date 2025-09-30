import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const uri = 'URI_CREADA'; 

const ListaClientes = ({ navigation }) => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerClientes = async () => {
    try {
      const response = await fetch(`${uri}/clientes`);
      const data = await response.json();
      setClientes(data.clientes || []);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', obtenerClientes);
    return unsubscribe;
  }, [navigation]);

  if (cargando) {
    return <ActivityIndicator size="large" color="blue" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AgregarCliente')}>
        <Text style={styles.addText}>+ Agregar Cliente</Text>
      </TouchableOpacity>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DetalleCliente', { id: item.id })}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text>{item.correo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  addButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  addText: { color: 'white', textAlign: 'center', fontSize: 18 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  nombre: { fontSize: 18, fontWeight: 'bold' },
});

export default ListaClientes;
