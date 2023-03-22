import React, { useEffect, useState } from 'react'
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native'
import axios from 'axios'
import { Input } from '../../constants/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  SafeAreaView,
  colors,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledButtoWhite,
  ButtonTextWhite,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const UpdateStream = ({ route, navigation }) => {
  const [streamname , setStreamname ] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  const cid = route.params
  const id = cid.id

  useEffect(()=>{
    const url = `https://edumate-backend.herokuapp.com/stream/get/${id}`
    axios.get(url).then((res) => {
      setStreamname(res.data.streamname)
      console.log(res.data)
    }) 
  },[])

  const onChangeHandler = (e) => { 
  const data = { streamname }
    e.preventDefault()
    const url = `https://edumate-backend.herokuapp.com/stream/${id}`
    axios.put(url, data).then((res) => {
      console.log('done')
      alert('updated');
      navigation.navigate('getstreams')
    })
  }

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `
    return status + message
  }

  return (
    <StyledContainer>
    <Text style={styles.text}> Update Stream </Text>
      <InputCd
          placeholder='Stream Name'
          placeholderTextColor={darkLight}
          onChangeText={(streamname) => setStreamname(streamname)}
          value={streamname}
        />
      <StyledButton onPress={onChangeHandler}>
             <ButtonText>Update</ButtonText>
    </StyledButton>
  </StyledContainer>
  )
}

export const InputCd = ({ label, icon, ...props }) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      <RightIcon>
        <Octicons name={icon} size={30} color={brand} />
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