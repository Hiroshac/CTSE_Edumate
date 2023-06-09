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
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { UploadFile } from '../../../core/fileUpload'
import { LogBox } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { Picker } from '@react-native-picker/picker'
import {
  collection,
  addDoc,
  Timestamp,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../../core/config.js'
import { getAuth } from 'firebase/auth'

LogBox.ignoreLogs(['Setting a timer'])

const { brand, darkLight, primary } = colors

export const UploadNote = ({ navigation }) => {
  const [subject, setSubject] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [lesson_name, setLesson] = useState('')
  const [grade, setGrade] = useState('')
  const [note, setNote] = useState()
  const [teacher_id, setTeacher] = useState()

  const [blobFile, setBlobFile] = useState(null)
  const [fileName, setFileName] = useState('No Files')
  const [isChoosed, setIsChoosed] = useState(false)
  const [uploadCompleted, isUploadCompleted] = useState(false)
  const [uploadStart, setUploadStart] = useState(false)
  const auth = getAuth()
  const user = auth.currentUser
  // console.log(user.uid)
  var userId = ''
  AsyncStorage.getItem('@user').then((value) => {
    userId = value
  })

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

  const userStream = 'Science'
  const loadSubject = () => {
    const q = query(collection(db, 'stream'))
    onSnapshot(q, (querySnapshot) => {
      setSubject(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }

  useEffect(() => {
    loadSubject()
  }, [])

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

  const onChangeHandler = async () => {
    if (lesson_name == '' || grade == '' || note == '') {
      alert('Please fill the given fields')
    } else {
      uploadFile()
      addDoc(collection(db, 'notes'), {
        subject: selectedSubject,
        lesson_name,
        grade,
        note: file,
        teacher_id: userId,
        created: Timestamp.now(),
      })
      alert('Note added')
      navigation.navigate('TeacherDash')
    }
  }

  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `
    return status + message
  }

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Upload Note</PageTitle>
      <InnerContainer>
        <View>
          <View>
            <Picker
              selectedValue={selectedSubject}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSubject(itemValue)
              }
            >
              {subject.map((sub) => {
                return (
                  <Picker.Item
                    label={sub.data.streamname}
                    value={sub.data.streamname}
                  />
                )
              })}
            </Picker>
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
              <Picker.Item label='Select the Grade' />
              <Picker.Item label='12 Grade' value={12} />
              <Picker.Item label='13 Grade' value={13} />
            </Picker>

            <UploadButton>
              <UploadingButton onPress={() => pickDocument()}>
                <Octicons size={30} color={brand} name='upload' />
                <ButtonTextWhite>Upload File Here {fileName}</ButtonTextWhite>
              </UploadingButton>
            </UploadButton>
            <StyledButton onPress={onChangeHandler}>
              <ButtonText>Upload</ButtonText>
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
