import { Input } from '@rneui/themed';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

const uri = 'URI_CREADA';

const AgregarCliente = ({ navigation }) => {
  const [cliente, setCliente] = useState({
    nombre: '',
    direccionPostal: '',
    direccionTrabajo: '',
    telefono: '',
    correo: '',
    nivelEconomico: '',
    posibilidadesCompra: '',
    intereses: '',
  });

  const guardar = () => {
    if (!cliente.nombre || !cliente.telefono || !cliente.correo) {
      Alert.alert("Error", "Nombre, teléfono y correo son obligatorios.");
      return;
    }

    fetch(`${uri}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    })
      .then(res => res.json())
      .then(() => {
        Alert.alert("Éxito", "Cliente agregado con éxito");
        navigation.goBack();
      })
      .catch(err => Alert.alert("Error", err.message));
  };

  return (
    <ScrollView style={styles.container}>
      <Input label="Nombre y Apellidos" value={cliente.nombre}
        onChangeText={text => setCliente({ ...cliente, nombre: text })} />

      <Input label="Dirección Postal" value={cliente.direccionPostal}
        onChangeText={text => setCliente({ ...cliente, direccionPostal: text })} />

      <Input label="Dirección de Trabajo" value={cliente.direccionTrabajo}
        onChangeText={text => setCliente({ ...cliente, direccionTrabajo: text })} />

      <Input label="Teléfono" value={cliente.telefono}
        onChangeText={text => setCliente({ ...cliente, telefono: text })} />

      <Input label="Correo" value={cliente.correo}
        onChangeText={text => setCliente({ ...cliente, correo: text })} />

      <Input label="Nivel Económico" value={cliente.nivelEconomico}
        onChangeText={text => setCliente({ ...cliente, nivelEconomico: text })} />

      <Input label="Posibilidades de Compra" value={cliente.posibilidadesCompra}
        onChangeText={text => setCliente({ ...cliente, posibilidadesCompra: text })} />

      <Input label="Intereses" value={cliente.intereses}
        onChangeText={text => setCliente({ ...cliente, intereses: text })} />

      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>Guardar Cliente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  button: { height: 50, backgroundColor: 'green', borderRadius: 5, justifyContent: 'center', marginTop: 15 },
  buttonText: { color: 'white', fontSize: 18, textAlign: 'center' },
});

export default AgregarCliente;
