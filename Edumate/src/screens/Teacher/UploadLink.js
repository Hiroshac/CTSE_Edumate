import React, { useEffect, useState } from 'react'
import { View, Button } from 'react-native'
import axios from 'axios'
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
import { Octicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

const { brand, darkLight, primary } = colors

export const UploadLink = ({navigation}) => {
  const [subject, setSubject] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [lesson_name, setLesson] = useState('')
  const [grade, setGrade] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('')
  const [link, setLink] = useState('')
  const [teacher_id, setTeacher] = useState('')

  const validateDate = date
  var linkDate = validateDate.toLocaleDateString('en-GB')

  var linkTime = validateDate.toLocaleTimeString('en-GB')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
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

  const data = {
    subject: selectedSubject,
    lesson_name,
    grade,
    date: linkDate,
    time: linkTime,
    link,
    teacher_id: '515',
  }

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

  const onChangeHandler = () => {
    if (lesson_name == '' || grade == '' || link == '') {
      alert('Please fill the given fields')
    } else {
      const url = `https://edumate-backend.herokuapp.com/link/add`
      axios.post(url, data).then((res) => {
        alert('Link added')
        navigation.navigate('TeacherDash')
      })
    }
  }

  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <PageTitle>Upload Link</PageTitle>
      <InnerContainer>
        <View>
          <View>
            <Picker
              selectedValue={subject}
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
              // onChangeText={(date) => setDate(date)}
              value={date.toLocaleDateString()}
            />

            <InputCd
              type='time'
              icon='clock'
              placeholder='Time'
              placeholderTextColor={darkLight}
              command={showTimepicker}
              // onChangeText={(time) => setTime(time)}
              value={date.toLocaleTimeString()}
            />

            <InputCd
              icon='link'
              placeholder='Link'
              placeholderTextColor={darkLight}
              onChangeText={(link) => setLink(link)}
              value={link}
            />
            <StyledButton onPress={onChangeHandler}>
              <ButtonText>Upload</ButtonText>
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
