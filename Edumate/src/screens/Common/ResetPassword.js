import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  colors,
  StyledTextInputField,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  MsgBox,
} from '../../constants/styles'
import ProfileUpper from './ProfileUpper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuth, updatePassword, signOut } from '@firebase/auth'
const { darkLight, black } = colors

// var userId = 'MdaHUyN5DV2gCB8E3rgB'
// // AsyncStorage.getItem('user').then((value) => {
// //   userId = value
// // })

export default function ResetPassword({ navigation }) {
  const [newPwd, setNewPwd] = useState('')
  const [newrPwd, setNewrPwd] = useState('')

  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()
  const auth = getAuth()
  const user = auth.currentUser

  const Logout = async () => {
    await AsyncStorage.setItem('@user', '')
    await AsyncStorage.removeItem('@user')
    await AsyncStorage.removeItem('file')
    await AsyncStorage.clear()
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate('Login')
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
  }

  const handleSubmit = async () => {
    handleMessage(null)
    const data = {
      newPassword: newPwd,
      newrPassword: newrPwd,
    }
    if (data.newPassword == '' || data.newrPassword == '') {
      handleMessage('Please fill all the fields', 'FAILED')
    } else {
      // if (newPwd != newrPwd) {
      //   handleMessage('Password Mismatch!!!', 'FAILED')
      // } else {
      //   const q = doc(db, 'user', userId)
      //   const docSnap = await getDoc(q)
      //   const res = docSnap.data()
      //   if (res.data.password == data.oldPassword) {
      //     const userDocRef = doc(db, 'user', userId)
      //     await updateDoc(userDocRef, {
      //       password: data.newPassword,
      //     })
      //       .then((res) => {
      //         alert('Password Updated Successfully')
      //         Logout()
      //       })
      //       .catch((err) => {
      //         console.log(err)
      //         setTimeout(() => {
      //           handleMessage('Something is Wrong !!!', 'FAILED')
      //         }, 3000)
      //         handleMessage('')
      //       })
      //   } else {
      //     handleMessage('Incorrect existing password', 'FAILED')
      //   }
      // }
      updatePassword(user, newrPwd)
        .then(() => {
          alert('Updated Successfully')
          Logout()
        })
        .catch((error) => {
          console.log(error)
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
          <Text style={styles.header}>Update Password</Text>
          <View style={styles.formView}>
            {/* <View style={styles.spacing}>
              <StyledInputLabel>Old Password</StyledInputLabel>
              <StyledTextInputField
                secureTextEntry={true}
                placeholder='Old Password'
                placeholderTextColor={darkLight}
                onChangeText={(oldPwd) => setOldPwd(oldPwd)}
                value={oldPwd}
              />
            </View> */}
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
