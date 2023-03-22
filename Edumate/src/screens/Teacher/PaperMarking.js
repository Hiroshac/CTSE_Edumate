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
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledButtoWhite,
  ButtonTextWhite,
  StyledTextInputComment,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { async } from '@firebase/util'

const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

export const PaperMarking = ({ route, navigation }) => {
  const [paper, setPaper] = useState([])
  const [mark, setMark] = useState()
  const [comment, setComment] = useState()
  const [status, setStatus] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState([])
  const { id } = route.params

  // const id = '636cbe0453ef6c69dc31e041'

  const loadMark = async () => {
    const url = `https://edumate-backend.herokuapp.com/StudentAnswers/get/${id}}`
    axios.get(url).then((res) => {
      setPaper(res.data)
    })
  }

  useEffect(() => {
    loadMark()
  }, [])

  // const updateStatus = (event) => {
  //   setStatus(event.target.value)
  //   const data = {
  //     subject: paper.subject,
  //     lname: paper.lname,
  //     grade: paper.grade,
  //     date: paper.date,
  //     time: paper.time,
  //     file: paper.file,
  //     student_id: paper.student_id,
  //     status: event.target.value,
  //   }

  //   axios.put(
  //     `https://edumate-backend.herokuapp.com/StudentAnswers/${id}`,
  //     data
  //   )
  // }

  const data = {
    answer_id: id,
    subject: paper.subject,
    grade: paper.grade,
    student_id: paper.student_id,
    mark,
    comment,
    markedBy: '636cbe0453ef6c69dc31e041',
  }

  const addMarks = async () => {
   
    if (status !== 'Marked') {
      alert('Something went wrong!')
    } else if (mark > 100 || mark < 0) {
      alert('please enter number between 0 and 100')
    } else if(  
    mark==''||
    comment==''
    ){
      alert('please fill the given fields')
    }
    
    else {
      await axios.post('https://edumate-backend.herokuapp.com/mark/add/', data)
      // alert('succesfully marked')
      alert('Marks added')
      navigation.navigate('Answer')
    }
  }

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `
    return status + message
  }

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Paper Marking</PageTitle>
      <InnerContainer>
        <View>
          <View>
            <Picker
              selectedValue={status}
              // onChangeText={updateStatus()}
              onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
            >
              <Picker.Item label='None' value='None' />
              <Picker.Item label='Marking' value='Marking' />
              <Picker.Item label='Marked' value='Marked' />
            </Picker>
            <InputCd
              placeholder='Mark'
              placeholderTextColor={darkLight}
              onChangeText={(mark) => setMark(mark)}
              value={mark}
              keyboardType='numeric'
            />
            <InputCdComment
              placeholder='Comment'
              placeholderTextColor={darkLight}
              onChangeText={(comment) => setComment(comment)}
              value={comment}
            />

            <StyledButton onPress={addMarks}>
              <ButtonText>Mark</ButtonText>
            </StyledButton>
          </View>
        </View>
      </InnerContainer>
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

export const InputCdComment = ({ label, icon, ...props }) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInputComment {...props} />
      <RightIcon>
        <Octicons name={icon} size={30} color={brand} />
      </RightIcon>
    </View>
  )
}
