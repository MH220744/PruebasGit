import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { Picker } from '@react-native-picker/picker';

const Formulario = ({ reservas, setReservas, setMostrarForm, guardarReservasStorage }) => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState('');
  const [seccion, setSeccion] = useState('No fumadores');

  const crearReserva = () => {
    if (nombre.trim() === '' || fecha.trim() === '' || hora.trim() === '' || personas.trim() === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const reserva = {
      id: uuid.v4(),
      nombre,
      fecha,
      hora,
      personas,
      seccion,
    };

    const nuevasReservas = [...reservas, reserva];
    setReservas(nuevasReservas);
    guardarReservasStorage(JSON.stringify(nuevasReservas));
    setMostrarForm(false);
  };

  return (
    <View style={styles.formulario}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} onChangeText={setNombre} value={nombre} />

      <Text style={styles.label}>Fecha (DD/MM/AAAA):</Text>
      <TextInput style={styles.input} onChangeText={setFecha} value={fecha} />

      <Text style={styles.label}>Hora (HH:MM):</Text>
      <TextInput style={styles.input} onChangeText={setHora} value={hora} />

      <Text style={styles.label}>Cantidad de personas:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setPersonas}
        value={personas}
      />

      <Text style={styles.label}>Sección:</Text>
      <Picker selectedValue={seccion} onValueChange={(valor) => setSeccion(valor)}>
        <Picker.Item label="No fumadores" value="No fumadores" />
        <Picker.Item label="Fumadores" value="Fumadores" />
      </Picker>

      <Button title="Guardar Reserva" onPress={crearReserva} />
    </View>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
});

export default Formulario;
