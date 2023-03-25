import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  colors,
  StyledTextInputField,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  MsgBox,
  RightIcon,
} from '../../constants/styles'
import ProfileUpper from './ProfileUpper'
import { Octicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../../core/config'
const { darkLight, black, brand } = colors

var userId = 'MdaHUyN5DV2gCB8E3rgB'
// AsyncStorage.getItem('user').then((value) => {
//   userId = value
// })

export default function UpdateProfile({ navigation }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState()
  const [date, setDate] = useState(new Date())

  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  const validateDate = date
  var linkDate = validateDate.toLocaleDateString('en-US')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDob(null)
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

  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    const q = doc(db, 'user', userId)
    const docSnap = await getDoc(q)
    const res = docSnap.data()
    setFirstName(res.firstName)
    setLastName(res.lastName)
    setEmail(res.email)
    setDob(res.dateOfBirth)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleMessage(null)
    if (linkDate == new Date().toLocaleDateString('en-US')) {
      linkDate = dob
    }
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: linkDate,
    }
    if (data.firstName == '' || data.lastName == '' || data.email == '') {
      handleMessage('Please fill all the fields', 'FAILED')
    } else {
      const userDocRef = doc(db, 'user', userId)
      await updateDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dateOfBirth: linkDate,
      })
        .then((res) => {
          alert('Profile successfully updated')
          navigation.navigate('Profile')
        })
        .catch((err) => {
          console.log(err)
          setTimeout(() => {
            handleMessage('An error occured. Please try again!')
          }, 3000)
          handleMessage('')
        })
    }
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }

  return (
    <ScrollView>
      <View style={styles.page}>
        <ProfileUpper />
        <View>
          <Text style={styles.header}>Update Account</Text>
          <View style={styles.formView}>
            <View style={styles.spacing}>
              <StyledInputLabel>First Name</StyledInputLabel>
              <StyledTextInputField
                placeholder='First Name'
                placeholderTextColor={darkLight}
                onChangeText={(firstName) => setFirstName(firstName)}
                value={firstName}
              />
            </View>
            <View style={styles.spacing}>
              <StyledInputLabel>Last Name</StyledInputLabel>
              <StyledTextInputField
                placeholder='Last Name'
                placeholderTextColor={darkLight}
                onChangeText={(lastName) => setLastName(lastName)}
                value={lastName}
              />
            </View>
            <View style={styles.spacing}>
              <StyledInputLabel>Email</StyledInputLabel>
              <StyledTextInputField
                placeholder='Email'
                placeholderTextColor={darkLight}
                onChangeText={(email) => setEmail(email)}
                value={email}
                editable={false}
              />
            </View>
            <View style={styles.spacing}>
              <StyledInputLabel>Date Of Birth</StyledInputLabel>
              <StyledTextInputField
                type='date'
                placeholder='Date Of Birth'
                placeholderTextColor={darkLight}
                onChangeText={(dob) => setDob(dob)}
                value={dob == null ? date.toLocaleDateString() : dob}
              />
              <RightIcon onPress={showDatepicker}>
                <Octicons name='calendar' size={30} color={brand} />
              </RightIcon>
            </View>
            <MsgBox type={messageType}>{message}</MsgBox>
            <StyledButton onPress={handleSubmit}>
              <ButtonText>Save Changes</ButtonText>
            </StyledButton>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginStart: 15,
    marginTop: 8,
    fontSize: 30,
    color: black,
  },
  page: {
    flex: 1,
    padding: 15,
    paddingTop: 60,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 120,
    width: 120,
    resizeMode: 'stretch',
  },
  label: {
    fontSize: 16,
    marginTop: 2,
  },
  formView: {
    marginTop: 10,
    margin: 10,
  },
  spacing: {
    marginTop: 0,
    margin: 5,
  },
})
