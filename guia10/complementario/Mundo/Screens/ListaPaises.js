import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, TextInput } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ListaPaises = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState(""); 
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://65f9be823909a9a65b1942ac.mockapi.io/paises');
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSearch = (text) => {
  setSearchText(text);
  const filtered = countries.filter(item =>
    (item.nombre?.espanol?.toLowerCase().includes(text.toLowerCase())) ||
    (item.codigo && item.codigo.toLowerCase().includes(text.toLowerCase()))
  );
  setFilteredCountries(filtered);
};


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryCard}
      onPress={() => navigation.navigate('DetallePais', { country: item })}
    >
      <View style={styles.countryInfo}>
        <Image source={{ uri: item.bandera }} style={styles.flagImage} />
        <Text style={styles.countryName}>{item.nombre.espanol}</Text>
        <Text>{item.codigo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar por nombre o código..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredCountries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.countryList}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
  },
  countryList: {
    padding: 10,
  },
  countryCard: {
    width: windowWidth / 2 - 15,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  countryInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  flagImage: {
    width: '100%',
    aspectRatio: 2,
    resizeMode: 'cover',
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ListaPaises;
