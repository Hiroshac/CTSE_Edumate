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
import React, { useEffect, useState } from 'react'
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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../core/config'

const { darkLight, black } = colors

// AsyncStorage.setItem('user', '')
// AsyncStorage.removeItem('user')
// AsyncStorage.removeItem('file')
// AsyncStorage.clear()

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userDetails, setUserDetails] = useState([])
  const [uid, setUid] = useState('')
  const auth = getAuth()

  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  const handleSubmit = async (e) => {
    if (email != '' && password != '') {
      const user = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )
        .then(async (userCredential) => {
          const user = userCredential.user
          setUid(user.uid)
          userNavigation(userCredential.user.uid)
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            handleMessage('User Not Found')
            setTimeout(() => {
              handleMessage('')
            }, 3000)
          }
          if (error.code === 'auth/wrong-password') {
            handleMessage('Wrong Password')
            setTimeout(() => {
              handleMessage('')
            }, 3000)
          }
          if (error.code == 'auth/invalid-email') {
            handleMessage('Invalid Email Address')
            setTimeout(() => {
              handleMessage('')
            }, 3000)
          }
          console.log(error)
        })
    } else {
      handleMessage('Please Enter the Email and Password')
      setTimeout(() => {
        handleMessage('')
      }, 3000)
    }
  }

  useEffect(() => {
    if (uid != '') {
      userNavigation(uid)
    }
  }, [])

  const userNavigation = async (id) => {
    const userRef = query(collection(db, 'user'))
    const qm = query(userRef, where('uid', '==', id))
    onSnapshot(qm, (querySnapshot) => {
      setUserDetails(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
      var _userDetails = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
      if (_userDetails.length > 0) {
        _userDetails.map((user) => {
          setUser(user.id)
          if (user.data.type == 'student' || user.data.type == 'Student') {
            navigation.replace('StudentStack')
          } else if (
            user.data.type == 'teacher' ||
            user.data.type == 'Teacher'
          ) {
            navigation.replace('Teacher')
          } else if (user.data.type == 'Admin' || user.data.type == 'Admin') {
            navigation.replace('Admin')
          } else {
            alert('Please try again!!!')
          }
        })
      }
    })
  }
  const setUser = async (id) => {
    try {
      await AsyncStorage.setItem('@user', id)
      console.log('Id stored successfully')
    } catch (e) {
      console.log('Failed to store the id')
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
