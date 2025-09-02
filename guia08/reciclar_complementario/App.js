import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1B5E20' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ title: 'Las 5R del Reciclaje' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}