import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native'
import axios from 'axios'
import { Input } from '../../constants/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  colors,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'

const { brand, darkLight, primary } = colors


export const AddStreams = ({navigation}) => {

  const [streamname, setStreamname] = useState('')

  const formData = {streamname}

  const onChangeHandler = () => {
    const url = `https://edumate-backend.herokuapp.com/stream/add`
    axios.post(url, formData).then((res) => {
      console.log('done')
      alert('Stream added')
      navigation.navigate('getstreams')
    })
  }
 
    const getMessage = () => {
      const status = isError ? `Error: ` : `Success: `
      return status + message
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}> Add Stream </Text>
          <InputCd
              placeholder='Stream Name'
              placeholderTextColor={darkLight}
              value={streamname}
              onChangeText={(streamname) => setStreamname(streamname)}
            />
          <StyledButton onPress={onChangeHandler}>
                 <ButtonText>Add</ButtonText>
        </StyledButton>
      </SafeAreaView>
    );
    
}


export const InputCd = ({ label, icon, ...props }) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon>
        <Octicons name={icon} size={30}  />
      </RightIcon>
    </View>
  )
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontSize:30,
  },
});


// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }