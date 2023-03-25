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
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../core/config'

const { brand, darkLight, primary } = colors


export const AddStreams = ({navigation}) => {

  const [streamname, setStreamname] = useState('')

  const onChangeHandler = async() => {
    await addDoc(collection(db,"stream"),{
    streamname:streamname,
  }
  );
  alert("Stream Added!")
  navigation.navigate("getstreams")
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
