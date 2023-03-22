import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'
import React, { useState } from 'react'
import {
  StyledContainer,
  colors,
  StyledButton,
  ButtonText,
  ExtraView,
  TextLinkContent,
  ExtraText,
  StyledTextInputField,
  StyledInputLabel,
  MsgBox,
} from '../../constants/styles'

const { darkLight, black } = colors

// AsyncStorage.setItem('user', '')
// AsyncStorage.removeItem('user')
// AsyncStorage.removeItem('file')
// AsyncStorage.clear()

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  const handleSubmit = async (e) => {
    const credentials = {
      email: email,
      password: password,
    }

    if (credentials.email == '' || credentials.password == '') {
      alert('Please fill all the details!!!')
    } else {
      await axios
        .post(
          'https://edumate-backend.herokuapp.com/api/auth/login',
          credentials
        )
        .then((res) => {
          const result = res.data.details
          AsyncStorage.setItem('user', result._id)
          console.log(result)
          if (result.type == 'student' || result.type == 'Student') {
            navigation.replace('StudentStack')
          } else if (result.type == 'teacher' || result.type == 'Teacher') {
            navigation.replace('Teacher')
          } else if (result.type == 'Admin' || result.type == 'Admin') {
            navigation.replace('Admin')  
          } else {
            alert('Please try again!!!')
          }
        })
        .catch((err) => {
          const result = err.response.data
          if (result.message == 'Wrong Password or Username') {
            alert(result.message)
          } else if (result.status == 404) {
            alert(result.message)
          }
        })
    }
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message)
    setMessageType(type)
  }

  return (
    <>
      <StyledContainer>
        <StatusBar style='dark' />
        <Text style={styles.header}>Login</Text>
        <View style={styles.inputFieldView}>
          <MsgBox type={messageType}>{message}</MsgBox>
          <View style={styles.spacing}>
            <StyledInputLabel>Email</StyledInputLabel>
            <StyledTextInputField
              id='email'
              placeholder='example@edumate.com'
              placeholderTextColor={darkLight}
              onChangeText={(email) => setEmail(email)}
              value={email}
            />
          </View>
          <View style={styles.spacing}>
            <StyledInputLabel>Password</StyledInputLabel>
            <StyledTextInputField
              id='password'
              secureTextEntry={true}
              placeholder='* * * * * * *'
              placeholderTextColor={darkLight}
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
          </View>
          {/* <Text style={styles.alignRight}>Forgot Password?</Text> */}
          <StyledButton onPress={handleSubmit}>
            <ButtonText>Login</ButtonText>
          </StyledButton>
          <ExtraView>
            <ExtraText>Don't have an account? </ExtraText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoadingPage')
              }}
            >
              <TextLinkContent>SignUp</TextLinkContent>
            </TouchableOpacity>
          </ExtraView>
        </View>
      </StyledContainer>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    marginStart: 15,
    fontSize: 40,
    fontWeight: '10px',
    color: black,
  },
  inputFieldView: {
    marginTop: 50,
    margin: 10,
  },
  spacing: {
    marginTop: 15,
    margin: 5,
  },
  alignRight: {
    textAlign: 'right',
    margin: 10,
  },
  alignCenter: {
    textAlign: 'center',
    margin: 15,
  },
})
