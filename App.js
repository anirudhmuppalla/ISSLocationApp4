import HomeScreen from './screens/HomeScreen';
import ISSLocationScreen from './screens/ISSLocationScreen';
import MeteorScreen from './screens/MeteorScreen';
import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import UpdateScreen from './screens/UpdateScreen';


const Stack =createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="home" component={HomeScreen}/>
        <Stack.Screen name="ISSLocation" component={ISSLocationScreen}/>
        <Stack.Screen name="Meteor" component={MeteorScreen}/>
        <Stack.Screen name="Update" component={UpdateScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
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