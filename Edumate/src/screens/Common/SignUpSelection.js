import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { InnerContainer, StyledContainer, colors } from '../../constants/styles'
import { StatusBar } from 'expo-status-bar'

const { primary, black } = colors

export default function SignUpSelection({ navigation }) {
  const [selection, setSelection] = useState('')
  return (
    <StyledContainer>
      <StatusBar style='dark' />
      <Text style={styles.header}>Registration</Text>
      <Text style={{ marginStart: 15 }}>Select Role</Text>
      <InnerContainer>
        <TouchableOpacity
          style={styles.buttonFacebookStyle}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('SingUp',{selection:'Teacher'})
          }}
        >
          <Image
            source={require('../../../assets/Teacher.png')}
            style={styles.buttonImageIconStyle}
          />
        </TouchableOpacity>
        <Text>Teacher</Text>
        <TouchableOpacity
          style={styles.buttonFacebookStyle}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate('SingUp',{selection:'Student'})
          }}
        >
          <Image
            source={require('../../../assets/Student.png')}
            style={styles.buttonImageIconStyle}
          />
        </TouchableOpacity>
        <Text>Student</Text>
      </InnerContainer>
    </StyledContainer>
  )
}

const styles = StyleSheet.create({
  header: {
    marginStart: 15,
    fontSize: 40,
    fontWeight: '10px',
    color: black,
  },
  buttonFacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    margin: 10,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
})
