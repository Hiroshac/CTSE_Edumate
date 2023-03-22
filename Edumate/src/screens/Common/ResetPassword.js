import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  InnerContainer,
  colors,
  StyledTextInputField,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  MsgBox,
} from '../../constants/styles'
import ProfileUpper from './ProfileUpper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const { darkLight, black } = colors

var userId = ''
AsyncStorage.getItem('user').then((value) => {
  userId = value
})

export default function ResetPassword({ navigation }) {
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [newrPwd, setNewrPwd] = useState('')

  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  const Logout = async () => {
    await AsyncStorage.setItem('user', '')
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('file')
    await AsyncStorage.clear()
    navigation.navigate('Login')
  }

  const handleSubmit = async () => {
    handleMessage(null)
    const data = {
      oldPassword: oldPwd,
      newPassword: newPwd,
      newrPassword: newrPwd,
    }
    if (
      data.oldPassword == '' ||
      data.newPassword == '' ||
      data.newrPassword == ''
    ) {
      handleMessage('Please fill all the fields', 'FAILED')
    } else {
      if (newPwd != newrPwd) {
        handleMessage('Password Mismatch!!!', 'FAILED')
      } else {
        await axios
          .put(
            `https://edumate-backend.herokuapp.com/api/auth/updatePwd/${userId}`,
            data
          )
          .then((res) => {
            if (res.data === 'Password Reset') {
              alert('Password Updated Successfully')
              Logout()
            } else if (res.data.message === 'Wrong Password') {
              handleMessage('Incorrect existing password', 'FAILED')
            } else {
              handleMessage('Something is Wrong !!!', 'FAILED')
            }
          })
          .catch((err) => {
            console.log(err)
            handleMessage('An error occured. Please try again!')
          })
      }
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
          <Text style={styles.header}>Update Password</Text>
          <View style={styles.formView}>
            <View style={styles.spacing}>
              <StyledInputLabel>Old Password</StyledInputLabel>
              <StyledTextInputField
                secureTextEntry={true}
                placeholder='Old Password'
                placeholderTextColor={darkLight}
                onChangeText={(oldPwd) => setOldPwd(oldPwd)}
                value={oldPwd}
              />
            </View>
            <View style={styles.spacing}>
              <StyledInputLabel>New Password</StyledInputLabel>
              <StyledTextInputField
                secureTextEntry={true}
                placeholder='New Password'
                placeholderTextColor={darkLight}
                onChangeText={(newPwd) => setNewPwd(newPwd)}
                value={newPwd}
              />
            </View>
            <View style={styles.spacing}>
              <StyledInputLabel>Re-enter Password</StyledInputLabel>
              <StyledTextInputField
                secureTextEntry={true}
                placeholder='Re-enter Password'
                placeholderTextColor={darkLight}
                onChangeText={(newrPwd) => setNewrPwd(newrPwd)}
                value={newrPwd}
              />
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
    marginTop: 10,
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
    marginTop: 5,
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
