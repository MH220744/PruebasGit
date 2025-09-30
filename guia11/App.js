import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListarProductos from './components/ListarProductos';
import PaginaAgregar from './components/PaginaAgregar';
import PaginaDetalle from './components/PaginaDetalle';
import PantallaInicio from './components/PantallaInicio';
const Stack = createStackNavigator();
function MyStack() {
return (
<Stack.Navigator>
<Stack.Screen name="PantallaInicio" component={PantallaInicio} options={{
headerShown: false }} />
<Stack.Screen name="ListarProductos" component={ListarProductos} options={{
headerShown: false }} />
<Stack.Screen name="PaginaDetalle" component={PaginaDetalle} />
<Stack.Screen name="PaginaAgregar" component={PaginaAgregar} />
</Stack.Navigator>
);
}
export default function App() {
return (
<NavigationContainer>
<MyStack/>
</NavigationContainer>
)
}