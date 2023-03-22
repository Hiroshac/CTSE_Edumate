import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyBoardAvoidingWrapper } from '../../components/KeyBoardAvoidingWrapper'
import {
  StyledContainer,
  colors,
  StyledButton,
  ButtonText,
  ExtraView,
  ExtraText,
  TextLinkContent,
  StyledInputLabel,
  StyledTextInputField,
  InnerContainer,
  MsgBox,
} from '../../constants/styles'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'

const { darkLight, black } = colors

export default function SignUp({ navigation }) {
  const [regForm, setRegForm] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [type, setType] = useState('')
  const [stream, setStream] = useState('')
  const [password, setPassword] = useState('')
  const [rpassword, setrPassword] = useState('')
  const [subject, setSubject] = useState([])

  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  const loadSubject = () => {
    axios.get('https://edumate-backend.herokuapp.com/stream').then((res) => {
      setSubject(res.data)
    })
  }

  useEffect(() => {
    loadSubject()
  }, [])

  const handleSubmit = async () => {
    handleMessage(null)
    const data = {
      firstName: firstName,
      lastName: lastName,
      type: type,
      stream: stream,
      email: email,
      password: password,
    }
    if (
      data.firstName == '' ||
      data.lastName == '' ||
      data.stream == '' ||
      data.type == '' ||
      data.email == '' ||
      data.password == ''
    ) {
      handleMessage('Please fill all the fields', 'FAILED')
    } else {
      if (password !== rpassword) {
        handleMessage('Password Mismatch!!!', 'FAILED')
      } else {
        await axios
          .post('https://edumate-backend.herokuapp.com/api/auth/register', data)
          .then((res) => {
            const result = res.data
            if (res.data === 'Created') {
              alert('Successfully Registered')
              navigation.navigate('Login')
            } else if (res.data === 'Exists') {
              handleMessage('The user already exists', 'FAILED')
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

  useEffect(() => {
    setRegForm(false)
  }, [])

  return (
    <>
      {!regForm ? (
        <StyledContainer>
          <StatusBar style='dark' />
          <Text style={styles.header}>Registration</Text>
          <Text style={{ marginStart: 15, fontSize: 18 }}>Select Role</Text>
          <InnerContainer>
            <TouchableOpacity
              style={styles.buttonFacebookStyle}
              activeOpacity={0.5}
              onPress={() => {
                setRegForm(true)
                setType('Teacher')
              }}
            >
              <Image
                source={require('../../../assets/Teacher.png')}
                style={styles.buttonImageIconStyle}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 18 }}>Teacher</Text>
            <TouchableOpacity
              style={styles.buttonFacebookStyle}
              activeOpacity={0.5}
              onPress={() => {
                setRegForm(true)
                setType('Student')
              }}
            >
              <Image
                source={require('../../../assets/Student.png')}
                style={styles.buttonImageIconStyle}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 18 }}>Student</Text>
          </InnerContainer>
        </StyledContainer>
      ) : (
        <KeyBoardAvoidingWrapper>
          <StyledContainer>
            <StatusBar style='dark' />
            <Text style={styles.header}>Register</Text>
            <View style={styles.formView}>
              <View style={styles.container}>
                <View style={styles.inputField}>
                  <StyledInputLabel>First Name</StyledInputLabel>
                  <StyledTextInputField
                    placeholder='First Name'
                    placeholderTextColor={darkLight}
                    onChangeText={(firstName) => setFirstName(firstName)}
                    value={firstName}
                  />
                </View>
                <View style={styles.inputField}>
                  <StyledInputLabel>Last Name</StyledInputLabel>
                  <StyledTextInputField
                    placeholder='Last Name'
                    placeholderTextColor={darkLight}
                    onChangeText={(lastName) => setLastName(lastName)}
                    value={lastName}
                  />
                </View>
              </View>
              <View style={styles.spacing}>
                <StyledInputLabel>Email</StyledInputLabel>
                <StyledTextInputField
                  placeholder='example@edumate.com'
                  placeholderTextColor={darkLight}
                  onChangeText={(email) => setEmail(email)}
                  value={email}
                />
              </View>
              <View style={styles.spacing}>
                <StyledInputLabel>Stream</StyledInputLabel>
                {/* <StyledTextInputField
                  placeholder='Choose'
                  placeholderTextColor={darkLight}
                  onChangeText={(stream) => setStream(stream)}
                  value={stream}
                /> */}
                <View style={styles.picker}>
                  <Picker
                    selectedValue={stream}
                    onValueChange={(itemValue, itemIndex) =>
                      setStream(itemValue)
                    }
                  >
                    <Picker.Item label='Choose...' />
                    {subject.map((sub) => {
                      return (
                        <Picker.Item
                          label={sub.streamname}
                          value={sub.streamname}
                        />
                      )
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.spacing}>
                <StyledInputLabel>Password</StyledInputLabel>
                <StyledTextInputField
                  secureTextEntry={true}
                  placeholder='* * * * * * *'
                  placeholderTextColor={darkLight}
                  onChangeText={(password) => setPassword(password)}
                  value={password}
                />
              </View>
              <View style={styles.spacing}>
                <StyledInputLabel>Re-enter Password</StyledInputLabel>
                <StyledTextInputField
                  secureTextEntry={true}
                  placeholder='* * * * * * *'
                  placeholderTextColor={darkLight}
                  onChangeText={(rpassword) => setrPassword(rpassword)}
                  value={rpassword}
                />
              </View>
              <MsgBox type={messageType}>{message}</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Register</ButtonText>
              </StyledButton>
              <ExtraView>
                <ExtraText>Already have an account? </ExtraText>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login')
                  }}
                >
                  <TextLinkContent>Login</TextLinkContent>
                </TouchableOpacity>
              </ExtraView>
            </View>
          </StyledContainer>
        </KeyBoardAvoidingWrapper>
      )}
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
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    margin: 5,
    flex: 1,
  },
  formView: {
    marginTop: 10,
    margin: 10,
  },
  spacing: {
    marginTop: 0,
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
  buttonFacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    margin: 10,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 180,
    width: 180,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
  },
  picker: {
    paddingHorizontal: 10,
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
  },
})
