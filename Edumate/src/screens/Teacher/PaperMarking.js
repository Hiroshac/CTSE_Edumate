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
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../core/config'
import { getAuth } from 'firebase/auth'

const { brand, darkLight, primary } = colors


export const PaperMarking = ({ route, navigation }) => {
  const [paper, setPaper] = useState([])
  const [mark, setMark] = useState()
  const [comment, setComment] = useState()
  const [status, setStatus] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState([])
  const { id } = route.params
    const auth = getAuth()
    const user = auth.currentUser
  // const id = '636cbe0453ef6c69dc31e041'

  const loadMark = async () => {
    const q = doc(db, 'answer', id)
    const docSnap = await getDoc(q)
    console.log(docSnap.data())
    setPaper(docSnap.data())
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

  // }

  // const data = {
  //   answer_id: id,
  //   subject: paper.subject,
  //   grade: paper.grade,
  //   student_id: paper.student_id,
  //   mark,
  //   comment,
  //   markedBy: '636cbe0453ef6c69dc31e041',
  // }

  const addMarks = async () => {
    if (status !== 'Marked') {
      alert('Something went wrong!')
    } else if (mark > 100 || mark < 0) {
      alert('please enter number between 0 and 100')
    } else if (mark == '' || comment == '') {
      alert('please fill the given fields')
    } else {
      const linkDocRef = doc(db, 'answer', id)
      await updateDoc(linkDocRef, {
        subjectname: paper.subjectname,
        lname: paper.lname,
        grade: paper.grade,
        url: paper.url,
        username: paper.username,
        status: status,
      })
      addDoc(collection(db, 'marks'), {
        answer_id: id,
        subject: paper.subjectname,
        grade: paper.grade,
        student_id: paper.username,
        mark,
        comment,
        markedBy: user.email,
        userId:user.uid
      })
      alert('Mark added')
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
