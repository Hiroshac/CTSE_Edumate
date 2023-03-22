import React, { useEffect, useState } from 'react'
import { View, Platform, ToastAndroid, Alert } from 'react-native'
import axios from 'axios'
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

LogBox.ignoreLogs(['Setting a timer'])

const { brand, darkLight, primary } = colors

const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000'

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

  var userId = ''
  AsyncStorage.getItem('user').then((value) => {
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
    axios
      .post('https://edumate-backend.herokuapp.com/subject/stream', {
        streamname: userStream,
      })
      .then((res) => {
        setSubject(res.data)
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

  // const showToastWithGravityAndOffset = (msg = '') => {
  //   ToastAndroid.showWithGravityAndOffset(
  //     msg,
  //     ToastAndroid.LONG,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50
  //   )
  // }

  const onChangeHandler = async () => {
    if (subject == '' || lesson_name == '' || grade == '' || note == '') {
      alert('Please fill the given fields')
    } else {
      uploadFile()
      const data = {
        subject: selectedSubject,
        lesson_name,
        grade,
        note: file,
        teacher_id: userId,
      }
      const url = `https://edumate-backend.herokuapp.com/teacherNote/add`
      await axios.post(url, data).then((res) => {
        alert('Note added')
        navigation.navigate('TeacherDash')
      })
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
              value={selectedSubject}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSubject(itemValue)
              }
            >
              {subject.map((sub) => {
                return (
                  <Picker.Item
                    label={sub.subjectname}
                    value={sub.subjectname}
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
