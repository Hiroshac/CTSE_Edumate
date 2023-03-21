import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './src/screen/student/Home';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <View style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
      <Text>Edumate Application Join for develop the new world</Text>
      <Text>Wellcome to new world</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
