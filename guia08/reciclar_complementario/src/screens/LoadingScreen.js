import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';

const mensajes = [
  {
    titulo: 'Rechazar',
    texto: 'Evitar productos que generan residuos innecesarios.',
  },
  {
    titulo: 'Reducir',
    texto: 'Minimizar el consumo y el desperdicio.',
  },
  {
    titulo: 'Reutilizar',
    texto: 'Dar una segunda vida a los objetos.',
  },
  {
    titulo: 'Reciclar',
    texto: 'Transformar residuos en nuevos productos.',
  },
  {
    titulo: 'Recuperar',
    texto: 'Aprovechar materiales para energía u otros usos.',
  },
];

export default function LoadingScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const mostrar = () => {
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    };

    mostrar();

    const timer = setInterval(() => {
      if (index < mensajes.length - 1) {
        setIndex((i) => i + 1);
        opacity.setValue(0);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }).start();
      } else {
        clearInterval(timer);
        setTimeout(() => navigation.replace('Inicio'), 450);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [index, navigation, opacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />
      <Animated.View style={{ opacity }}>
        <Text style={styles.title}>{mensajes[index].titulo}</Text>
        <Text style={styles.text}>{mensajes[index].texto}</Text>
      </Animated.View>
      <View style={styles.progressWrap}>
        {mensajes.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i <= index ? styles.dotActive : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#E8F5E9',
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  text: {
    color: '#E8F5E9',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressWrap: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: {
    backgroundColor: '#C8E6C9',
  },
});
