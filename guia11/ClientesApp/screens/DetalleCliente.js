import { Input } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const uri = 'URI_CREADA';

const DetalleCliente = ({ route, navigation }) => {
  const { id } = route.params;
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);

  const obtenerCliente = async () => {
    try {
      const res = await fetch(`${uri}/clientes/${id}`);
      const data = await res.json();
      setCliente(data);
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerCliente();
  }, []);

  const actualizar = () => {
    fetch(`${uri}/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    })
      .then(res => res.json())
      .then(() => {
        Alert.alert("Éxito", "Cliente actualizado");
        navigation.goBack();
      })
      .catch(err => Alert.alert("Error", err.message));
  };

  const eliminar = () => {
    Alert.alert("Eliminar", "¿Seguro que deseas eliminar?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => {
        fetch(`${uri}/clientes/${id}`, { method: 'DELETE' })
          .then(() => {
            Alert.alert("Eliminado", "Cliente eliminado");
            navigation.goBack();
          })
          .catch(err => Alert.alert("Error", err.message));
      }},
    ]);
  };

  if (cargando) {
    return <ActivityIndicator size="large" color="blue" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!cliente) return <Text>No se encontró cliente</Text>;

  return (
    <ScrollView style={styles.container}>
      <Input label="Nombre" value={cliente.nombre}
        onChangeText={(text) => setCliente({ ...cliente, nombre: text })} />
      <Input label="Correo" value={cliente.correo}
        onChangeText={(text) => setCliente({ ...cliente, correo: text })} />
      <Input label="Teléfono" value={cliente.telefono}
        onChangeText={(text) => setCliente({ ...cliente, telefono: text })} />
      <Input label="Dirección Postal" value={cliente.direccionPostal}
        onChangeText={(text) => setCliente({ ...cliente, direccionPostal: text })} />
      <Input label="Dirección Trabajo" value={cliente.direccionTrabajo}
        onChangeText={(text) => setCliente({ ...cliente, direccionTrabajo: text })} />
      <Input label="Nivel Económico" value={cliente.nivelEconomico}
        onChangeText={(text) => setCliente({ ...cliente, nivelEconomico: text })} />
      <Input label="Posibilidades de Compra" value={cliente.posibilidadesCompra}
        onChangeText={(text) => setCliente({ ...cliente, posibilidadesCompra: text })} />
      <Input label="Intereses" value={cliente.intereses}
        onChangeText={(text) => setCliente({ ...cliente, intereses: text })} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={actualizar}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={eliminar}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { flex: 1, margin: 5, backgroundColor: 'black', padding: 15, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16 },
});

export default DetalleCliente;
