import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetaSeleccionado: null
    };

    this.planetas = [
      {
        nombre: 'Mercurio',
        datos: 'Es el planeta más cercano al Sol y el más pequeño. Su superficie es rocosa y tiene grandes variaciones de temperatura.',
        distancia: '57.9 millones km',
        tamaño: '4,879 km de diámetro',
        imagen: require('./src/img/mercurio.jpg')
      },
      {
        nombre: 'Venus',
        datos: 'Similar en tamaño a la Tierra, pero con una atmósfera muy densa de dióxido de carbono y temperaturas extremas.',
        distancia: '108.2 millones km',
        tamaño: '12,104 km de diámetro',
        imagen: require('./src/img/venus.jpg')
      },
      {
        nombre: 'Tierra',
        datos: 'Nuestro hogar, el único planeta conocido con vida. Posee agua líquida y una atmósfera que regula el clima.',
        distancia: '149.6 millones km',
        tamaño: '12,742 km de diámetro',
        imagen: require('./src/img/tierra.jpg')
      },
      {
        nombre: 'Marte',
        datos: 'El planeta rojo. Tiene montañas y cañones enormes, y se estudia por su potencial para albergar vida en el pasado.',
        distancia: '227.9 millones km',
        tamaño: '6,779 km de diámetro',
        imagen: require('./src/img/marte.jpg')
      },
      {
        nombre: 'Júpiter',
        datos: 'El planeta más grande del sistema solar. Es un gigante gaseoso con una gran mancha roja (tormenta gigante).',
        distancia: '778.5 millones km',
        tamaño: '139,820 km de diámetro',
        imagen: require('./src/img/jupiter.jpg')
      },
      {
        nombre: 'Saturno',
        datos: 'Conocido por sus impresionantes anillos de hielo y roca. Es un gigante gaseoso.',
        distancia: '1,434 millones km',
        tamaño: '116,460 km de diámetro',
        imagen: require('./src/img/saturno.jpg')
      },
      {
        nombre: 'Urano',
        datos: 'Un gigante de hielo azul verdoso, gira de lado en comparación con los demás planetas.',
        distancia: '2,871 millones km',
        tamaño: '50,724 km de diámetro',
        imagen: require('./src/img/urano.jpg')
      },
      {
        nombre: 'Neptuno',
        datos: 'El planeta más lejano. Es un gigante de hielo con fuertes vientos y un color azul intenso.',
        distancia: '4,495 millones km',
        tamaño: '49,244 km de diámetro',
        imagen: require('./src/img/neptuno.jpg')
      }
    ];
  }

  abrirModal = (planeta) => {
    this.setState({ planetaSeleccionado: planeta });
  };

  cerrarModal = () => {
    this.setState({ planetaSeleccionado: null });
  };

  render() {
    const { planetaSeleccionado } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}> Explorar el Sistema Solar</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.planetas.map((planeta, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => this.abrirModal(planeta)}>
              <Image source={planeta.imagen} style={styles.imagen} />
              <Text style={styles.nombre}>{planeta.nombre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal visible={planetaSeleccionado !== null} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContenido}>
              {planetaSeleccionado && (
                <>
                  <Text style={styles.modalTitulo}>{planetaSeleccionado.nombre}</Text>
                  <Image source={planetaSeleccionado.imagen} style={styles.modalImagen} />
                  <Text style={styles.modalTexto}>{planetaSeleccionado.datos}</Text>
                  <Text style={styles.modalExtra}>Distancia al Sol: {planetaSeleccionado.distancia}</Text>
                  <Text style={styles.modalExtra}>Tamaño: {planetaSeleccionado.tamaño}</Text>
                  <TouchableOpacity style={styles.botonCerrar} onPress={this.cerrarModal}>
                    <Text style={styles.textoBoton}>Cerrar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f2d',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  titulo: {
    fontSize: 24,
    color: '#66fcf1',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#1c2340',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center'
  },
  imagen: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10
  },
  nombre: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContenido: {
    backgroundColor: '#1c2340',
    borderRadius: 15,
    padding: 20,
    width: '85%',
    alignItems: 'center'
  },
  modalTitulo: {
    fontSize: 22,
    color: '#66fcf1',
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalImagen: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 15
  },
  modalTexto: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 10
  },
  modalExtra: {
    fontSize: 15,
    color: '#f0f0f0',
    marginBottom: 5
  },
  botonCerrar: {
    marginTop: 15,
    backgroundColor: '#ff4c4c',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
