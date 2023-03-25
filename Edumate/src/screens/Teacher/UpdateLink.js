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
  PageTitle,
  RightIcon,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  StyledTextInput,
  colors,
} from '../../constants/styles.js'
import { StatusBar } from 'expo-status-bar'
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
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

const { brand, darkLight, primary } = colors


export const UpdateLink = ({ route, navigation }) => {
  const [dataLinks, setDateLinks] = useState([])
  const [subject, setSubject] = useState('')
  const [lesson_name, setLesson] = useState('')
  const [grade, setGrade] = useState()
  const [date, setDate] = useState()
  const [d, setD] = useState(new Date())
  const [time, setTime] = useState()
  const [link, setLink] = useState('')
  const [teacher_id, setTeacher] = useState('')
  const { id } = route.params
  console.log(id)
  // const id = '636cbe0453ef6c69dc31e041'

  const validateDate = d
  var linkDate = validateDate.toLocaleDateString('en-GB')
  var linkTime = validateDate.toLocaleTimeString('en-GB')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(null)
    setTime(null)
    setD(currentDate)
  }

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: d,
      onChange,
      mode: currentMode,
    })
  }
  const showDatepicker = () => {
    showMode('date')
  }
  const showTimepicker = () => {
    showMode('time')
  }

  const loadLink = async () => {
    const q = doc(db, 'links', id)
    const docSnap = await getDoc(q)

    // console.log(docSnap.data())
    setSubject(docSnap.data().subject)
    setLesson(docSnap.data().lesson_name)
    setGrade(docSnap.data().grade)
    setDate(docSnap.data().date)
    setTime(docSnap.data().time)
    setLink(docSnap.data().link)
    setTeacher(docSnap.data().teacher_id)
    // onSnapshot(q, (querySnapshot) => {
    //   setDateLinks(
    //     querySnapshot.docs.map((doc) => ({
    //       doc: doc.data(),
    //     })),
    //   )
    // console.log(data)
    // })
  }

  useEffect(() => {
    loadLink()
  }, [])

  const onChangeHandler = async (e) => {
    const data = {
      subject,
      lesson_name,
      grade,
      date: linkDate,
      time: linkTime,
      link,
      teacher_id,
    }
    e.preventDefault()
  
    const linkDocRef = doc(db, 'links', id)
    await updateDoc(linkDocRef, {
      subject,
      lesson_name,
      grade,
      date: linkDate,
      time: linkTime,
      link,
      teacher_id,
    })
    alert('Updated')
    navigation.navigate('TeacherDash')
  }

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Update Link</PageTitle>
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
            <InputCd
              type='date'
              icon='calendar'
              placeholder='Date'
              placeholderTextColor={darkLight}
              command={showDatepicker}
              // onChangeText={(date) => setD(date)}
              value={date == null ? d.toLocaleDateString() : date}
            />

            <InputCd
              type='time'
              icon='clock'
              placeholder='Time'
              placeholderTextColor={darkLight}
              command={showTimepicker}
              // onChangeText={(time) => setD(time)}
              value={time == null ? d.toLocaleTimeString() : time}
            />

            <InputCd
              icon='link'
              placeholder='Link'
              placeholderTextColor={darkLight}
              onChangeText={(link) => setLink(link)}
              value={link}
            />
            <StyledButton onPress={onChangeHandler}>
              <ButtonText>Update</ButtonText>
            </StyledButton>
          </View>
        </View>
      </InnerContainer>
    </StyledContainer>
  )
}

export const InputCd = ({ label, icon, command, ...props }) => {
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
