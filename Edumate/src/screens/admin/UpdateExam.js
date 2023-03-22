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
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'


const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const UpdateExam = ({  navigation, route }) => {

    const [day, setDay] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [stream, setStream] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    
  const cid = route.params
  const id = cid.id

  useEffect(()=>{
    const url = `https://edumate-backend.herokuapp.com/examtime/${id}`
    axios.get(url).then((res) => {
      setStream(res.data.stream )
      setSubject(res.data.subject)
      setStart(res.data.start)
      setEnd(res.data.end)
      setDay(res.data.day)
      setGrade(res.data.grade)
      console.log(res.data)
    })
  },[])


  const onChangeHandler = (e) => {
    const data = {day, start, end, stream, subject, grade}
    e.preventDefault()
    const url = `https://edumate-backend.herokuapp.com/examtime/${id}`
    axios.put(url, data).then((res) => {
      alert('updated');
      navigation.navigate('getexams');

    })
  }

  return (
        <StyledContainer >
        <Text style={styles.text}> Update Exam </Text>
          <InputCd
              placeholder='Date'
              icon='calendar'
              placeholderTextColor={darkLight}
              onChangeText={(day) => setDay(day)}
              value={day}
            />
           <InputCd
              placeholder='Start time'
              icon='clock'
              placeholderTextColor={darkLight}
              onChangeText={(start) => setStart(start)}
              value={start}
            />
           <InputCd
              placeholder='End time'
              icon='clock'
              placeholderTextColor={darkLight}
              onChangeText={(end) => setEnd(end)}
              value={end}
            />
            <InputCd
              placeholder='Stream'
              placeholderTextColor={darkLight}
              onChangeText={(stream) => setStream(stream)}
              value={stream}
            />
            <InputCd
              placeholder='Subject'
              placeholderTextColor={darkLight}
              onChangeText={(subject) => setLesson(subject)}
              value={subject}
            />
            <Picker
              placeholder='Grade'
              selectedValue={grade}
              value={grade}
              onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
            >
              <Picker.Item label='12 Grade' value={12} />
              <Picker.Item label='13 Grade' value={13} />
            </Picker>

            <StyledButton  onPress={onChangeHandler}>
                <ButtonText>Update</ButtonText>
           </StyledButton>
        </StyledContainer>
  )
}

export const InputCd = ({ label, icon,command, ...props }) => {
  return (
    <View>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledTextInput {...props} />
    <RightIcon onPress={command}>
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