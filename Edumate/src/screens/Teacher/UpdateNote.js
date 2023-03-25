import React, { useEffect, useState } from 'react'
import { View, Platform, ToastAndroid, Alert } from 'react-native'
import { Input } from '../../constants/InputField'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  colors,
  ButtonTextWhite,
  UploadButton,
  UploadingButton,
  SubTitle,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { UploadFile } from '../../../core/fileUpload'
import { LogBox } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { Picker } from '@react-native-picker/picker'
import {
  doc,
  updateDoc,
  collection,
  query,
  getDoc,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../../../core/config'

LogBox.ignoreLogs(['Setting a timer'])

const { brand, darkLight, primary } = colors


export const UpdateNote = ({ route, navigation }) => {
  const [subject, setSubject] = useState([])
  const [lesson_name, setLesson] = useState('')
  const [grade, setGrade] = useState('')
  const [note, setNote] = useState()
  const [teacher_id, setTeacher] = useState()
  const { id } = route.params

  const [blobFile, setBlobFile] = useState(null)
  const [fileName, setFileName] = useState('No Files')
  const [isChoosed, setIsChoosed] = useState(false)
  const [uploadCompleted, isUploadCompleted] = useState(false)
  const [uploadStart, setUploadStart] = useState(false)

  var file = ''
  AsyncStorage.getItem('file').then((value) => {
    file = value
  })

  useEffect(() => {
    if (uploadCompleted) {
      //  showToastWithGravityAndOffset('Document Saved SuccessFully')
      clearFiles()
    }
  }, [uploadCompleted])

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({})

    if (result != null) {
      const r = await fetch(result.uri)

      const b = await r.blob()
      setFileName(result.name)
      setBlobFile(b)
      setIsChoosed(true)
    }
  }

  const clearFiles = () => {
    setFileName('No Files')
    setBlobFile(null)
    setIsChoosed(false)
  }

  const uploadFile = () => {
    if (blobFile) {
      // showToastWithGravityAndOffset('Uploading File....')
      setUploadStart(true)
      UploadFile(blobFile, fileName, isUploadCompleted)
      clearFiles()
    }
  }

  // const showToastWithGravityAndOffset = (msg = '') => {
  //   ToastAndroid.showWithGravityAndOffset(
  //     msg,
  //     ToastAndroid.LONG,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50
  //   )
  // }

  const loadNote = async () => {
    const q = doc(db, 'notes', id)
    const docSnap = await getDoc(q)
    setSubject(docSnap.data().subject)
    setLesson(docSnap.data().lesson_name)
    setGrade(docSnap.data().grade)
    setNote(docSnap.data().note)
  }

  useEffect(() => {
    loadNote()
  }, [])

  const onChangeHandler = async() => {
    uploadFile()
    const data = {
      subject,
      lesson_name,
      grade,
      note: file,
      teacher_id,
    }
     const linkDocRef = doc(db, 'notes', id)
    await updateDoc(linkDocRef, 
     {subject,
      lesson_name,
      grade,
      note: file,
      teacher_id,}
    )
    alert('Updated')
    navigation.navigate('TeacherDash')
  }

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Update Note</PageTitle>
      <InnerContainer>
        <View>
          <View>
            <InputCd
              placeholder='Subject'
              disabled
              placeholderTextColor={darkLight}
              value={subject}
            />
            <InputCd
              placeholder='Lesson name'
              placeholderTextColor={darkLight}
              name='lesson_name'
              onChangeText={(lesson_name) => setLesson(lesson_name)}
              value={lesson_name}
            />
            <Picker
              selectedValue={grade}
              onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
            >
              <Picker.Item label='12 Grade' value={12} />
              <Picker.Item label='13 Grade' value={13} />
            </Picker>

            <UploadButton>
              <UploadingButton onPress={() => pickDocument()}>
                <SubTitle>{note}</SubTitle>
                <Octicons size={30} color={brand} name='upload' />
                <ButtonTextWhite>Upload File Here {fileName}</ButtonTextWhite>
              </UploadingButton>
            </UploadButton>
            <StyledButton onPress={onChangeHandler}>
              <ButtonText>Update</ButtonText>
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
