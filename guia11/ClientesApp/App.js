import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AgregarCliente from './src/screens/AgregarCliente';
import DetalleCliente from './src/screens/DetalleCliente';
import ListaClientes from './src/screens/ListaClientes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListaClientes" component={ListaClientes} options={{ title: 'Clientes' }} />
        <Stack.Screen name="AgregarCliente" component={AgregarCliente} options={{ title: 'Agregar Cliente' }} />
        <Stack.Screen name="DetalleCliente" component={DetalleCliente} options={{ title: 'Detalle Cliente' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
