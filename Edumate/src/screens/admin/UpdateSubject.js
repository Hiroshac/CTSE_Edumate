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
  colors,
  SafeAreaView,
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

export const UpdateSubject = ({ route, navigation }) => {
  const [streamname, setStreamname] = useState('')
  const [subjectname, setSubjectname] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const  id  = route.params.id

  useEffect(()=>{
    const url = `https://edumate-backend.herokuapp.com/subject/get/${id}`
    axios.get(url).then((res) => {
      setStreamname(res.data.streamname)
      setSubjectname(res.data.subjectname )
    })
  },[])

  const data = {
    streamname,
    subjectname,
  }

  const onChangeHandler = (e) => {
    e.preventDefault()
    const url = `https://edumate-backend.herokuapp.com/subject/${id}`
    console.log(data);
    axios.put(url, data).then((res) => {
      alert('updated');
      navigation.navigate("getsubjects")
    })
  }

  return (
    <StyledContainer>
    <Text style={styles.text}> Update Subject </Text>
    <InputCd
              placeholder='Stream Name'
              placeholderTextColor={darkLight}
              onChangeText={(streamname) => setStreamname(streamname)}
              value={streamname}
            />
              <InputCd
              placeholder='Subject Name'
              placeholderTextColor={darkLight}
              onChangeText={(subjectname) => setSubjectname(subjectname)}
              value={subjectname}
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