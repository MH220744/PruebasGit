import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';

export const VideoPlayerComponent = () => {
  const [videoUri, setVideoUri] = useState(null);

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'video/*',
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets.length > 0) {
      setVideoUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar Video" onPress={pickVideo} />
      {videoUri ? (
        <Video
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      ) : (
        <Text style={styles.placeholderText}>No hay video seleccionado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  placeholderText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 16,
  },
});
