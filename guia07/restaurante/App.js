import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Formulario from './components/Formulario';
import Reserva from './components/Reserva';

const App = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerReservasStorage = async () => {
      try {
        const reservasStorage = await AsyncStorage.getItem('reservas');
        if (reservasStorage) {
          setReservas(JSON.parse(reservasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerReservasStorage();
  }, []);

  const guardarReservasStorage = async (reservasJSON) => {
    try {
      await AsyncStorage.setItem('reservas', reservasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarReserva = (id) => {
    const reservasFiltradas = reservas.filter((reserva) => reserva.id !== id);
    setReservas(reservasFiltradas);
    guardarReservasStorage(JSON.stringify(reservasFiltradas));
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>📌 Reservas del Restaurante</Text>

      <TouchableHighlight
        onPress={() => setMostrarForm(!mostrarForm)}
        style={styles.btnMostrarForm}>
        <Text style={styles.textoBtn}>
          {mostrarForm ? 'Cancelar Reserva' : 'Crear Nueva Reserva'}
        </Text>
      </TouchableHighlight>

      <View style={styles.contenido}>
        {mostrarForm ? (
          <Formulario
            reservas={reservas}
            setReservas={setReservas}
            setMostrarForm={setMostrarForm}
            guardarReservasStorage={guardarReservasStorage}
          />
        ) : (
          <>
            <Text style={styles.subtitulo}>
              {reservas.length > 0
                ? 'Listado de Reservas'
                : 'No hay reservas, agrega una'}
            </Text>

            <FlatList
              style={styles.listado}
              data={reservas}
              renderItem={({ item }) => (
                <Reserva item={item} eliminarReserva={eliminarReserva} />
              )}
              keyExtractor={(reserva) => reserva.id}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginTop: 20,
  },
  listado: {
    marginTop: 10,
  },
  btnMostrarForm: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginVertical: 10,
  },
  textoBtn: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default App;
